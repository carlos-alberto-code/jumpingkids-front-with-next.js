import { Alert, Box, Chip, Stack, Typography } from '@mui/material';

interface InsightsPanelProps {
    favoriteExercises: string[];
    strugglingAreas: string[];
    title?: string;
}

export function InsightsPanel({
    favoriteExercises,
    strugglingAreas,
    title = "🎯 Insights"
}: InsightsPanelProps) {
    return (
        <div>
            <Typography variant="subtitle1" fontWeight="bold" gutterBottom>
                {title}
            </Typography>

            <Box sx={{ mb: 2 }}>
                <Typography variant="body2" color="text.secondary" gutterBottom>
                    Ejercicios favoritos:
                </Typography>
                <Stack direction="row" spacing={0.5} sx={{ flexWrap: 'wrap', gap: 0.5 }}>
                    {favoriteExercises.map((exercise, index) => (
                        <Chip
                            key={index}
                            label={exercise}
                            size="small"
                            color="success"
                            variant="outlined"
                        />
                    ))}
                </Stack>
            </Box>

            {strugglingAreas.length > 0 ? (
                <Box>
                    <Typography variant="body2" color="text.secondary" gutterBottom>
                        Áreas de mejora:
                    </Typography>
                    <Stack direction="row" spacing={0.5} sx={{ flexWrap: 'wrap', gap: 0.5 }}>
                        {strugglingAreas.map((area, index) => (
                            <Chip
                                key={index}
                                label={area}
                                size="small"
                                color="warning"
                                variant="outlined"
                            />
                        ))}
                    </Stack>
                </Box>
            ) : (
                <Alert severity="success" sx={{ p: 1 }}>
                    🎉 ¡Excelente en todas las áreas!
                </Alert>
            )}
        </div>
    );
}
