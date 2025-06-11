import { useState } from 'react';

export interface NotificationState {
    message: string;
    type: 'success' | 'error' | 'info' | 'warning';
    open: boolean;
}

export interface UseNotificationReturn {
    notification: NotificationState;
    showSuccess: (message: string) => void;
    showError: (message: string) => void;
    showInfo: (message: string) => void;
    showWarning: (message: string) => void;
    hideNotification: () => void;
}

/**
 * Hook para manejar notificaciones de usuario
 * Reemplaza los alert() simples con un sistema más elegante
 */
export const useNotification = (): UseNotificationReturn => {
    const [notification, setNotification] = useState<NotificationState>({
        message: '',
        type: 'info',
        open: false
    });

    const showNotification = (message: string, type: NotificationState['type']) => {
        setNotification({
            message,
            type,
            open: true
        });
    };

    const showSuccess = (message: string) => showNotification(message, 'success');
    const showError = (message: string) => showNotification(message, 'error');
    const showInfo = (message: string) => showNotification(message, 'info');
    const showWarning = (message: string) => showNotification(message, 'warning');

    const hideNotification = () => {
        setNotification(prev => ({ ...prev, open: false }));
    };

    return {
        notification,
        showSuccess,
        showError,
        showInfo,
        showWarning,
        hideNotification
    };
};
