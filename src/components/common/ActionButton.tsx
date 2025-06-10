import { Box, Button, ButtonProps, Chip, Paper, Typography, useTheme } from '@mui/material';
import { ReactNode } from 'react';

export interface ActionButtonProps extends Omit<ButtonProps, 'children'> {
    title: string;
    description?: string;
    icon?: ReactNode;
    badge?: string;
    badgeColor?: 'primary' | 'secondary' | 'error' | 'warning' | 'info' | 'success';
    enabled?: boolean;
    layout?: 'horizontal' | 'vertical';
    paperProps?: any;
}

export default function ActionButton({
    title,
    description,
    icon,
    badge,
    badgeColor = 'secondary',
    enabled = true,
    layout = 'horizontal',
    color = 'primary',
    onClick,
    paperProps,
    sx,
    ...buttonProps
}: ActionButtonProps) {
    const theme = useTheme();

    const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
        if (enabled && onClick) {
            onClick(event);
        }
    };

    const content = (
        <Box
            sx={{
                display: 'flex',
                flexDirection: layout === 'vertical' ? 'column' : 'row',
                alignItems: layout === 'vertical' ? 'center' : 'flex-start',
                gap: layout === 'vertical' ? 1 : 2,
                textAlign: layout === 'vertical' ? 'center' : 'left',
            }}
        >
            {icon && (
                <Box
                    sx={{
                        color: enabled ? `${color}.main` : 'grey.400',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                    }}
                >
                    {icon}
                </Box>
            )}

            <Box sx={{ flex: 1 }}>
                <Typography
                    variant="body1"
                    fontWeight="bold"
                    sx={{
                        color: enabled ? 'text.primary' : 'text.disabled',
                        display: 'flex',
                        alignItems: 'center',
                        gap: 1,
                        flexWrap: 'wrap',
                    }}
                >
                    {title}
                    {badge && (
                        <Chip
                            label={badge}
                            size="small"
                            color={badgeColor}
                            sx={{ fontSize: '0.7rem', height: 20 }}
                        />
                    )}
                </Typography>

                {description && (
                    <Typography
                        variant="caption"
                        color="text.secondary"
                        sx={{ display: 'block', mt: 0.5 }}
                    >
                        {description}
                    </Typography>
                )}
            </Box>
        </Box>
    );

    if (paperProps) {
        return (
            <Paper
                {...paperProps}
                sx={{
                    p: 2,
                    cursor: enabled ? 'pointer' : 'not-allowed',
                    opacity: enabled ? 1 : 0.6,
                    border: `1px solid ${theme.palette.divider}`,
                    '&:hover': enabled
                        ? {
                            backgroundColor: theme.palette.action.hover,
                            borderColor: color === 'inherit' ? theme.palette.text.primary : theme.palette[color]?.main,
                        }
                        : {},
                    transition: 'all 0.2s',
                    ...paperProps.sx,
                }}
                onClick={handleClick}
            >
                {content}
            </Paper>
        );
    }

    return (
        <Button
            {...buttonProps}
            onClick={handleClick}
            disabled={!enabled}
            sx={{
                p: 2,
                justifyContent: 'flex-start',
                textTransform: 'none',
                borderRadius: 2,
                ...sx,
            }}
        >
            {content}
        </Button>
    );
}
