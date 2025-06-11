import { Alert, Snackbar } from '@mui/material';
import { NotificationState } from '../../hooks/common/useNotification';

interface NotificationProps {
    notification: NotificationState;
    onClose: () => void;
    autoHideDuration?: number;
}

export const Notification: React.FC<NotificationProps> = ({
    notification,
    onClose,
    autoHideDuration = 6000
}) => {
    return (
        <Snackbar
            open={notification.open}
            autoHideDuration={autoHideDuration}
            onClose={onClose}
            anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
        >
            <Alert
                onClose={onClose}
                severity={notification.type}
                variant="filled"
                sx={{ width: '100%' }}
            >
                {notification.message}
            </Alert>
        </Snackbar>
    );
};
