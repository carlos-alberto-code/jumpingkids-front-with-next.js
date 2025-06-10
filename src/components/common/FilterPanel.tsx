import {
    Clear as ClearIcon,
    ExpandLess as CollapseIcon,
    ExpandMore as ExpandIcon,
    FilterList as FilterIcon
} from '@mui/icons-material';
import {
    Box,
    Button,
    Collapse,
    FormControl,
    IconButton,
    InputLabel,
    MenuItem,
    Paper,
    Select,
    Stack,
    TextField,
    Typography
} from '@mui/material';
import { useState } from 'react';

export interface FilterOption {
    label: string;
    value: string;
}

export interface FilterConfig {
    key: string;
    label: string;
    type: 'select' | 'text';
    options?: FilterOption[];
    placeholder?: string;
}

export interface FilterPanelProps {
    filters: Record<string, string>;
    filterConfigs: FilterConfig[];
    onFilterChange: (filterKey: string, value: string) => void;
    onClearFilters: () => void;
    title?: string;
    collapsible?: boolean;
    defaultExpanded?: boolean;
}

export default function FilterPanel({
    filters,
    filterConfigs,
    onFilterChange,
    onClearFilters,
    title = 'Filtros',
    collapsible = true,
    defaultExpanded = false
}: FilterPanelProps) {
    const [expanded, setExpanded] = useState(defaultExpanded);

    const hasActiveFilters = Object.values(filters).some(value => value !== '');
    const activeFiltersCount = Object.values(filters).filter(value => value !== '').length;

    const handleToggleExpanded = () => {
        setExpanded(!expanded);
    };

    const renderFilter = (config: FilterConfig) => {
        const value = filters[config.key] || '';

        if (config.type === 'select') {
            return (
                <FormControl size="small" sx={{ minWidth: 150 }}>
                    <InputLabel>{config.label}</InputLabel>
                    <Select
                        value={value}
                        label={config.label}
                        onChange={(e) => onFilterChange(config.key, e.target.value)}
                    >
                        <MenuItem value="">
                            <em>Todos</em>
                        </MenuItem>
                        {config.options?.map((option) => (
                            <MenuItem key={option.value} value={option.value}>
                                {option.label}
                            </MenuItem>
                        ))}
                    </Select>
                </FormControl>
            );
        }

        return (
            <TextField
                size="small"
                label={config.label}
                placeholder={config.placeholder}
                value={value}
                onChange={(e) => onFilterChange(config.key, e.target.value)}
                sx={{ minWidth: 200 }}
            />
        );
    };

    const FilterContent = () => (
        <Stack direction="row" spacing={2} flexWrap="wrap" useFlexGap>
            {filterConfigs.map((config) => (
                <Box key={config.key}>
                    {renderFilter(config)}
                </Box>
            ))}
            {hasActiveFilters && (
                <Button
                    startIcon={<ClearIcon />}
                    onClick={onClearFilters}
                    variant="outlined"
                    size="small"
                    sx={{ alignSelf: 'center' }}
                >
                    Limpiar
                </Button>
            )}
        </Stack>
    );

    if (!collapsible) {
        return (
            <Paper sx={{ p: 2, mb: 2 }}>
                <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                    <FilterIcon sx={{ mr: 1 }} />
                    <Typography variant="h6" component="h2">
                        {title}
                    </Typography>
                    {activeFiltersCount > 0 && (
                        <Typography variant="body2" color="primary" sx={{ ml: 1 }}>
                            ({activeFiltersCount} activos)
                        </Typography>
                    )}
                </Box>
                <FilterContent />
            </Paper>
        );
    }

    return (
        <Paper sx={{ mb: 2 }}>
            <Box
                sx={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    p: 2,
                    cursor: 'pointer'
                }}
                onClick={handleToggleExpanded}
            >
                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                    <FilterIcon sx={{ mr: 1 }} />
                    <Typography variant="h6" component="h2">
                        {title}
                    </Typography>
                    {activeFiltersCount > 0 && (
                        <Typography variant="body2" color="primary" sx={{ ml: 1 }}>
                            ({activeFiltersCount} activos)
                        </Typography>
                    )}
                </Box>
                <IconButton size="small">
                    {expanded ? <CollapseIcon /> : <ExpandIcon />}
                </IconButton>
            </Box>
            <Collapse in={expanded}>
                <Box sx={{ p: 2, pt: 0 }}>
                    <FilterContent />
                </Box>
            </Collapse>
        </Paper>
    );
}
