import { Chip, ChipProps } from '@mui/material';
import { ReactNode } from 'react';

export interface StatusChipProps extends Omit<ChipProps, 'label' | 'color'> {
    status: 'completed' | 'pending' | 'missed' | 'high' | 'medium' | 'low';
    label?: ReactNode;
    showIcon?: boolean;
}

const STATUS_CONFIG = {
    completed: {
        label: 'Completado',
        icon: '✅',
        color: 'success' as const,
    },
    pending: {
        label: 'Pendiente',
        icon: '⏳',
        color: 'warning' as const,
    },
    missed: {
        label: 'Perdido',
        icon: '❌',
        color: 'error' as const,
    },
    high: {
        label: 'Alta',
        icon: '🔴',
        color: 'error' as const,
    },
    medium: {
        label: 'Media',
        icon: '🟡',
        color: 'warning' as const,
    },
    low: {
        label: 'Baja',
        icon: '🟢',
        color: 'info' as const,
    },
};

export default function StatusChip({
    status,
    label,
    showIcon = true,
    size = 'small',
    ...chipProps
}: StatusChipProps) {
    const config = STATUS_CONFIG[status];
    const displayLabel = label || config.label;
    const chipLabel = showIcon ? `${config.icon} ${displayLabel}` : displayLabel;

    return (
        <Chip
            label={chipLabel}
            color={config.color}
            size={size}
            {...chipProps}
        />
    );
}
