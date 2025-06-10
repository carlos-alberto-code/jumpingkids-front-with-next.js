import { Box, Typography, useTheme } from '@mui/material';

interface WeeklyProgressChartProps {
    progress: number[];
    title?: string;
    dayLabels?: string[];
    size?: 'small' | 'medium' | 'large';
}

export function WeeklyProgressChart({
    progress,
    title = "📅 Esta Semana",
    dayLabels = ['L', 'M', 'X', 'J', 'V', 'S', 'D'],
    size = 'medium'
}: WeeklyProgressChartProps) {
    const theme = useTheme();

    const getSizeConfig = () => {
        switch (size) {
            case 'small':
                return { width: 24, height: 24, fontSize: '0.625rem' };
            case 'large':
                return { width: 40, height: 40, fontSize: '0.875rem' };
            default:
                return { width: 32, height: 32, fontSize: '0.75rem' };
        }
    };

    const sizeConfig = getSizeConfig();

    return (
        <Box>
            <Typography variant="subtitle1" fontWeight="bold" gutterBottom>
                {title}
            </Typography>
            <Box sx={{ display: 'flex', gap: 1, mb: 2 }}>
                {dayLabels.map((day, index) => (
                    <Box
                        key={day}
                        sx={{
                            width: sizeConfig.width,
                            height: sizeConfig.height,
                            borderRadius: '50%',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            backgroundColor: progress[index]
                                ? theme.palette.success.main
                                : theme.palette.grey[300],
                            color: progress[index] ? 'white' : theme.palette.grey[600],
                            fontSize: sizeConfig.fontSize,
                            fontWeight: 'bold',
                            transition: 'all 0.2s ease-in-out',
                            '&:hover': {
                                transform: 'scale(1.1)',
                            }
                        }}
                    >
                        {day}
                    </Box>
                ))}
            </Box>
            <Typography variant="caption" color="text.secondary">
                Verde = rutina completada
            </Typography>
        </Box>
    );
}
