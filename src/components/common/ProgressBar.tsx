import { Box, LinearProgress, Typography, useTheme } from '@mui/material';

export interface ProgressBarProps {
    value: number;
    total?: number;
    label?: string;
    showPercentage?: boolean;
    showFraction?: boolean;
    height?: number;
    color?: 'primary' | 'secondary' | 'success' | 'warning' | 'error' | 'info';
    variant?: 'determinate' | 'indeterminate';
    sx?: any;
}

export default function ProgressBar({
    value,
    total = 100,
    label,
    showPercentage = false,
    showFraction = false,
    height = 6,
    color = 'primary',
    variant = 'determinate',
    sx,
}: ProgressBarProps) {
    const theme = useTheme();
    const percentage = total > 0 ? Math.min((value / total) * 100, 100) : 0;

    return (
        <Box sx={sx}>
            {label && (
                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 1 }}>
                    <Typography variant="body2" color="text.secondary">
                        {label}
                    </Typography>
                    {(showPercentage || showFraction) && (
                        <Typography variant="body2" color="text.secondary">
                            {showFraction && `${value}/${total}`}
                            {showFraction && showPercentage && ' • '}
                            {showPercentage && `${Math.round(percentage)}%`}
                        </Typography>
                    )}
                </Box>
            )}

            <LinearProgress
                variant={variant}
                value={percentage}
                sx={{
                    height,
                    borderRadius: height / 2,
                    backgroundColor: theme.palette.grey[200],
                    '& .MuiLinearProgress-bar': {
                        backgroundColor: theme.palette[color].main,
                        borderRadius: height / 2,
                    },
                }}
            />
        </Box>
    );
}
