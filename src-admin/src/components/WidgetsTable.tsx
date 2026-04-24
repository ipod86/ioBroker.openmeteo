import React from 'react';
import {
    Box, Button, IconButton, Typography,
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
    onChange: (widgets: Widget[]) => void;
}

function makeId(): string {
    return Math.random().toString(36).substring(2, 8);
}

const WidgetsTable: React.FC<Props> = ({ widgets, locations, daysCount, onChange }) => {
    const update = (index: number, field: keyof Widget, value: any): void => {
        const updated = widgets.map((w, i) => i === index ? { ...w, [field]: value } : w);
        onChange(updated);
    };

    const add = (): void => {
        const defaultLoc = locations[0]?.name || '';
        const defaultDays = ([5, 7, 14] as const).find(d => d <= daysCount) ?? 5;
        onChange([...widgets, {
            id: makeId(),
            locationName: defaultLoc,
            days: defaultDays,
            theme: 'dark',
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

            {widgets.map((w, i) => (
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
                                onChange={e => update(i, 'locationName', e.target.value)}
                            >
                                {locations.map(loc => (
                                    <MenuItem key={loc.name} value={loc.name}>{loc.name}</MenuItem>
                                ))}
                            </Select>
                        </FormControl>

                        {/* Days */}
                        <Box>
                            <Typography variant="caption" color="text.secondary" sx={{ display: 'block', mb: 0.5 }}>
                                {I18n.t('widgetDays')}
                            </Typography>
                            <ToggleButtonGroup
                                value={w.days}
                                exclusive
                                size="small"
                                onChange={(_, v) => v && update(i, 'days', v)}
                            >
                                {([5, 7, 14] as const).map(d => (
                                    <ToggleButton key={d} value={d} disabled={d > daysCount}>
                                        {d}
                                    </ToggleButton>
                                ))}
                            </ToggleButtonGroup>
                        </Box>

                        {/* Theme */}
                        <Box>
                            <Typography variant="caption" color="text.secondary" sx={{ display: 'block', mb: 0.5 }}>
                                {I18n.t('widgetTheme')}
                            </Typography>
                            <ToggleButtonGroup
                                value={w.theme}
                                exclusive
                                size="small"
                                onChange={(_, v) => v && update(i, 'theme', v)}
                            >
                                <ToggleButton value="dark">{I18n.t('widgetDark')}</ToggleButton>
                                <ToggleButton value="light">{I18n.t('widgetLight')}</ToggleButton>
                            </ToggleButtonGroup>
                        </Box>
                    </Box>
                </Box>
            ))}

            <Box>
                <Button startIcon={<AddIcon />} onClick={add} variant="outlined" size="small">
                    {I18n.t('addWidget')}
                </Button>
            </Box>
        </Box>
    );
};

export default WidgetsTable;
