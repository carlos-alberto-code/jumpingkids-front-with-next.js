import { Box, Typography, Button } from '@mui/material';
import { ReactNode } from 'react';

export interface EmptyStateProps {
    icon?: ReactNode;
    title: string;
    description: string;
    actionLabel?: string;
    onActionClick?: () => void;
    variant?: 'default' | 'compact';
}

export default function EmptyState({
    icon,
    title,
    description,
    actionLabel,
    onActionClick,
    variant = 'default'
}: EmptyStateProps) {
    const isCompact = variant === 'compact';

    return (
        <Box
            sx={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                textAlign: 'center',
                py: isCompact ? 3 : 6,
                px: 2,
                color: 'text.secondary'
            }}
        >
            {icon && (
                <Box sx={{ 
                    fontSize: isCompact ? 40 : 64, 
                    mb: isCompact ? 1 : 2,
                    opacity: 0.6 
                }}>
                    {icon}
                </Box>
            )}
            
            <Typography 
                variant={isCompact ? "h6" : "h5"} 
                fontWeight="bold" 
                sx={{ mb: 1 }}
            >
                {title}
            </Typography>
            
            <Typography 
                variant="body2" 
                sx={{ 
                    mb: actionLabel ? (isCompact ? 2 : 3) : 0,
                    maxWidth: 400 
                }}
            >
                {description}
            </Typography>
            
            {actionLabel && onActionClick && (
                <Button 
                    variant="contained" 
                    onClick={onActionClick}
                    size={isCompact ? "small" : "medium"}
                >
                    {actionLabel}
                </Button>
            )}
        </Box>
    );
}
