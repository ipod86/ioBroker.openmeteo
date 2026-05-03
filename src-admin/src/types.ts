export interface Location {
    name: string;
    lat: number;
    lon: number;
}

export interface Widget {
    id: string;
    locationName: string;
    days: 5 | 7 | 14;
    variant: 'simple' | 'detailed';
    theme: 'light' | 'dark' | 'custom';
    width: number;
    bgColor: string;    // hex '#rrggbb' or 'transparent'
    textBase: string;   // hex '#rrggbb'
    hourlyRange?: number; // hours to show from now (default 20)
    hourlyStep?: number;  // step in hours (default 2)
    fontScale?: number;   // font size offset -5..+5 (default 0)
}

export interface OpenMeteoConfig {
    locations: Location[];
    daysCount: number;
    hourlyDays: number;
    temperatureUnit: 'celsius' | 'fahrenheit';
    windspeedUnit: 'kmh' | 'ms' | 'mph' | 'kn';
    precipitationUnit: 'mm' | 'inch';
    iconSet: 'wmo' | 'basmilius' | 'basmilius_animated' | 'amcharts_animated' | 'amcharts_static' | 'custom';
    updateInterval: number;
    enableAirQuality: boolean;
    enableAirQualityHourly: boolean;
    enableAstronomy: boolean;
    enableAstronomyHourly: boolean;
    enableAgriculture: boolean;
    enableAgricultureHourly: boolean;
    enablePollen: boolean;
    enablePollenHourly: boolean;
    enableComfort: boolean;
    enableComfortHourly: boolean;
    warnOfficial: boolean;
    warnOfficialMinLevel: number;
    warnExcludeKeywords: string;
    warnIntervalMinutes: number;
    warnNotifyLift: boolean;
    widgets: Widget[];
    warnStorm: boolean;
    warnStormBft: number;
    warnThunderstorm: boolean;
    warnFrost: boolean;
    warnFrostThreshold: number;
    warnLeadHours: number;
}
