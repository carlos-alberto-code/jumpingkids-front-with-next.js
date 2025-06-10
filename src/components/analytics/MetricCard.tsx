import { Box, Card, CardContent, Typography } from '@mui/material';
import type { MetricCardData } from '../../types/analytics';

interface MetricCardProps extends MetricCardData {
    onClick?: () => void;
}

export function MetricCard({
    icon,
    title,
    value,
    subtitle,
    color = 'primary.main',
    trend,
    onClick
}: MetricCardProps) {
    return (
        <Card
            sx={{
                cursor: onClick ? 'pointer' : 'default',
                '&:hover': onClick ? {
                    transform: 'translateY(-2px)',
                    boxShadow: 2,
                    transition: 'all 0.2s ease-in-out'
                } : {}
            }}
            onClick={onClick}
        >
            <CardContent sx={{ textAlign: 'center' }}>
                <Box sx={{ color, fontSize: 40, mb: 1 }}>
                    {icon}
                </Box>
                <Typography variant="h4" fontWeight="bold" sx={{ color }}>
                    {value}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                    {subtitle}
                </Typography>
                {trend && (
                    <Typography
                        variant="caption"
                        color={trend.positive !== false ? 'success.main' : 'error.main'}
                        sx={{ display: 'block', mt: 1 }}
                    >
                        {trend.positive !== false ? '+' : ''}{trend.value}% {trend.label}
                    </Typography>
                )}
            </CardContent>
        </Card>
    );
}