import { TrendingUp as DifficultyIcon } from '@mui/icons-material';
import { Chip, useTheme } from '@mui/material';

export interface DifficultyChipProps {
    difficulty: 'Principiante' | 'Intermedio' | 'Avanzado';
    size?: 'small' | 'medium';
    variant?: 'filled' | 'outlined';
    showIcon?: boolean;
}

export default function DifficultyChip({
    difficulty,
    size = 'small',
    variant = 'filled',
    showIcon = true
}: DifficultyChipProps) {
    const theme = useTheme();

    const getDifficultyColor = () => {
        switch (difficulty) {
            case 'Principiante':
                return {
                    bg: theme.palette.success.main,
                    text: theme.palette.success.contrastText
                };
            case 'Intermedio':
                return {
                    bg: theme.palette.warning.main,
                    text: theme.palette.warning.contrastText
                };
            case 'Avanzado':
                return {
                    bg: theme.palette.error.main,
                    text: theme.palette.error.contrastText
                };
            default:
                return {
                    bg: theme.palette.grey[500],
                    text: theme.palette.common.white
                };
        }
    };

    const colors = getDifficultyColor();

    return (
        <Chip
            icon={showIcon ? <DifficultyIcon /> : undefined}
            label={difficulty}
            size={size}
            variant={variant}
            sx={{
                backgroundColor: variant === 'filled' ? colors.bg : 'transparent',
                color: variant === 'filled' ? colors.text : colors.bg,
                borderColor: variant === 'outlined' ? colors.bg : 'transparent',
                '& .MuiChip-icon': {
                    color: variant === 'filled' ? colors.text : colors.bg
                }
            }}
        />
    );
}
