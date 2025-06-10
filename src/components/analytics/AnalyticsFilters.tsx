import { FilterList as FilterIcon } from '@mui/icons-material';
import {
    Card,
    CardContent,
    FormControl,
    InputLabel,
    MenuItem,
    Select,
    Stack
} from '@mui/material';
import type { KidAnalytics } from '../../types/analytics';

interface AnalyticsFiltersProps {
    selectedKid: string;
    onKidChange: (kidId: string) => void;
    timeRange: string;
    onTimeRangeChange: (range: string) => void;
    kidsData: KidAnalytics[];
}

export function AnalyticsFilters({
    selectedKid,
    onKidChange,
    timeRange,
    onTimeRangeChange,
    kidsData
}: AnalyticsFiltersProps) {
    return (
        <Card sx={{ mb: 3 }}>
            <CardContent>
                <Stack direction="row" spacing={2} alignItems="center">
                    <FilterIcon color="action" />
                    <FormControl size="small" sx={{ minWidth: 200 }}>
                        <InputLabel>Niño</InputLabel>
                        <Select
                            value={selectedKid}
                            label="Niño"
                            onChange={(e) => onKidChange(e.target.value)}
                        >
                            <MenuItem value="all">Todos los niños</MenuItem>
                            {kidsData.map((kid) => (
                                <MenuItem key={kid.id} value={kid.id}>
                                    {kid.avatar} {kid.name}
                                </MenuItem>
                            ))}
                        </Select>
                    </FormControl>

                    <FormControl size="small" sx={{ minWidth: 150 }}>
                        <InputLabel>Período</InputLabel>
                        <Select
                            value={timeRange}
                            label="Período"
                            onChange={(e) => onTimeRangeChange(e.target.value)}
                        >
                            <MenuItem value="week">Esta semana</MenuItem>
                            <MenuItem value="month">Este mes</MenuItem>
                            <MenuItem value="quarter">Últimos 3 meses</MenuItem>
                            <MenuItem value="year">Este año</MenuItem>
                        </Select>
                    </FormControl>
                </Stack>
            </CardContent>
        </Card>
    );
}
