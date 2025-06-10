import { NotificationsActive, Speed, Warning } from '@mui/icons-material';
import { Card, CardContent, List, ListItem, ListItemIcon, ListItemText, Typography } from '@mui/material';
import StatusChip from '../common/StatusChip';

export interface PendingTask {
    id: number;
    text: string;
    priority: 'high' | 'medium' | 'low';
    type: string;
}

export interface PendingTasksListProps {
    tasks: PendingTask[];
    title?: string;
    onTaskClick?: (taskId: number) => void;
}

const PRIORITY_ICONS = {
    high: Warning,
    medium: Speed,
    low: NotificationsActive,
};

export default function PendingTasksList({
    tasks,
    title = '📋 Tareas Pendientes',
    onTaskClick
}: PendingTasksListProps) {
    if (tasks.length === 0) {
        return (
            <Card>
                <CardContent>
                    <Typography variant="h6" fontWeight="bold" gutterBottom>
                        {title}
                    </Typography>
                    <Typography
                        variant="body2"
                        color="text.secondary"
                        sx={{ textAlign: 'center', py: 2 }}
                    >
                        🎉 ¡No tienes tareas pendientes!
                    </Typography>
                </CardContent>
            </Card>
        );
    }

    return (
        <Card>
            <CardContent>
                <Typography variant="h6" fontWeight="bold" gutterBottom>
                    {title}
                </Typography>

                <List dense>
                    {tasks.map((task) => {
                        const IconComponent = PRIORITY_ICONS[task.priority];

                        return (
                            <ListItem
                                key={task.id}
                                sx={{
                                    px: 0,
                                    cursor: onTaskClick ? 'pointer' : 'default',
                                    '&:hover': onTaskClick ? { backgroundColor: 'action.hover' } : {},
                                    borderRadius: 1,
                                }}
                                onClick={() => onTaskClick?.(task.id)}
                            >
                                <ListItemIcon>
                                    <IconComponent
                                        color={
                                            task.priority === 'high' ? 'error' :
                                                task.priority === 'medium' ? 'warning' : 'info'
                                        }
                                    />
                                </ListItemIcon>

                                <ListItemText
                                    primary={task.text}
                                    secondary={
                                        <StatusChip
                                            status={task.priority}
                                            size="small"
                                            showIcon={false}
                                            sx={{ mt: 0.5 }}
                                        />
                                    }
                                    primaryTypographyProps={{ fontSize: '0.9rem' }}
                                />
                            </ListItem>
                        );
                    })}
                </List>
            </CardContent>
        </Card>
    );
}
