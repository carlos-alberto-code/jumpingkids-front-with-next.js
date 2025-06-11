import { SupervisorAccount as KidsIcon } from '@mui/icons-material';
import {
    Box,
    Chip,
    Typography
} from '@mui/material';
import React from 'react';

interface KidsPageHeaderProps {
    kidsCount: number;
    maxKids: number;
    isPremiumUser: boolean;
}

export const KidsPageHeader: React.FC<KidsPageHeaderProps> = ({
    kidsCount,
    maxKids,
    isPremiumUser,
}) => {
    return (
        <Box sx={{
            display: 'flex',
            alignItems: 'center',
            gap: 2,
            mb: 4
        }}>
            <KidsIcon sx={{ fontSize: 40, color: 'primary.main' }} />
            <Box>
                <Typography variant="h4" component="h1" fontWeight="bold">
                    Mis Hijos
                </Typography>
                <Typography variant="subtitle1" color="text.secondary">
                    Gestiona los perfiles de tu{kidsCount > 1 ? 's' : ''} hijo{kidsCount > 1 ? 's' : ''} ({kidsCount}/{maxKids})
                </Typography>
            </Box>
            {isPremiumUser && (
                <Chip
                    label="PREMIUM"
                    color="secondary"
                    size="small"
                    sx={{ ml: 'auto' }}
                />
            )}
        </Box>
    );
};
