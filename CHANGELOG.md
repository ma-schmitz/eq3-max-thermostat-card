# Changelog

**English** · [Deutsch](CHANGELOG.de.md)

Format: [Keep a Changelog](https://keepachangelog.com/en/1.1.0/), versions: [Semantic Versioning](https://semver.org/).

## [Unreleased]

### Added
- The card is suggested in the card picker ("Add card" → "By entity") for climate entities of
  the eq3_max integration, under "Community" (Home Assistant 2026.6+).
- Optional `temperature_sensor`: an external sensor replaces the thermostat's current temperature
  (falls back to the thermostat when unavailable); optional `humidity_sensor` shows the humidity.
  Both can be picked in the visual editor. With an external sensor the thermostat's own reading
  stays visible small below it (ring: tooltip), since the thermostat keeps regulating on it.

### Fixed
- **A tap in the ring layout no longer sets the target by accident.** Only the arc itself sets
  it; a tap on the valve arc, the valve line or the gap at the bottom set 30.5 °C before. The
  valve and humidity lines in the centre open their history.

## [0.1.1] – 2026-11-14

### Fixed
- An unavailable thermostat shows "unavailable" instead of controls that only produced errors.
- The pop-up closes with the back button / back gesture, and when the card leaves the view
  (it stayed open with stale values before).
- The pop-up's Window tab follows the window contacts and the room's thermostats live.
- An error while writing the week program is shown in the language of Home Assistant.
- The Info tab names the radio modules as configured, not by their internal key.

## [0.1.0] – 2026-11-14

### Added
- First version: "Poll current temperature" in the Temperatures tab (eq3_max 0.8.0); layouts `kompakt`, `ring` (set the target by dragging or tapping the ring), `kachel`; narrow cards show the modes as one row of symbols; symbols for valve, battery, radio,
  window, links, lock and pending commands; settings pop-up (temperatures, window,
  boost & valve / display, week program with editor and copy, info); visual editor;
  German and English. Requires eq3_max 0.8.0.
