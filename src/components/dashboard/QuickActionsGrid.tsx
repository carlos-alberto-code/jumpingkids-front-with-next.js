import { Card, CardContent, Grid, Typography } from '@mui/material';
import QuickActionCard, { QuickActionCardProps } from './QuickActionCard';

export interface QuickAction extends Omit<QuickActionCardProps, 'onNavigate'> {
    id: string;
}

export interface QuickActionsGridProps {
    title?: string;
    actions: QuickAction[];
    onNavigate: (route: string) => void;
    gridProps?: any;
}

export default function QuickActionsGrid({
    title = '⚡ Accesos Rápidos',
    actions,
    onNavigate,
    gridProps,
}: QuickActionsGridProps) {
    return (
        <Card>
            <CardContent>
                <Typography variant="h6" fontWeight="bold" gutterBottom>
                    {title}
                </Typography>

                <Grid container spacing={2} {...gridProps}>
                    {actions.map((action) => (
                        <Grid size={{ xs: 12, sm: 6 }} key={action.id}>
                            <QuickActionCard
                                {...action}
                                onNavigate={onNavigate}
                            />
                        </Grid>
                    ))}
                </Grid>
            </CardContent>
        </Card>
    );
}
