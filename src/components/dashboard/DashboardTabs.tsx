import { PersonAdd } from '@mui/icons-material';
import { Alert, Box, Button, Card, CardContent, Grid, IconButton, Paper, Typography, useTheme } from '@mui/material';
import { useRouter } from 'next/router';
import KidSummaryCard, { KidData } from './KidSummaryCard';

export interface KidsGridSectionProps {
    kidsData: KidData[];
    totalKids: number;
    isPremiumUser: boolean;
    onKidClick?: (kidId: string) => void;
    onAddKidClick?: () => void;
}

export default function DashboardTabs({
    kidsData,
    totalKids,
    isPremiumUser,
    onKidClick,
    onAddKidClick,
}: KidsGridSectionProps) {
    const router = useRouter();
    const theme = useTheme();

    const canAddMoreKids = (!isPremiumUser && totalKids < 1) || (isPremiumUser && totalKids < 3);

    return (
        <Card>
            <CardContent>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
                    <Typography variant="h6" fontWeight="bold">
                        👨‍👩‍👧‍👦 Resumen de Hijos
                    </Typography>
                    <Button
                        variant="outlined"
                        size="small"
                        onClick={() => router.push('/my_kids')}
                    >
                        Ver todos
                    </Button>
                </Box>

                <Grid container spacing={2}>
                    {kidsData.map((kid) => (
                        <Grid size={{ xs: 12, sm: isPremiumUser ? 4 : 12 }} key={kid.id}>
                            <KidSummaryCard
                                kid={kid}
                                onClick={onKidClick}
                            />
                        </Grid>
                    ))}

                    {/* Botón agregar hijo (solo si no está al límite) */}
                    {canAddMoreKids && (
                        <Grid size={{ xs: 12, sm: isPremiumUser ? 4 : 12 }}>
                            <Paper sx={{
                                p: 2,
                                textAlign: 'center',
                                border: `2px dashed ${theme.palette.grey[300]}`,
                                cursor: 'pointer',
                                '&:hover': { backgroundColor: theme.palette.action.hover }
                            }}
                                onClick={onAddKidClick}
                            >
                                <IconButton color="primary" size="large">
                                    <PersonAdd />
                                </IconButton>
                                <Typography variant="h6" color="primary.main">
                                    Agregar Hijo
                                </Typography>
                                <Typography variant="caption" color="text.secondary">
                                    Hasta {isPremiumUser ? '3 hijos' : '1 hijo'}
                                </Typography>
                            </Paper>
                        </Grid>
                    )}
                </Grid>

                {!isPremiumUser && (
                    <Alert severity="info" sx={{ mt: 2 }}>
                        Con Premium podrías gestionar hasta 3 hijos y ver comparativas detalladas
                    </Alert>
                )}
            </CardContent>
        </Card>
    );
}
