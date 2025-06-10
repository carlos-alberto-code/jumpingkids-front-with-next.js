import { Avatar, Badge, Box, Typography } from '@mui/material';
import { ReactNode } from 'react';

export interface AvatarWithBadgeProps {
    name: string;
    avatar?: string;
    size?: 'small' | 'medium' | 'large';
    badge?: ReactNode;
    badgeColor?: 'primary' | 'secondary' | 'error' | 'warning' | 'info' | 'success';
    showName?: boolean;
    onClick?: () => void;
    sx?: any;
}

const SIZE_CONFIG = {
    small: { width: 32, height: 32, fontSize: '1rem' },
    medium: { width: 48, height: 48, fontSize: '1.5rem' },
    large: { width: 64, height: 64, fontSize: '2rem' },
};

export default function AvatarWithBadge({
    name,
    avatar,
    size = 'medium',
    badge,
    badgeColor = 'primary',
    showName = false,
    onClick,
    sx,
}: AvatarWithBadgeProps) {
    const sizeConfig = SIZE_CONFIG[size];

    const avatarElement = (
        <Avatar
            sx={{
                ...sizeConfig,
                cursor: onClick ? 'pointer' : 'default',
                '&:hover': onClick ? { opacity: 0.8 } : {},
                backgroundColor: avatar ? 'transparent' : 'primary.main',
            }}
            onClick={onClick}
        >
            {avatar ? (
                <Typography variant="h6" sx={{ fontSize: sizeConfig.fontSize }}>
                    {avatar}
                </Typography>
            ) : (
                name.charAt(0).toUpperCase()
            )}
        </Avatar>
    );

    const content = badge ? (
        <Badge
            badgeContent={badge}
            color={badgeColor}
            overlap="circular"
            anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
        >
            {avatarElement}
        </Badge>
    ) : (
        avatarElement
    );

    if (showName) {
        return (
            <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 1, ...sx }}>
                {content}
                <Typography variant="caption" textAlign="center">
                    {name}
                </Typography>
            </Box>
        );
    }

    return <Box sx={sx}>{content}</Box>;
}
