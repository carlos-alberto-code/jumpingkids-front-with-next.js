import { Schedule as TimeIcon } from '@mui/icons-material';
import { Box, Typography, useTheme } from '@mui/material';

export interface TimeDisplayProps {
    duration: number; // en minutos
    showIcon?: boolean;
    variant?: 'compact' | 'detailed';
    color?: 'primary' | 'secondary' | 'inherit';
    size?: 'small' | 'medium' | 'large';
}

export default function TimeDisplay({
    duration,
    showIcon = true,
    variant = 'compact',
    color = 'inherit',
    size = 'medium'
}: TimeDisplayProps) {
    const theme = useTheme();

    const formatDuration = (minutes: number) => {
        if (variant === 'compact') {
            return `${minutes}min`;
        }

        const hours = Math.floor(minutes / 60);
        const mins = minutes % 60;

        if (hours > 0) {
            return `${hours}h ${mins}min`;
        }
        return `${minutes} minutos`;
    };

    const getIconSize = () => {
        switch (size) {
            case 'small': return '16px';
            case 'large': return '24px';
            default: return '20px';
        }
    };

    const getTextVariant = () => {
        switch (size) {
            case 'small': return 'caption';
            case 'large': return 'body1';
            default: return 'body2';
        }
    };

    const textColor = color === 'inherit' ? 'text.secondary' : color;

    return (
        <Box
            sx={{
                display: 'flex',
                alignItems: 'center',
                gap: 0.5,
                color: textColor
            }}
        >
            {showIcon && (
                <TimeIcon
                    sx={{
                        fontSize: getIconSize(),
                        color: textColor
                    }}
                />
            )}
            <Typography
                variant={getTextVariant()}
                sx={{
                    fontWeight: variant === 'detailed' ? 500 : 400,
                    color: textColor
                }}
            >
                {formatDuration(duration)}
            </Typography>
        </Box>
    );
}
