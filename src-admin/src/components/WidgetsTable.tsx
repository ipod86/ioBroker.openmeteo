import React from 'react';
import {
    Alert, Box, Button, IconButton, Typography, Slider, TextField, Switch, FormControlLabel,
    Select, MenuItem, FormControl, InputLabel, ToggleButtonGroup, ToggleButton,
} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import AddIcon from '@mui/icons-material/Add';
import { I18n } from '@iobroker/adapter-react-v5';
import { Location, Widget } from '../types';

interface Props {
    widgets: Widget[];
    locations: Location[];
    daysCount: number;
    hourlyDays: number;
    enableAstronomy: boolean;
    onChange: (widgets: Widget[]) => void;
}

const PRESETS: Record<'dark' | 'light', { bgColor: string; textBase: string }> = {
    dark:  { bgColor: 'transparent', textBase: '#000000' },
    light: { bgColor: 'transparent', textBase: '#ffffff' },
};

function makeId(): string {
    return Math.random().toString(36).substring(2, 8);
}

const ColorSwatch: React.FC<{ value: string; onChange: (v: string) => void; disabled?: boolean }> = ({ value, onChange, disabled }) => (
    <Box
        component="input"
        type="color"
        value={value}
        disabled={disabled}
        onChange={(e: React.ChangeEvent<HTMLInputElement>) => onChange(e.target.value)}
        sx={{
            width: 32, height: 32, border: '1px solid', borderColor: 'divider',
            borderRadius: 1, padding: '2px', cursor: disabled ? 'default' : 'pointer',
            background: 'none', opacity: disabled ? 0.35 : 1, flexShrink: 0,
        }}
    />
);

