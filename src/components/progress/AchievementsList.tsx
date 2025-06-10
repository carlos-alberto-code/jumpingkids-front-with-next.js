import { Alert, Box, Stack, Typography } from '@mui/material';

export interface Achievement {
    label: string;
    value: string | number;
    color: 'primary' | 'secondary' | 'success' | 'warning' | 'info' | 'error';
}

export interface AchievementsListProps {
    achievements: Achievement[];
    isPremiumUser?: boolean;
}

export default function AchievementsList({ achievements, isPremiumUser = false }: AchievementsListProps) {
    return (
        <>
            <Typography variant="h6" gutterBottom>
                🏆 Mis Logros
            </Typography>
            <Stack spacing={2}>
                {achievements.map((achievement, index) => (
                    <Box key={index}>
                        <Typography variant="body2" color="text.secondary">
                            {achievement.label}
                        </Typography>
                        <Typography 
                            variant="h5" 
                            fontWeight="bold" 
                            color={`${achievement.color}.main`}
                        >
                            {achievement.value}
                        </Typography>
                    </Box>
                ))}

                {isPremiumUser && (
                    <Alert severity="success" sx={{ mt: 2 }}>
                        ✨ Estadísticas detalladas disponibles
                    </Alert>
                )}
            </Stack>
        </>
    );
}
