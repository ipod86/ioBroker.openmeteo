![Logo](admin/openmeteo.png)

# ioBroker.openmeteo

[![NPM version](https://img.shields.io/npm/v/iobroker.openmeteo.svg)](https://www.npmjs.com/package/iobroker.openmeteo)
[![Downloads](https://img.shields.io/npm/dm/iobroker.openmeteo.svg)](https://www.npmjs.com/package/iobroker.openmeteo)
![Number of Installations](https://iobroker.live/badges/openmeteo-installed.svg)
![Current version in stable repository](https://iobroker.live/badges/openmeteo-stable.svg)
[![NPM](https://nodei.co/npm/iobroker.openmeteo.png?downloads=true)](https://nodei.co/npm/iobroker.openmeteo/)

**Tests:** ![Test and Release](https://github.com/ipod86/ioBroker.openmeteo/workflows/Test%20and%20Release/badge.svg)

---

## English

### ioBroker adapter for Open-Meteo weather forecasts

This adapter retrieves weather forecast data from the free [Open-Meteo API](https://open-meteo.com) and makes it available as ioBroker data points. No API key is required.

### Features

- **Free & no API key** – Open-Meteo is a free, open-source weather API
- **Multiple locations** – configure as many locations as you like
- **System location fallback** – uses ioBroker system coordinates if no location is configured
- **Configurable forecast range** – up to 16 days daily, up to 16 days hourly
- **Configurable update interval** – 60 min, 120 min, or daily at 01:00
- **Units** – temperature (°C / °F), wind speed (km/h, m/s, mph, kn), precipitation (mm / inch)
- **3 weather icon sets** with live preview in settings:
  - Meteocons by Bas Milius – static PNG (default)
  - Meteocons by Bas Milius – animated SVG
  - WMO OGC meteorological symbols – PNG
- **Day/night icons** – Meteocons automatically switch to night variants based on `is_day`
- **Wind direction** – degrees, compass text (N/NE/E/…), arrow emoji (⬆️↗️…), SVG arrow icon
- **Wind strength** – Beaufort scale (0–12) with Meteocons Beaufort icons
- **`info.lastUpdate`** – timestamp of last successful update

#### Optional data groups (individually switchable, each with "also hourly" option)

| Group | Default | Data points |
|-------|---------|-------------|
| **Air Quality** | on | european_aqi, PM10, PM2.5, NO₂, CO, dust, ozone → `current.air_quality` / `hXX.air_quality` |
| **Astronomy** | on | sunrise, sunset, moon phase, moonrise, moonset → `dayX.astronomy` / `hXX.astronomy` |
| **Agriculture / Solar** | off | solar radiation, CAPE, soil temperature, irradiance → `*.agriculture` |
| **Pollen** | off | alder, birch, grass, mugwort, olive, ragweed with level text → `dayX.pollen` / `hXX.pollen` |

When a group is disabled, its data point channels are automatically deleted on the next update.

### Installation

Install via the ioBroker Admin interface or directly from npm:

```bash
npm install iobroker.openmeteo
```

### Configuration

| Setting | Description | Default |
|---------|-------------|---------|
| Locations | Name, latitude, longitude | ioBroker system location |
| Forecast days | Daily forecast range (1–16) | 7 |
| Hourly days | Days with hourly data (0–16) | 3 |
| Temperature unit | °C or °F | °C |
| Wind speed unit | km/h, m/s, mph, kn | km/h |
| Precipitation unit | mm or inch | mm |
| Icon set | Weather icon set | Meteocons static |
| Update interval | 60 min / 120 min / daily at 01:00 | 60 min |
| Air Quality | Enable AQI + particulate matter | on |
| Air Quality – also hourly | Hourly AQI/PM under `hXX.air_quality` | off |
| Astronomy | Enable sun & moon data | on |
| Astronomy – also hourly | Echo astronomy data per hourly slot | off |
| Agriculture / Solar | Enable radiation, CAPE, soil temp | off |
| Agriculture – also hourly | Hourly agricultural data | off |
| Pollen | Enable pollen data (Europe only) | off |
| Pollen – also hourly | Hourly pollen per type | off |

### Data points

The adapter creates data points under `openmeteo.<instance>.<location>`.

#### Current weather (`current`)

| Data point | Description | Unit |
|-----------|-------------|------|
| `temperature` | Current temperature | °C/°F |
| `feels_like` | Feels-like temperature | °C/°F |
| `weathercode` | WMO weather code | |
| `description` | Weather description | |
| `icon` | Weather emoji | |
| `icon_url` | Weather icon URL | |
| `precipitation` | Total precipitation | mm/inch |
| `rain` | Rain amount | mm/inch |
| `snowfall` | Snowfall | cm |
| `snow_depth` | Snow depth | cm |
| `cloudcover` | Cloud cover | % |
| `humidity` | Relative humidity | % |
| `dew_point` | Dew point | °C/°F |
| `pressure` | Atmospheric pressure (MSL) | hPa |
| `visibility` | Visibility | m |
| `is_day` | Daylight indicator | boolean |
| `windspeed` | Wind speed | km/h … |
| `windgusts` | Wind gusts | km/h … |
| `winddirection` | Wind direction | ° |
| `winddirection_text` | Wind direction text | N/NE/… |
| `winddirection_icon` | Wind direction emoji | ⬆️↗️… |
| `winddirection_icon_url` | Wind direction arrow icon URL | |
| `windbeaufort` | Wind strength Beaufort | 0–12 |
| `windbeaufort_icon_url` | Beaufort icon URL | |
| `air_quality.*` | AQI, PM10, PM2.5, NO₂, CO, dust, ozone *(if enabled)* | |
| `pollen.*` | Current pollen per type *(if enabled)* | Grains/m³ |
| `agriculture.*` | Solar radiation, CAPE, soil temperature *(if enabled)* | |

#### Daily forecast (`day1` … `day16`)

| Data point | Description |
|-----------|-------------|
| `date` / `weekday` | Date / day of week |
| `icon` / `icon_url` | Weather icon (day/night variant) |
| `description` | Weather description |
| `temp_max` / `temp_min` | Temperature max/min |
| `feels_like_max` / `feels_like_min` | Feels-like max/min |
| `weathercode` | WMO weather code |
| `precipitation` | Precipitation sum |
| `rain` / `snowfall` | Rain / snowfall sum |
| `rain_probability` | Precipitation probability |
| `windspeed` / `windgusts` | Wind speed / gusts max |
| `winddirection` / `_text` / `_icon` / `_icon_url` | Wind direction |
| `windbeaufort` / `windbeaufort_icon_url` | Beaufort scale |
| `uv_index` | UV index max |
| `sunshine_hours` / `daylight_hours` | Sunshine / daylight duration | h |
| `cloud_cover_max` | Max cloud cover | % |
| `dew_point_mean` / `humidity_mean` / `pressure_mean` | Daily mean values | |
| `astronomy.sunrise` / `astronomy.sunset` | Sunrise / sunset *(if enabled)* | |
| `astronomy.moon_phase_val` / `_text` / `_icon_url` | Moon phase *(if enabled)* | |
| `astronomy.moonrise` / `astronomy.moonset` | Moon rise / set *(if enabled)* | |
| `agriculture.solar_radiation_sum` / `.evapotranspiration` | Solar / evapotranspiration *(if enabled)* | |
| `pollen.alder` … `pollen.ragweed` | Daily max pollen + level text *(if enabled, day1–4)* | |

#### Hourly values (`day1.hourly.h00` … `h23`)

Temperature, feels-like, precipitation, rain, snowfall, snow depth, rain probability, cloud cover, humidity, dew point, pressure, visibility, is_day, wind speed, wind direction (text/emoji/icon), Beaufort, weather code, icon/icon_url, description.

Optional per hour (if enabled + "also hourly"):

| Channel | Data points |
|---------|-------------|
| `hXX.air_quality` | european_aqi, PM10, PM2.5, NO₂, CO, dust, ozone |
| `hXX.astronomy` | sunrise, sunset, moon_phase_val/text/icon_url, moonrise, moonset |
| `hXX.agriculture` | solar_radiation, CAPE, soil_temp, irradiance |
| `hXX.pollen` | alder … ragweed + level text (Keine/Niedrig/Mittel/Hoch) |

#### Summary

| Data point | Description |
|-----------|-------------|
| `weather_short` | Short text overview of all forecast days |
| `info.lastUpdate` | Timestamp of last successful update |

### Icon credits

- **Meteocons** by [Bas Milius](https://github.com/basmilius/weather-icons) – MIT License
- **WMO meteorological symbols** by [OGC MetOcean DWG](https://github.com/OGCMetOceanDWG/WorldWeatherSymbols) – CC BY 4.0

### Disclaimer

This adapter uses the Open-Meteo API. The Open-Meteo name and logo are property of their respective owners. This adapter is an independent community project and is not affiliated with or endorsed by Open-Meteo.

---

## Deutsch

### ioBroker-Adapter für Open-Meteo Wettervorhersagen

Dieser Adapter ruft Wetterdaten von der kostenlosen [Open-Meteo API](https://open-meteo.com) ab und stellt sie als ioBroker-Datenpunkte bereit. Es wird kein API-Schlüssel benötigt.

### Funktionen

- **Kostenlos & kein API-Schlüssel** – Open-Meteo ist eine freie, quelloffene Wetter-API
- **Mehrere Standorte** – beliebig viele Standorte konfigurierbar
- **Systemstandort als Fallback** – verwendet ioBroker-Systemkoordinaten, wenn kein Standort konfiguriert ist
- **Konfigurierbarer Vorhersagezeitraum** – bis zu 16 Tage täglich, bis zu 16 Tage stündlich
- **Konfigurierbares Aktualisierungsintervall** – 60 Min, 120 Min oder täglich um 01:00 Uhr
- **Einheiten** – Temperatur (°C / °F), Wind (km/h, m/s, mph, kn), Niederschlag (mm / inch)
- **3 Wetter-Icon-Sets** mit Live-Vorschau in den Einstellungen:
  - Meteocons von Bas Milius – statische PNG (Standard)
  - Meteocons von Bas Milius – animierte SVG
  - WMO OGC meteorologische Symbole – PNG
- **Tag/Nacht-Icons** – Meteocons wechseln automatisch zur Nacht-Variante basierend auf `is_day`
- **Windrichtung** – Grad, Himmelsrichtungstext (N/NE/E/…), Pfeil-Emoji (⬆️↗️…), SVG-Pfeilicon
- **Windstärke** – Beaufort-Skala (0–12) mit Meteocons Beaufort-Icons
- **`info.lastUpdate`** – Zeitstempel der letzten erfolgreichen Aktualisierung

#### Optionale Datengruppen (einzeln schaltbar, je mit „auch stündlich"-Option)

| Gruppe | Standard | Datenpunkte |
|--------|----------|-------------|
| **Luftqualität** | an | european_aqi, PM10, PM2.5, NO₂, CO, Staub, Ozon → `current.air_quality` / `hXX.air_quality` |
| **Astronomie** | an | Sonnenauf/-untergang, Mondphase, Mondauf/-untergang → `dayX.astronomy` / `hXX.astronomy` |
| **Agrar / Solar** | aus | Solarstrahlung, CAPE, Bodentemperatur, Globalstrahlung → `*.agriculture` |
| **Pollen** | aus | Erle, Birke, Gräser, Beifuß, Olive, Ambrosia mit Textstufe → `dayX.pollen` / `hXX.pollen` |

Wird eine Gruppe deaktiviert, werden die zugehörigen Kanäle beim nächsten Update automatisch gelöscht.

### Installation

Adapter über die ioBroker-Admin-Oberfläche installieren oder direkt über npm:

```bash
npm install iobroker.openmeteo
```

### Konfiguration

| Einstellung | Beschreibung | Standard |
|-------------|--------------|----------|
| Standorte | Name, Breitengrad, Längengrad | ioBroker-Systemstandort |
| Vorhersagetage | Täglicher Vorhersagezeitraum (1–16) | 7 |
| Stundentage | Tage mit Stundenwerten (0–16) | 3 |
| Temperatureinheit | °C oder °F | °C |
| Windeinheit | km/h, m/s, mph, kn | km/h |
| Niederschlagseinheit | mm oder inch | mm |
| Icon-Set | Wetter-Icon-Set | Meteocons statisch |
| Aktualisierungsintervall | 60 Min / 120 Min / täglich um 01:00 | 60 Min |
| Luftqualität | AQI + Feinstaub aktivieren | an |
| Luftqualität – auch stündlich | Stündliche AQI/PM unter `hXX.air_quality` | aus |
| Astronomie | Sonne & Mond aktivieren | an |
| Astronomie – auch stündlich | Astronomiedaten pro Stundenslot | aus |
| Agrar / Solar | Strahlung, CAPE, Bodentemperatur aktivieren | aus |
| Agrar – auch stündlich | Stündliche Agrardaten | aus |
| Pollen | Pollendaten aktivieren (nur Europa) | aus |
| Pollen – auch stündlich | Stündliche Pollen pro Typ | aus |

### Datenpunkte

Der Adapter legt Datenpunkte unter `openmeteo.<instanz>.<standort>` an.

#### Aktuelles Wetter (`current`)

| Datenpunkt | Beschreibung | Einheit |
|-----------|--------------|---------|
| `temperature` | Aktuelle Temperatur | °C/°F |
| `feels_like` | Gefühlte Temperatur | °C/°F |
| `weathercode` | WMO-Wettercode | |
| `description` | Wetterbeschreibung | |
| `icon` | Wetter-Emoji | |
| `icon_url` | Wetter-Icon-URL | |
| `precipitation` | Gesamtniederschlag | mm/inch |
| `rain` | Regen | mm/inch |
| `snowfall` | Schneefall | cm |
| `snow_depth` | Schneehöhe | cm |
| `cloudcover` | Bewölkung | % |
| `humidity` | Relative Luftfeuchtigkeit | % |
| `dew_point` | Taupunkt | °C/°F |
| `pressure` | Luftdruck (MSL) | hPa |
| `visibility` | Sichtweite | m |
| `is_day` | Tag/Nacht | boolean |
| `windspeed` | Windgeschwindigkeit | km/h … |
| `windgusts` | Windböen | km/h … |
| `winddirection` | Windrichtung | ° |
| `winddirection_text` | Windrichtungstext | N/NE/… |
| `winddirection_icon` | Windrichtungs-Emoji | ⬆️↗️… |
| `winddirection_icon_url` | Windrichtungs-Pfeilicon-URL | |
| `windbeaufort` | Windstärke Beaufort | 0–12 |
| `windbeaufort_icon_url` | Beaufort-Icon-URL | |
| `air_quality.*` | AQI, PM10, PM2.5, NO₂, CO, Staub, Ozon *(wenn aktiviert)* | |
| `pollen.*` | Aktuelle Pollen pro Typ *(wenn aktiviert)* | Körner/m³ |
| `agriculture.*` | Solarstrahlung, CAPE, Bodentemperatur *(wenn aktiviert)* | |

#### Tagesvorhersage (`day1` … `day16`)

| Datenpunkt | Beschreibung |
|-----------|--------------|
| `date` / `weekday` | Datum / Wochentag |
| `icon` / `icon_url` | Wetter-Icon (Tag/Nacht-Variante) |
| `description` | Wetterbeschreibung |
| `temp_max` / `temp_min` | Temperatur max/min |
| `feels_like_max` / `feels_like_min` | Gefühlte Temperatur max/min |
| `weathercode` | WMO-Wettercode |
| `precipitation` | Niederschlagssumme |
| `rain` / `snowfall` | Regen- / Schneefallsumme |
| `rain_probability` | Niederschlagswahrscheinlichkeit |
| `windspeed` / `windgusts` | Windgeschwindigkeit / Böen max |
| `winddirection` / `_text` / `_icon` / `_icon_url` | Windrichtung |
| `windbeaufort` / `windbeaufort_icon_url` | Beaufort-Skala |
| `uv_index` | UV-Index max |
| `sunshine_hours` / `daylight_hours` | Sonnenschein- / Tageslichtdauer | h |
| `cloud_cover_max` | Bewölkung max | % |
| `dew_point_mean` / `humidity_mean` / `pressure_mean` | Tages-Mittelwerte | |
| `astronomy.sunrise` / `astronomy.sunset` | Sonnenauf/-untergang *(wenn aktiviert)* | |
| `astronomy.moon_phase_val` / `_text` / `_icon_url` | Mondphase *(wenn aktiviert)* | |
| `astronomy.moonrise` / `astronomy.moonset` | Mondauf/-untergang *(wenn aktiviert)* | |
| `agriculture.solar_radiation_sum` / `.evapotranspiration` | Solar / Evapotranspiration *(wenn aktiviert)* | |
| `pollen.alder` … `pollen.ragweed` | Tagesmax. Pollen + Textstufe *(wenn aktiviert, Tag 1–4)* | |

#### Stundenwerte (`day1.hourly.h00` … `h23`)

Temperatur, gefühlte Temperatur, Niederschlag, Regen, Schneefall, Schneehöhe, Regenwahrscheinlichkeit, Bewölkung, Luftfeuchtigkeit, Taupunkt, Luftdruck, Sichtweite, Tag/Nacht, Windgeschwindigkeit, Windrichtung (Text/Emoji/Icon), Beaufort, Wettercode, Icon/Icon-URL, Beschreibung.

Optional pro Stunde (wenn Gruppe aktiviert + „auch stündlich"):

| Kanal | Datenpunkte |
|-------|-------------|
| `hXX.air_quality` | european_aqi, PM10, PM2.5, NO₂, CO, Staub, Ozon |
| `hXX.astronomy` | Sonnenauf/-untergang, Mondphase (val/text/icon), Mondauf/-untergang |
| `hXX.agriculture` | Solarstrahlung, CAPE, Bodentemperatur, Globalstrahlung |
| `hXX.pollen` | Erle … Ambrosia + Textstufe (Keine/Niedrig/Mittel/Hoch) |

#### Zusammenfassung

| Datenpunkt | Beschreibung |
|-----------|--------------|
| `weather_short` | Kurzübersicht aller Vorhersagetage als Text |
| `info.lastUpdate` | Zeitstempel der letzten erfolgreichen Aktualisierung |

### Icon-Lizenzen

- **Meteocons** von [Bas Milius](https://github.com/basmilius/weather-icons) – MIT-Lizenz
- **WMO meteorologische Symbole** von [OGC MetOcean DWG](https://github.com/OGCMetOceanDWG/WorldWeatherSymbols) – CC BY 4.0

### Haftungsausschluss

Dieser Adapter verwendet die Open-Meteo API. Der Name und das Logo von Open-Meteo sind Eigentum der jeweiligen Inhaber. Dieser Adapter ist ein unabhängiges Community-Projekt und steht in keiner Verbindung zu Open-Meteo.

---

## Changelog

### 0.0.29
* Default for pollen hourly changed to off

### 0.0.28
* "Also hourly" toggle for all 4 optional data groups (Air Quality, Astronomy, Agriculture, Pollen)
* Air Quality hourly: real hourly PM10/PM2.5/AQI data from Air Quality API
* Astronomy hourly: daily sun/moon values echoed per hourly slot
* Update interval options: 60 min, 120 min, or daily at 01:00 (scheduled exactly)

### 0.0.27
* "Also hourly" toggle for Agriculture and Pollen categories

### 0.0.26
* Optional data groups: Air Quality, Astronomy, Agriculture/Solar – each with auto-cleanup when disabled
* Pollen cleanup: dayX.pollen channels removed when pollen is disabled

### 0.0.25
* Moon phase per day: moon_phase_val/text/icon_url, moonrise, moonset (via SunCalc)
* Day/night icon variants for Basmilius PNG and animated SVG (based on is_day)
* AQI current data under current.air_quality: european_aqi, PM10, PM2.5, NO₂, CO, dust, ozone
* Pollen level text (_text) DPs: Keine/Niedrig/Mittel/Hoch at current/daily/hourly level
* Configurable update interval in settings
* info.lastUpdate written after each successful update
* Additional daily DPs: cloud_cover_max, dew_point_mean, humidity_mean, pressure_mean
* Additional hourly DPs: soil_temp, irradiance

### 0.0.23
* Add current pollen values under `current.pollen`

### 0.0.22
* Add hourly pollen values under `dayX.hourly.hXX.pollen`

### 0.0.21
* Fix: pollen stored under `dayX.pollen` (daily max) instead of top-level channel

### 0.0.20
* Add extended weather data: humidity, dew point, pressure, visibility, is_day, rain, snowfall, snow depth, solar radiation, CAPE (current + hourly)
* Add daily data: rain sum, snowfall sum, daylight hours, solar radiation sum, evapotranspiration
* Add optional pollen support (Europe only) via settings toggle

### 0.0.19
* Bilingual README (EN/DE)

### 0.0.18
* Replace placeholder icon with official Open-Meteo logo

### 0.0.17
* Fix: windspeedUnit not available in processData

### 0.0.16
* Add wind direction emoji (⬆️↗️➡️↘️⬇️↙️⬅️↖️)
* Add Beaufort scale datapoints and Meteocons Beaufort icons

### 0.0.15
* Add wind direction datapoints (degrees, text, icon, icon_url) for current/daily/hourly
* Add 8 SVG wind direction arrow icons

### 0.0.14
* Remove unused Sentry plugin config

### 0.0.13
* Fix: icon preview hidden behind save/close toolbar
* Auto-fill locations from ioBroker system.config on first open

### 0.0.12
* Fix: settings page scrolling
* Default icon set changed to Meteocons

### 0.0.11
* Add React admin UI with icon set picker and live preview
* Add Meteocons (static PNG + animated SVG) icon sets

### 0.0.4
* Read ioBroker system.config coordinates as fallback location

### 0.0.2
* Switch to daemon mode for immediate fetch on start

### 0.0.1
* Initial release

---

## License

MIT License

Copyright (c) 2026 David G. <david@graef.email>

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
