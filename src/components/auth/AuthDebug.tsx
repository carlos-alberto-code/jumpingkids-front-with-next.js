import { Box, Chip, Paper, Typography } from '@mui/material';
import React from 'react';
import { useAuthContext } from '../../context/auth/AuthContext';

/**
 * Componente de debug para verificar estado de autenticación
 * ⚠️ Solo para desarrollo - remover en producción
 */
const AuthDebug: React.FC = () => {
    const { session, loading, error, isAuthenticated } = useAuthContext();

    // Solo mostrar en desarrollo
    if (process.env.NODE_ENV === 'production') {
        return null;
    }

    return (
        <Paper
            sx={{
                position: 'fixed',
                bottom: 16,
                right: 16,
                p: 2,
                bgcolor: 'rgba(0, 0, 0, 0.8)',
                color: 'white',
                borderRadius: 2,
                zIndex: 9999,
                maxWidth: 300,
                fontSize: '0.75rem'
            }}
        >
            <Typography variant="caption" sx={{ fontWeight: 'bold', color: 'primary.main' }}>
                🔍 AUTH DEBUG
            </Typography>
            
            <Box sx={{ mt: 1 }}>
                <Typography variant="caption">
                    Loading: <Chip 
                        label={loading ? 'YES' : 'NO'} 
                        size="small" 
                        color={loading ? 'warning' : 'success'}
                        sx={{ height: 16, fontSize: '0.6rem' }}
                    />
                </Typography>
            </Box>

            <Box sx={{ mt: 0.5 }}>
                <Typography variant="caption">
                    Authenticated: <Chip 
                        label={isAuthenticated ? 'YES' : 'NO'} 
                        size="small" 
                        color={isAuthenticated ? 'success' : 'error'}
                        sx={{ height: 16, fontSize: '0.6rem' }}
                    />
                </Typography>
            </Box>

            {session?.user && (
                <>
                    <Box sx={{ mt: 0.5 }}>
                        <Typography variant="caption">
                            User: <strong>{session.user.name}</strong>
                        </Typography>
                    </Box>
                    <Box sx={{ mt: 0.5 }}>
                        <Typography variant="caption">
                            Type: <Chip 
                                label={session.user.userType.toUpperCase()} 
                                size="small" 
                                color="primary"
                                sx={{ height: 16, fontSize: '0.6rem' }}
                            />
                        </Typography>
                    </Box>
                    <Box sx={{ mt: 0.5 }}>
                        <Typography variant="caption">
                            Plan: <Chip 
                                label={session.user.subscription.toUpperCase()} 
                                size="small" 
                                color={session.user.subscription === 'premium' ? 'secondary' : 'default'}
                                sx={{ height: 16, fontSize: '0.6rem' }}
                            />
                        </Typography>
                    </Box>
                </>
            )}

            {error && (
                <Box sx={{ mt: 0.5 }}>
                    <Typography variant="caption" color="error.main">
                        Error: {error}
                    </Typography>
                </Box>
            )}

            <Box sx={{ mt: 1, pt: 1, borderTop: '1px solid rgba(255,255,255,0.1)' }}>
                <Typography variant="caption" sx={{ fontSize: '0.65rem', opacity: 0.7 }}>
                    localStorage: {typeof window !== 'undefined' && localStorage.getItem('jumpingkids-session') ? 'EXISTS' : 'EMPTY'}
                </Typography>
            </Box>
        </Paper>
    );
};

export default AuthDebug;