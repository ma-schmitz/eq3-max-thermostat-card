// eQ-3 MAX! Thermostat Card – Lovelace-Karte für Thermostate der Integration eq3_max.
// Eine Datei ohne Build-Schritt. Oben die reinen Funktionen (exportiert, mit node --test
// geprüft), unten die Karte, das Pop-up und der Editor (nur im Browser).

export const VERSION = "0.1.0";

// Wochentage, wie eq3_max sie speichert und der Dienst set_week_profile sie nimmt.
export const WEEKDAYS = ["Montag", "Dienstag", "Mittwoch", "Donnerstag", "Freitag", "Samstag", "Sonntag"];

// Werte, die eq3_max an die Thermostate des Raums weitergibt (ROOM_CONFIG_KEYS).
export const ROOM_KEYS = [
  "komfort", "eco", "maximal", "minimal", "fenster_temperatur", "fenster_dauer",
  "boost_dauer", "boost_ventil", "entkalkung_tag", "entkalkung_stunde",
];

export const MIN_TEMP = 4.5;
export const MAX_TEMP = 30.5;

const WORKDAY = [
  { temperature: 17, until: "06:00" }, { temperature: 21, until: "09:00" },
  { temperature: 17, until: "17:00" }, { temperature: 21, until: "23:00" }, { temperature: 17, until: "24:00" },
];
const WEEKEND = [{ temperature: 17, until: "06:00" }, { temperature: 21, until: "22:00" }, { temperature: 17, until: "24:00" }];
// Werksprogramm der Thermostate (wie eq3_max: FACTORY_WEEK_PROFILE).
export const FACTORY_WEEK_PROFILE = {
  Montag: WORKDAY, Dienstag: WORKDAY, Mittwoch: WORKDAY, Donnerstag: WORKDAY, Freitag: WORKDAY,
  Samstag: WEEKEND, Sonntag: WEEKEND,
};

// --- Texte (Schlüssel = deutscher Text) -------------------------------------
const EN = {
  "Manuell": "Manual", "Auto": "Auto", "Komfort": "Comfort", "Eco": "Eco", "Boost": "Boost", "Aus": "Off",
  "Abwesend bis {time}": "Away until {time}", "Abwesend": "Away",
  "Ventil": "Valve", "Fenster": "Window", "offen": "open", "zu": "closed",
  "Fenster offen": "Window open", "Fenster geschlossen": "Window closed",
  "Batterie ok": "Battery ok", "Batterie schwach": "Battery low",
  "Funk {dbm} dBm": "Radio {dbm} dBm", "Funkfehler": "Radio error",
  "verknüpft mit {names}": "linked with {names}", "Bediensperre": "Operation locked",
  "Befehl ausstehend": "Command pending", "vor {n} min": "{n} min ago", "vor {n} h": "{n} h ago", "gerade eben": "just now",
  "Heizkörperthermostat": "Radiator thermostat", "Wandthermostat": "Wall thermostat",
  "Einstellungen": "Settings", "Temperaturen": "Temperatures", "Boost & Ventil": "Boost & valve",
  "Boost & Anzeige": "Boost & display", "Wochenprogramm": "Week program", "Info": "Info",
  "Komforttemperatur": "Comfort temperature", "Eco-Temperatur": "Eco temperature",
  "Maximaltemperatur": "Maximum temperature", "Minimaltemperatur": "Minimum temperature",
  "Temperatur-Offset": "Temperature offset", "Korrektur der Messung": "Correction of the measurement",
  "Grenze am Drehrad": "Limit on the wheel", "Fenster-auf-Temperatur": "Window-open temperature",
  "Fenster-auf-Dauer": "Window-open duration", "0 = Erkennung aus": "0 = detection off",
  "Boost-Dauer": "Boost duration", "Boost-Ventilstellung": "Boost valve position", "Entkalkung Tag": "Decalcification day",
  "Entkalkung Stunde": "Decalcification hour", "Ventil maximal": "Valve maximum", "Ventil-Offset": "Valve offset",
  "Anzeige": "Display", "Soll-Temperatur": "Set temperature", "Ist-Temperatur": "Current temperature",
  "gilt für den Raum": "applies to the room", "ausstehend: {value}": "pending: {value}",
  "{n} geändert": "{n} changed", "Verwerfen": "Discard", "Übernehmen": "Apply", "Schließen": "Close",
  "Verknüpfte Fensterkontakte": "Linked window contacts", "keiner": "none",
  "Batterie": "Battery", "Funk": "Radio", "Zuletzt": "Last seen", "Verknüpft": "Linked", "Gerät": "Device",
  "ok": "ok", "schwach": "low", "an": "on", "aus": "off",
  "Nur Anzeige: Änderungen sind für dein Konto gesperrt (Option der Integration).":
    "View only: changes are locked for your account (option of the integration).",
  "unbekannt": "unknown", "{day} bearbeiten": "Edit {day}", "Vorlage: Werksprogramm": "Template: factory program",
  "Zeitraum einfügen": "Insert period", "Schreiben auf:": "Write to:", "alle": "all", "keinen": "none",
  "Auf {n} Tage schreiben": "Write to {n} days", "Auf 1 Tag schreiben": "Write to 1 day",
  "Kopieren von …": "Copy from …", "Geht auch an: {names}": "Also goes to: {names}",
  "schreibt: {days}": "writing: {days}",
  "Das Gerät meldet sein Programm nicht. Gezeigt wird, was es zuletzt quittiert hat. Jeder Tag ist ein Funktelegramm; bei knappem Funkbudget kann eine Woche einige Minuten dauern.":
    "The device does not report its program. Shown is what it acknowledged last. Every day is one radio telegram; with little airtime left a week can take a few minutes.",
  "Letztes Schreiben abgebrochen": "Last write stopped",
  "Gesendet – wartet auf Quittung.": "Sent – waiting for acknowledgement.",
  "Wochenprogramm wird geschrieben.": "Week program is being written.",
  "bis": "until", "Montag": "Monday", "Dienstag": "Tuesday", "Mittwoch": "Wednesday", "Donnerstag": "Thursday",
  "Freitag": "Friday", "Samstag": "Saturday", "Sonntag": "Sunday",
  "Mo": "Mo", "Di": "Tu", "Mi": "We", "Do": "Th", "Fr": "Fr", "Sa": "Sa", "So": "Su",
  "Kein eq3_max-Thermostat gewählt.": "No eq3_max thermostat selected.",
  "Entität {entity} nicht gefunden.": "Entity {entity} not found.",
  "Entität": "Entity", "Layout": "Layout", "Name (optional)": "Name (optional)", "Modus-Knöpfe zeigen": "Show mode buttons",
  "kompakt": "compact", "ring": "ring", "kachel": "tile",
  "Seriennummer": "Serial number", "Firmware": "Firmware", "Hauptmodul": "Main module",
};

