# Changelog

**English** · [Deutsch](CHANGELOG.de.md)

Format: [Keep a Changelog](https://keepachangelog.com/en/1.1.0/), versions: [Semantic Versioning](https://semver.org/).

## [Unreleased]

## [0.1.4] – 2026-11-17

### Fixed
- **Narrow cards were cut off.** With three sections side by side in a sections dashboard
  (laptop) a card is only about 155 px wide: the ring (fixed at 190 px) stuck out on the right
  and the mode buttons ran out of the card. The ring now shrinks with the card, and its
  figures with it; below 230 px the mode buttons wrap, the name may take two lines (the round
  icon is dropped), and in the `kompakt` layout the target moves below the current temperature.

## [0.1.3] – 2026-11-17

### Changed
- **Less work on every state change.** The card looked through all entities of Home Assistant
  with every state change of any entity; now once per thermostat until the entity registry changes.
- Range, step and unit of the target temperature come from the climate entity, so the card also
  works where Home Assistant is set to °F. The week program stays in °C, as the devices store it.
- Numbers follow the number format of the user's profile instead of the browser's.
- A climate entity of another integration gets a clear message instead of an empty card.
- Current temperature, humidity and valve can be reached and opened by keyboard; the pop-up
  takes the focus when it opens.

### Fixed
- The ring no longer sets a temperature while the thermostat is off (− and + were locked already).
- A dashboard resource entered twice no longer raises an error on the second load.
- A drag on the ring cut off by a view change no longer keeps the card from updating.

## [0.1.2] – 2026-11-16

### Added
- The card is suggested in the card picker ("Add card" → "By entity") for climate entities of
  the eq3_max integration, under "Community" (Home Assistant 2026.6+). Thanks to BSass (#1).
- Optional `temperature_sensor`: an external sensor replaces the thermostat's current temperature
  (falls back to the thermostat when unavailable); optional `humidity_sensor` shows the humidity.
  Both can be picked in the visual editor. With an external sensor the thermostat's own reading
  stays visible small below it (ring: tooltip), since the thermostat keeps regulating on it.
  Thanks to BSass (#2).

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
