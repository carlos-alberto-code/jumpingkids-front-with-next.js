import { Download as DownloadIcon } from '@mui/icons-material';
import { Box, Button, Chip, Stack, Typography } from '@mui/material';
import React from 'react';

interface PageHeaderProps {
    icon: React.ReactNode;
    title: string;
    subtitle: string;
    showPremiumBadge?: boolean;
    showExportButton?: boolean;
    onExport?: () => void;
    actions?: React.ReactNode;
}

export function PageHeader({
    icon,
    title,
    subtitle,
    showPremiumBadge = false,
    showExportButton = false,
    onExport,
    actions
}: PageHeaderProps) {
    return (
        <Box sx={{
            display: 'flex',
            alignItems: 'center',
            gap: 2,
            mb: 4
        }}>
            <Box sx={{ fontSize: 40, color: 'secondary.main' }}>
                {icon}
            </Box>
            <Box>
                <Typography variant="h4" component="h1" fontWeight="bold">
                    {title}
                </Typography>
                <Typography variant="subtitle1" color="text.secondary">
                    {subtitle}
                </Typography>
            </Box>
            <Stack direction="row" spacing={1} sx={{ ml: 'auto' }}>
                {showPremiumBadge && (
                    <Chip
                        label="PREMIUM"
                        color="secondary"
                        size="small"
                    />
                )}
                {showExportButton && onExport && (
                    <Button
                        variant="outlined"
                        startIcon={<DownloadIcon />}
                        onClick={onExport}
                        size="small"
                    >
                        Exportar
                    </Button>
                )}
                {actions}
            </Stack>
        </Box>
    );
}
