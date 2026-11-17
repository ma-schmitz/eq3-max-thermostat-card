# Changelog

[English](CHANGELOG.md) · **Deutsch**

Format nach [Keep a Changelog](https://keepachangelog.com/de/1.1.0/), Versionierung nach [Semantic Versioning](https://semver.org/lang/de/).

## [Unreleased]

## [0.1.3] – 2026-11-17

### Geändert
- **Weniger Arbeit bei jeder Zustandsänderung.** Die Karte durchsuchte bei jeder Zustandsänderung
  irgendeiner Entität alle Entitäten von Home Assistant; jetzt einmal je Thermostat, bis sich die
  Entitätenliste ändert.
- Bereich, Schrittweite und Einheit der Solltemperatur kommen von der Klima-Entität, die Karte
  funktioniert damit auch, wenn Home Assistant auf °F steht. Das Wochenprogramm bleibt in °C, so
  speichern es die Geräte.
- Zahlen folgen dem Zahlenformat des Benutzerprofils statt dem des Browsers.
- Eine Klima-Entität einer anderen Integration bekommt eine klare Meldung statt einer leeren Karte.
- Ist-Temperatur, Luftfeuchte und Ventil sind per Tastatur erreichbar; das Pop-up übernimmt beim
  Öffnen den Fokus.

### Behoben
- Der Ring stellt keine Temperatur mehr ein, solange das Thermostat aus ist (− und + waren schon gesperrt).
- Eine doppelt eingetragene Dashboard-Ressource wirft beim zweiten Laden keinen Fehler mehr.
- Ein durch einen Ansichtswechsel abgebrochenes Ziehen am Ring blockiert die Karte nicht mehr.

## [0.1.2] – 2026-11-16

### Hinzugefügt
- Die Karte wird in der Kartenauswahl („Karte hinzufügen“ → „Nach Entität“) für Klima-Entitäten
  der Integration eq3_max unter „Community“ vorgeschlagen (Home Assistant ab 2026.6). Danke an BSass (#1).
- Optional `temperature_sensor`: ein externer Sensor ersetzt die Ist-Temperatur des Thermostats
  (fällt auf das Thermostat zurück, wenn er nicht verfügbar ist); optional `humidity_sensor` zeigt die
  Luftfeuchte. Beide lassen sich im visuellen Editor auswählen. Mit externem Sensor bleibt der
  Messwert des Thermostats klein darunter sichtbar (Ring: Tooltip), denn nach ihm regelt es.
  Danke an BSass (#2).

### Behoben
- **Ein Tippen im Ring-Layout verstellt die Solltemperatur nicht mehr versehentlich.** Nur der
  Bogen selbst stellt sie ein; ein Tippen auf den Ventilbogen, die Ventilzeile oder die Lücke
  unten setzte vorher 30,5 °C. Ventil- und Feuchtezeile in der Mitte öffnen ihren Verlauf.

## [0.1.1] – 2026-11-14

### Behoben
- Ein nicht verfügbares Thermostat zeigt „nicht verfügbar“ statt Bedienelementen, die nur Fehler brachten.
- Das Pop-up schließt mit der Zurück-Taste bzw. -Geste und wenn die Karte aus der Ansicht verschwindet
  (vorher blieb es mit veralteten Werten offen).
- Der Reiter Fenster im Pop-up folgt den Fensterkontakten und den Thermostaten des Raums live.
- Ein Fehler beim Schreiben des Wochenprogramms erscheint in der Sprache von Home Assistant.
- Der Info-Reiter nennt die Funkmodule mit ihrem Namen statt dem internen Schlüssel.

## [0.1.0] – 2026-11-14

### Hinzugefügt
- Erste Version: Auswahl „Ist-Temperatur abfragen“ im Reiter Temperaturen (eq3_max 0.8.0); Layouts `kompakt`, `ring` (Solltemperatur durch Ziehen oder Tippen am Ring), `kachel`; schmale Karten zeigen die Modi als Symbolzeile; Symbole für Ventil, Batterie, Funk,
  Fenster, Verknüpfungen, Sperre und ausstehende Befehle; Einstellungs-Pop-up (Temperaturen,
  Fenster, Boost & Ventil bzw. Anzeige, Wochenprogramm mit Editor und Kopieren, Info);
  visueller Editor; Deutsch und Englisch. Braucht eq3_max 0.8.0.
