import { Alert, Card, CardContent, List, ListItem, ListItemText, Typography } from '@mui/material';
import StatusChip from '../common/StatusChip';

export interface RecentAssignment {
    kid: string;
    routine: string;
    date: string;
    status: 'completed' | 'pending' | 'missed';
}

export interface RecentActivityListProps {
    assignments: RecentAssignment[];
    title?: string;
    maxItems?: number;
    isPremiumUser?: boolean;
    showUpgradePrompt?: boolean;
}

export default function RecentActivityList({
    assignments,
    title = '📅 Actividad Reciente',
    maxItems = 5,
    isPremiumUser = false,
    showUpgradePrompt = true,
}: RecentActivityListProps) {
    const displayedAssignments = assignments.slice(0, maxItems);

    return (
        <Card>
            <CardContent>
                <Typography variant="h6" fontWeight="bold" gutterBottom>
                    {title}
                </Typography>

                <List dense>
                    {displayedAssignments.map((assignment, index) => (
                        <ListItem key={index} sx={{ px: 0 }}>
                            <ListItemText
                                primary={`${assignment.kid}: ${assignment.routine}`}
                                secondary={new Date(assignment.date).toLocaleDateString()}
                                primaryTypographyProps={{ fontSize: '0.85rem' }}
                                secondaryTypographyProps={{ fontSize: '0.75rem' }}
                            />

                            <StatusChip
                                status={assignment.status}
                                size="small"
                            />
                        </ListItem>
                    ))}
                </List>

                {!isPremiumUser && showUpgradePrompt && (
                    <Alert severity="info" sx={{ mt: 2 }}>
                        Con Premium verías historial completo
                    </Alert>
                )}
            </CardContent>
        </Card>
    );
}
