import { Box, Chip, Paper, Stack, Typography } from '@mui/material';
import AvatarWithBadge from '../common/AvatarWithBadge';
import ProgressBar from '../common/ProgressBar';

export interface KidData {
    id: string;
    name: string;
    age: number;
    avatar: string;
    thisWeek: {
        completed: number;
        total: number;
        streak: number;
    };
    lastActivity: string;
    favoriteExercise: string;
}

export interface KidSummaryCardProps {
    kid: KidData;
    onClick?: (kidId: string) => void;
}

export default function KidSummaryCard({ kid, onClick }: KidSummaryCardProps) {
    const completionPercentage = kid.thisWeek.total > 0
        ? (kid.thisWeek.completed / kid.thisWeek.total) * 100
        : 0;

    const handleClick = () => {
        if (onClick) {
            onClick(kid.id);
        }
    };

    return (
        <Paper
            sx={{
                p: 2,
                textAlign: 'center',
                cursor: onClick ? 'pointer' : 'default',
                '&:hover': onClick ? { backgroundColor: 'action.hover' } : {},
                transition: 'background-color 0.2s',
            }}
            onClick={handleClick}
        >
            <AvatarWithBadge
                name={kid.name}
                avatar={kid.avatar}
                size="large"
                showName={false}
                sx={{ mb: 1, mx: 'auto' }}
            />

            <Typography variant="h6" fontWeight="bold">
                {kid.name}
            </Typography>

            <Typography variant="caption" color="text.secondary" display="block" sx={{ mb: 2 }}>
                {kid.age} años
            </Typography>

            <Box sx={{ mb: 2 }}>
                <ProgressBar
                    value={kid.thisWeek.completed}
                    total={kid.thisWeek.total}
                    label="Esta semana"
                    showFraction
                    color="success"
                    height={4}
                />
            </Box>

            <Stack direction="row" spacing={1} sx={{ justifyContent: 'center' }}>
                <Chip
                    label={`${kid.thisWeek.streak} días`}
                    size="small"
                    color="warning"
                    variant="outlined"
                />
            </Stack>
        </Paper>
    );
}
