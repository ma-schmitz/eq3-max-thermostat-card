import { test } from "node:test";
import assert from "node:assert/strict";

import {
  rssiLevel,
  findEntities,
  windowState,
  profileDay,
  weekRows,
  segmentsToProfile,
  tabsFor,
  canEdit,
  changedValues,
  stepTarget,
  FACTORY_WEEK_PROFILE,
  WEEKDAYS,
  ROOM_KEYS,
  t,
} from "../eq3-max-thermostat-card.js";

const CLIMATE = "climate.ht_wohnzimmer";
const DEV = "dev1";

function entity(entity_id, translation_key, device_id = DEV, platform = "eq3_max") {
  return { entity_id, translation_key, device_id, platform };
}

function hassWith(states = {}, extra = {}) {
  const entities = {
    [CLIMATE]: entity(CLIMATE, undefined),
    "sensor.ht_wohnzimmer_ventil": entity("sensor.ht_wohnzimmer_ventil", "ventil"),
    "sensor.ht_wohnzimmer_rssi": entity("sensor.ht_wohnzimmer_rssi", "rssi"),
    "binary_sensor.ht_wohnzimmer_lowbat": entity("binary_sensor.ht_wohnzimmer_lowbat", "lowbat"),
    "number.umbenannt": entity("number.umbenannt", "komfort"),
    "number.ht_wohnzimmer_fenster_temperatur": entity("number.ht_wohnzimmer_fenster_temperatur", "fenster_temperatur"),
    "number.fremd_komfort": entity("number.fremd_komfort", "komfort", "dev2"),
    "sensor.other_platform": entity("sensor.other_platform", "ventil", DEV, "mqtt"),
  };
  return { entities, states, user: { is_admin: false }, locale: { language: "de" }, ...extra };
}

test("rssiLevel thresholds and radio error", () => {
  assert.equal(rssiLevel(-61, false), "good");
  assert.equal(rssiLevel(-70, false), "mid");
  assert.equal(rssiLevel(-85, false), "mid");
  assert.equal(rssiLevel(-88, false), "weak");
  assert.equal(rssiLevel(-61, true), "off");
  assert.equal(rssiLevel(null, false), null);
});

test("findEntities matches device, platform and translation_key, survives renames", () => {
  const found = findEntities(hassWith(), CLIMATE);
  assert.equal(found.ventil, "sensor.ht_wohnzimmer_ventil");
  assert.equal(found.komfort, "number.umbenannt");
  assert.equal(found.lowbat, "binary_sensor.ht_wohnzimmer_lowbat");
  assert.equal(found.funkfehler, undefined);
  assert.equal(findEntities(hassWith(), "climate.unknown").ventil, undefined);
});

test("windowState from linked contacts", () => {
  const climate = { state: "heat", attributes: { fenster: ["binary_sensor.fk"], temperature: 21 } };
  const hass = hassWith({ "binary_sensor.fk": { state: "on", attributes: { friendly_name: "Terrassentür" } } });
  assert.deepEqual(windowState(hass, climate, {}), { shown: true, open: true, names: ["Terrassentür"] });
  hass.states["binary_sensor.fk"].state = "off";
  assert.equal(windowState(hass, climate, {}).open, false);
});

test("windowState without contact: own detection at the window-open temperature", () => {
  const ents = { fenster_temperatur: "number.ht_wohnzimmer_fenster_temperatur" };
  const hass = hassWith({ "number.ht_wohnzimmer_fenster_temperatur": { state: "12.0" } });
  const at12 = { state: "heat", attributes: { fenster: [], temperature: 12, preset_mode: "none" } };
  assert.deepEqual(windowState(hass, at12, ents), { shown: true, open: true, names: [] });
  const normal = { state: "heat", attributes: { fenster: [], temperature: 21 } };
  assert.deepEqual(windowState(hass, normal, ents), { shown: false, open: false, names: [] });
  const auto12 = { state: "auto", attributes: { fenster: [], temperature: 12 } };
  assert.equal(windowState(hass, auto12, ents).shown, false);
});

test("profileDay turns points into segments", () => {
  assert.deepEqual(profileDay([{ temperature: 17, until: "06:00" }, { temperature: 21, until: "24:00" }]), [
    { from: "00:00", to: "06:00", temperature: 17 },
    { from: "06:00", to: "24:00", temperature: 21 },
  ]);
});

test("weekRows: Monday first, unknown days marked", () => {
  const rows = weekRows({ Montag: [{ temperature: 17, until: "24:00" }] });
  assert.deepEqual(rows.map((r) => r.day), ["Montag", "Dienstag", "Mittwoch", "Donnerstag", "Freitag", "Samstag", "Sonntag"]);
  assert.equal(rows[0].known, true);
  assert.equal(rows[1].known, false);
  assert.deepEqual(rows[1].segments, []);
  assert.equal(weekRows(undefined).every((r) => !r.known), true);
});

test("factory program as the integration has it", () => {
  assert.deepEqual(FACTORY_WEEK_PROFILE.Montag[0], { temperature: 17, until: "06:00" });
  assert.equal(FACTORY_WEEK_PROFILE.Montag.length, 5);
  assert.equal(FACTORY_WEEK_PROFILE.Samstag.length, 3);
  assert.equal(WEEKDAYS.length, 7);
});

test("segmentsToProfile: last point without until, sorted", () => {
  assert.deepEqual(
    segmentsToProfile([
      { from: "00:00", to: "06:00", temperature: 17 },
      { from: "06:00", to: "24:00", temperature: 21.5 },
    ]),
    [{ temperature: 17, until: "06:00" }, { temperature: 21.5 }],
  );
});

test("tabsFor radiator and wall thermostat", () => {
  assert.deepEqual(tabsFor(false).map((x) => x.id), ["temp", "window", "boost", "week", "info"]);
  assert.equal(tabsFor(false)[2].title, "Boost & Ventil");
  assert.equal(tabsFor(true)[2].title, "Boost & Anzeige");
});

test("canEdit: admin always, others by attribute", () => {
  const locked = { attributes: { einstellungen_frei: false, wochenprogramm_frei: true } };
  assert.equal(canEdit({ user: { is_admin: true } }, locked, "config"), true);
  assert.equal(canEdit({ user: { is_admin: false } }, locked, "config"), false);
  assert.equal(canEdit({ user: { is_admin: false } }, locked, "week"), true);
  assert.equal(canEdit({ user: { is_admin: false } }, { attributes: {} }, "config"), true);
});

test("changedValues only returns differing keys", () => {
  assert.deepEqual(changedValues({ komfort: 21, eco: 17 }, { komfort: 21, eco: 16.5 }), { eco: 16.5 });
  assert.deepEqual(changedValues({ komfort: 21 }, {}), {});
});

test("stepTarget clamps to 4.5..30.5 in 0.5 steps", () => {
  assert.equal(stepTarget(21, +1), 21.5);
  assert.equal(stepTarget(4.5, -1), 4.5);
  assert.equal(stepTarget(30.5, +1), 30.5);
  assert.equal(stepTarget(null, +1), 21);
});

test("room keys and translations", () => {
  assert.ok(ROOM_KEYS.includes("komfort") && !ROOM_KEYS.includes("offset"));
  assert.equal(t("en", "Boost & Ventil"), "Boost & valve");
  assert.equal(t("de", "Boost & Ventil"), "Boost & Ventil");
  assert.equal(t("en", "{n} geändert", { n: 2 }), "2 changed");
  assert.equal(t("fr", "Fenster"), "Window");
});