const WidgetsTable: React.FC<Props> = ({ widgets, locations, daysCount, hourlyDays, enableAstronomy, onChange }) => {
    const update = (index: number, patch: Partial<Widget>): void => {
        const updated = widgets.map((w, i) => i === index ? { ...w, ...patch } : w);
        onChange(updated);
    };

    const add = (): void => {
        const defaultLoc = locations[0]?.name || '';
        const defaultDays = ([5, 7, 14] as const).find(d => d <= daysCount) ?? 5;
        onChange([...widgets, {
            id: makeId(),
            locationName: defaultLoc,
            days: defaultDays,
            variant: 'simple',
            theme: 'dark',
            width: 450,
            bgColor: 'transparent',
            textBase: '#000000',
        }]);
    };

    const remove = (index: number): void => {
        onChange(widgets.filter((_, i) => i !== index));
    };

    return (
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
            <Typography variant="body2" color="text.secondary">
                {I18n.t('widgetHint')}
            </Typography>

            {widgets.map((w, i) => {
                const isTransparent = !w.bgColor || w.bgColor === 'transparent';
                const resolvedBg = isTransparent ? '#1e1e1e' : w.bgColor;
                const resolvedText = w.textBase || PRESETS[w.theme ?? 'dark'].textBase;

                return (
                    <Box key={w.id} sx={{ border: '1px solid', borderColor: 'divider', borderRadius: 1, p: 2 }}>
                        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 1.5 }}>
                            <Typography variant="subtitle2">
                                Widget {i + 1} — DP: <code>{w.locationName ? `${w.locationName}.widget.${w.id}` : '…'}</code>
                            </Typography>
                            <IconButton onClick={() => remove(i)} color="error" size="small">
                                <DeleteIcon />
                            </IconButton>
                        </Box>

                        <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 2, alignItems: 'flex-end' }}>
                            {/* Location */}
                            <FormControl size="small" sx={{ minWidth: 180 }}>
                                <InputLabel>{I18n.t('location')}</InputLabel>
                                <Select
                                    value={w.locationName}
                                    label={I18n.t('location')}
                                    onChange={e => update(i, { locationName: e.target.value })}
                                >
                                    {locations.map(loc => (
                                        <MenuItem key={loc.name} value={loc.name}>{loc.name}</MenuItem>
                                    ))}
                                </Select>
                            </FormControl>

                            {/* Variant */}
                            <Box>
                                <Typography variant="caption" color="text.secondary" sx={{ display: 'block', mb: 0.5 }}>
                                    {I18n.t('widgetVariant')}
                                </Typography>
                                <ToggleButtonGroup
                                    value={w.variant ?? 'simple'}
                                    exclusive
                                    size="small"
                                    onChange={(_, v) => v && update(i, { variant: v })}
                                >
                                    <ToggleButton value="simple">{I18n.t('widgetVariantSimple')}</ToggleButton>
                                    <ToggleButton value="detailed">{I18n.t('widgetVariantDetailed')}</ToggleButton>
                                </ToggleButtonGroup>
                                {(w.variant ?? 'simple') === 'detailed' && hourlyDays === 0 && (
                                    <Alert severity="warning" sx={{ mt: 1, maxWidth: 340 }}>
                                        {I18n.t('widgetDetailedNoHourly')}
                                    </Alert>
                                )}
                                {(w.variant ?? 'simple') === 'detailed' && !enableAstronomy && (
                                    <Alert severity="info" sx={{ mt: 1, maxWidth: 340 }}>
                                        {I18n.t('widgetDetailedNoAstronomy')}
                                    </Alert>
                                )}
                            </Box>

                            {/* Days */}
                            <Box>
                                <Typography variant="caption" color="text.secondary" sx={{ display: 'block', mb: 0.5 }}>
                                    {I18n.t('widgetDays')}
                                </Typography>
                                <ToggleButtonGroup
                                    value={w.days}
                                    exclusive
                                    size="small"
                                    onChange={(_, v) => v && update(i, { days: v })}
                                >
                                    {([5, 7, 14] as const).map(d => (
                                        <ToggleButton key={d} value={d} disabled={d > daysCount}>
                                            {d}
                                        </ToggleButton>
                                    ))}
                                </ToggleButtonGroup>
                            </Box>

                            {/* Theme preset */}
                            <Box>
                                <Typography variant="caption" color="text.secondary" sx={{ display: 'block', mb: 0.5 }}>
                                    {I18n.t('widgetTheme')}
                                </Typography>
                                <ToggleButtonGroup
                                    value={w.theme ?? 'dark'}
                                    exclusive
                                    size="small"
                                    onChange={(_, v) => {
                                        if (!v) return;
                                        if (v === 'custom') {
                                            // pre-fill from current preset so pickers start with sensible values
                                            const base = PRESETS[(w.theme as 'dark' | 'light') ?? 'dark'] ?? PRESETS.dark;
                                            update(i, { theme: 'custom', bgColor: w.bgColor || base.bgColor, textBase: w.textBase || base.textBase });
                                        } else {
                                            update(i, { theme: v, ...PRESETS[v as 'dark' | 'light'] });
                                        }
                                    }}
                                >
                                    <ToggleButton value="dark">{I18n.t('widgetDark')}</ToggleButton>
                                    <ToggleButton value="light">{I18n.t('widgetLight')}</ToggleButton>
                                    <ToggleButton value="custom">{I18n.t('widgetCustom')}</ToggleButton>
                                </ToggleButtonGroup>
                            </Box>

                            {/* Custom color pickers — only when theme === 'custom' */}
                            {w.theme === 'custom' && (
                                <Box sx={{
                                    display: 'flex', flexDirection: 'column', gap: 1,
                                    p: 1.5, border: '1px solid', borderColor: 'divider',
                                    borderRadius: 1, bgcolor: 'action.hover', minWidth: 280,
                                }}>
                                    {/* Background row */}
                                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                                        <Typography variant="caption" color="text.secondary" sx={{ width: 36, flexShrink: 0 }}>
                                            {I18n.t('widgetBgColor')}
                                        </Typography>
                                        <Switch
                                            size="small"
                                            checked={isTransparent}
                                            onChange={e => update(i, { bgColor: e.target.checked ? 'transparent' : '#1e1e1e' })}
                                        />
                                        <Typography variant="caption" color="text.secondary" sx={{ mr: 0.5 }}>
                                            {I18n.t('widgetTransparent')}
                                        </Typography>
                                        <ColorSwatch
                                            value={resolvedBg}
                                            onChange={v => update(i, { bgColor: v })}
                                            disabled={isTransparent}
                                        />
                                        <TextField
                                            value={isTransparent ? 'transparent' : (w.bgColor ?? '#1e1e1e')}
                                            size="small"
                                            disabled={isTransparent}
                                            sx={{ width: 100 }}
                                            inputProps={{ style: { fontFamily: 'monospace', fontSize: 12, padding: '4px 8px' } }}
                                            onChange={e => {
                                                const v = e.target.value;
                                                if (/^#[0-9a-fA-F]{0,6}$/.test(v)) update(i, { bgColor: v });
                                            }}
                                            onBlur={e => {
                                                const v = e.target.value;
                                                if (/^#[0-9a-fA-F]{6}$/.test(v)) update(i, { bgColor: v });
                                            }}
                                        />
                                    </Box>

                                    {/* Text color row */}
                                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                                        <Typography variant="caption" color="text.secondary" sx={{ width: 36, flexShrink: 0 }}>
                                            {I18n.t('widgetTextColor')}
                                        </Typography>
                                        {/* spacer to align with bg row */}
                                        <Box sx={{ width: 58, flexShrink: 0 }} />
                                        <ColorSwatch
                                            value={resolvedText}
                                            onChange={v => update(i, { textBase: v })}
                                        />
                                        <TextField
                                            value={w.textBase ?? '#000000'}
                                            size="small"
                                            sx={{ width: 100 }}
                                            inputProps={{ style: { fontFamily: 'monospace', fontSize: 12, padding: '4px 8px' } }}
                                            onChange={e => {
                                                const v = e.target.value;
                                                if (/^#[0-9a-fA-F]{0,6}$/.test(v)) update(i, { textBase: v });
                                            }}
                                            onBlur={e => {
                                                const v = e.target.value;
                                                if (/^#[0-9a-fA-F]{6}$/.test(v)) update(i, { textBase: v });
                                            }}
                                        />
                                        {/* Live preview */}
                                        <Box sx={{
                                            ml: 'auto', px: 1.5, height: 28, borderRadius: 1,
                                            bgcolor: isTransparent ? 'transparent' : (w.bgColor || '#1e1e1e'),
                                            border: '1px solid', borderColor: 'divider',
                                            display: 'flex', alignItems: 'center',
                                        }}>
                                            <Typography variant="caption" sx={{ color: resolvedText, fontWeight: 600, whiteSpace: 'nowrap' }}>
                                                Abc 123
                                            </Typography>
                                        </Box>
                                    </Box>
                                </Box>
                            )}

                            {/* Width */}
                            <Box sx={{ minWidth: 220 }}>
                                <Typography variant="caption" color="text.secondary" sx={{ display: 'block', mb: 0.5 }}>
                                    {I18n.t('widgetWidth')}
                                </Typography>
                                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
                                    <Slider
                                        value={w.width ?? 450}
                                        min={200}
                                        max={900}
                                        step={10}
                                        size="small"
                                        sx={{ width: 140 }}
                                        onChange={(_, v) => update(i, { width: v as number })}
                                    />
                                    <TextField
                                        value={w.width ?? 450}
                                        type="number"
                                        size="small"
                                        sx={{ width: 75 }}
                                        inputProps={{ min: 200, max: 900, step: 10 }}
                                        onChange={e => {
                                            const v = Math.min(900, Math.max(200, parseInt(e.target.value) || 450));
                                            update(i, { width: v });
                                        }}
                                    />
                                    <Typography variant="caption" color="text.secondary">px</Typography>
                                </Box>
                            </Box>
                        </Box>
                    </Box>
                );
            })}

            <Box>
                <Button startIcon={<AddIcon />} onClick={add} variant="outlined" size="small">
                    {I18n.t('addWidget')}
                </Button>
            </Box>
        </Box>
    );
};

export default WidgetsTable;