/** Text in the HA language; German is the key, everything not German falls back to English. */
export function t(lang, key, vars = {}) {
  const text = String(lang || "en").startsWith("de") ? key : (EN[key] ?? key);
  return text.replace(/\{(\w+)\}/g, (_, name) => (name in vars ? String(vars[name]) : `{${name}}`));
}

// --- Zustände -----------------------------------------------------------------

/** Radio quality from the RSSI (dBm) and the device's radio-error flag. */
export function rssiLevel(dbm, rfError) {
  if (rfError) return "off";
  if (dbm === null || dbm === undefined || Number.isNaN(Number(dbm))) return null;
  const v = Number(dbm);
  if (v > -70) return "good";
  if (v >= -85) return "mid";
  return "weak";
}

/** Entities of the thermostat's device by eq3_max key (translation_key); renames do not matter. */
export function findEntities(hass, climateId) {
  const own = hass?.entities?.[climateId];
  const found = {};
  if (!own || !own.device_id) return found;
  for (const entry of Object.values(hass.entities)) {
    if (entry.device_id !== own.device_id || entry.platform !== "eq3_max" || !entry.translation_key) continue;
    if (!(entry.translation_key in found)) found[entry.translation_key] = entry.entity_id;
  }
  return found;
}

function num(value) {
  const n = Number(value);
  return value === null || value === undefined || value === "" || Number.isNaN(n) ? null : n;
}

/** Window shown/open: linked contacts (attribute fenster), else the thermostat's own detection
 *  (manual mode at its window-open temperature). */
export function windowState(hass, climate, ents) {
  const contacts = climate?.attributes?.fenster || [];
  if (contacts.length) {
    const states = contacts.map((id) => hass.states[id]).filter(Boolean);
    return {
      shown: true,
      open: states.some((s) => s.state === "on"),
      names: states.map((s) => s.attributes?.friendly_name || s.entity_id),
    };
  }
  const windowTemp = ents?.fenster_temperatur ? num(hass.states[ents.fenster_temperatur]?.state) : null;
  const target = num(climate?.attributes?.temperature);
  const own = climate?.state === "heat" && windowTemp !== null && target === windowTemp;
  return { shown: own, open: own, names: [] };
}

/** Points [{temperature, until}] → segments [{from, to, temperature}]. */
export function profileDay(points) {
  let from = "00:00";
  return (points || []).map((p) => {
    const to = p.until || "24:00";
    const seg = { from, to, temperature: Number(p.temperature) };
    from = to;
    return seg;
  });
}

/** Week (Monday first) from the attribute wochenprogramm; days it never acknowledged are unknown. */
export function weekRows(profile) {
  return WEEKDAYS.map((day) => {
    const points = profile?.[day];
    return { day, known: Array.isArray(points) && points.length > 0, segments: points?.length ? profileDay(points) : [] };
  });
}

/** Editor segments → profile for set_week_profile (last point without until). */
export function segmentsToProfile(segments) {
  const sorted = [...segments].sort((a, b) => a.to.localeCompare(b.to));
  return sorted.map((s, i) => (i === sorted.length - 1 ? { temperature: Number(s.temperature) } : { temperature: Number(s.temperature), until: s.to }));
}

/** Pop-up tabs; the wall thermostat has the display instead of the valve. */
export function tabsFor(isWall) {
  return [
    { id: "temp", icon: "mdi:thermometer", title: "Temperaturen" },
    { id: "window", icon: "mdi:window-open-variant", title: "Fenster" },
    { id: "boost", icon: "mdi:rocket-launch", title: isWall ? "Boost & Anzeige" : "Boost & Ventil" },
    { id: "week", icon: "mdi:calendar-clock", title: "Wochenprogramm" },
    { id: "info", icon: "mdi:information-outline", title: "Info" },
  ];
}

/** May the current user change settings ("config") or week programs ("week")? */
export function canEdit(hass, climate, kind) {
  if (hass?.user?.is_admin) return true;
  const attr = kind === "week" ? "wochenprogramm_frei" : "einstellungen_frei";
  return climate?.attributes?.[attr] !== false;
}

/** Keys of draft whose value differs from original. */
export function changedValues(original, draft) {
  const out = {};
  for (const [key, value] of Object.entries(draft || {})) {
    if (String(value) !== String(original?.[key])) out[key] = value;
  }
  return out;
}

/** Target ± one 0.5 step within the MAX! range; unknown target starts at 21. */
export function stepTarget(current, dir) {
  const base = num(current);
  if (base === null) return 21;
  return Math.min(MAX_TEMP, Math.max(MIN_TEMP, Math.round((base + dir * 0.5) * 2) / 2));
}
