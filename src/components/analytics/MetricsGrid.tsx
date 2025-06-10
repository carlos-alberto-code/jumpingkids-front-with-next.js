import { Grid } from '@mui/material';
import type { MetricCardData } from '../../types/analytics';
import { MetricCard } from './MetricCard';

interface MetricsGridProps {
    metrics: MetricCardData[];
    columns?: { xs?: number; sm?: number; md?: number; lg?: number };
    spacing?: number;
    onMetricClick?: (metric: MetricCardData, index: number) => void;
}

export function MetricsGrid({
    metrics,
    columns = { xs: 12, sm: 6, md: 3 },
    spacing = 3,
    onMetricClick
}: MetricsGridProps) {
    return (
        <Grid container spacing={spacing} sx={{ mb: 3 }}>
            {metrics.map((metric, index) => (
                <Grid size={columns} key={`${metric.title}-${index}`}>
                    <MetricCard
                        {...metric}
                        onClick={onMetricClick ? () => onMetricClick(metric, index) : undefined}
                    />
                </Grid>
            ))}
        </Grid>
    );
}
