import { getMockUsersInfo } from '@/services/auth/MockAuthService';
import { AccountCircle, Info, Login } from '@mui/icons-material';
import {
    Alert,
    Box,
    Button,
    Card,
    CardContent,
    Chip,
    Dialog,
    DialogContent,
    DialogTitle,
    Divider,
    Grid,
    IconButton,
    List,
    ListItem,
    ListItemButton,
    ListItemIcon,
    ListItemText,
    Paper,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Typography
} from '@mui/material';
import React, { useState } from 'react';
// import { getMockUsersInfo } from '../services/auth/MockAuthService';

/**
 * 🎭 COMPONENTE: Indicador de Modo de Desarrollo
 * Muestra información de que la app está en modo mock
 */
export const DevModeIndicator: React.FC = () => {
    const [showDialog, setShowDialog] = useState(false);
    const mockInfo = getMockUsersInfo();

    // Solo mostrar si estamos en modo mock
    if (process.env.NEXT_PUBLIC_USE_MOCK !== 'true') {
        return null;
    }

    return (
        <>
            <Alert
                severity="info"
                action={
                    <IconButton
                        color="inherit"
                        size="small"
                        onClick={() => setShowDialog(true)}
                    >
                        <Info />
                    </IconButton>
                }
                sx={{ mb: 2 }}
            >
                <strong>Modo de Desarrollo Activado</strong> - Usando datos mock para testing
            </Alert>

            <Dialog
                open={showDialog}
                onClose={() => setShowDialog(false)}
                maxWidth="md"
                fullWidth
            >
                <DialogTitle>
                    🎭 Modo de Desarrollo - Información de Usuarios Mock
                </DialogTitle>
                <DialogContent>
                    <Box sx={{ mb: 3 }}>
                        <Typography variant="body1" gutterBottom>
                            La aplicación está funcionando con datos mock. Puedes usar cualquiera de estos usuarios para probar las funcionalidades:
                        </Typography>

                        <Grid container spacing={2} sx={{ mb: 3 }}>
                            <Grid size={{ xs: 12, sm: 6, md: 3 }}>
                                <Card>
                                    <CardContent>
                                        <Typography variant="h6" color="primary">
                                            {mockInfo.summary.totalUsers}
                                        </Typography>
                                        <Typography variant="body2" color="text.secondary">
                                            Usuarios Totales
                                        </Typography>
                                    </CardContent>
                                </Card>
                            </Grid>
                            <Grid size={{ xs: 12, sm: 6, md: 3 }}>
                                <Card>
                                    <CardContent>
                                        <Typography variant="h6" color="secondary">
                                            {mockInfo.summary.kids}
                                        </Typography>
                                        <Typography variant="body2" color="text.secondary">
                                            Niños
                                        </Typography>
                                    </CardContent>
                                </Card>
                            </Grid>
                            <Grid size={{ xs: 12, sm: 6, md: 3 }}>
                                <Card>
                                    <CardContent>
                                        <Typography variant="h6" color="success.main">
                                            {mockInfo.summary.tutors}
                                        </Typography>
                                        <Typography variant="body2" color="text.secondary">
                                            Tutores
                                        </Typography>
                                    </CardContent>
                                </Card>
                            </Grid>
                            <Grid size={{ xs: 12, sm: 6, md: 3 }}>
                                <Card>
                                    <CardContent>
                                        <Typography variant="h6" color="warning.main">
                                            {mockInfo.summary.premiumUsers}
                                        </Typography>
                                        <Typography variant="body2" color="text.secondary">
                                            Premium
                                        </Typography>
                                    </CardContent>
                                </Card>
                            </Grid>
                        </Grid>
                    </Box>

                    <Divider sx={{ mb: 3 }} />

                    <Typography variant="h6" gutterBottom>
                        👥 Usuarios Disponibles
                    </Typography>
                    <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
                        Todos los usuarios usan la contraseña: <strong>123456</strong>
                    </Typography>

                    <TableContainer component={Paper}>
                        <Table>
                            <TableHead>
                                <TableRow>
                                    <TableCell>Email</TableCell>
                                    <TableCell>Nombre</TableCell>
                                    <TableCell>Tipo</TableCell>
                                    <TableCell>Suscripción</TableCell>
                                    <TableCell>Acciones</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {mockInfo.credentials.map((cred) => (
                                    <TableRow key={cred.email}>
                                        <TableCell>
                                            <Typography variant="body2" component="code">
                                                {cred.email}
                                            </Typography>
                                        </TableCell>
                                        <TableCell>
                                            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                                                <span>{cred.user.avatar}</span>
                                                {cred.user.name}
                                            </Box>
                                        </TableCell>
                                        <TableCell>
                                            <Chip
                                                label={cred.user.userType}
                                                color={cred.user.userType === 'kid' ? 'secondary' : 'primary'}
                                                size="small"
                                            />
                                        </TableCell>
                                        <TableCell>
                                            <Chip
                                                label={cred.user.subscription}
                                                color={cred.user.subscription === 'premium' ? 'warning' : 'default'}
                                                size="small"
                                            />
                                        </TableCell>
                                        <TableCell>
                                            <Button
                                                size="small"
                                                startIcon={<Login />}
                                                onClick={() => {
                                                    navigator.clipboard.writeText(cred.email);
                                                    // Opcional: mostrar notificación
                                                }}
                                            >
                                                Copiar Email
                                            </Button>
                                        </TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </TableContainer>

                    <Box sx={{ mt: 3 }}>
                        <Typography variant="body2" color="text.secondary">
                            💡 <strong>Tip:</strong> Para cambiar al modo de producción, modifica <code>NEXT_PUBLIC_USE_MOCK=false</code> en el archivo <code>.env</code>
                        </Typography>
                    </Box>
                </DialogContent>
            </Dialog>
        </>
    );
};

/**
 * 🎭 COMPONENTE: Lista Rápida de Usuarios para Login
 * Muestra una lista compacta con botones de login directo
 */
export const QuickLoginPanel: React.FC<{ onLogin: (email: string, password: string) => void }> = ({ onLogin }) => {
    const mockInfo = getMockUsersInfo();

    // Solo mostrar si estamos en modo mock
    if (process.env.NEXT_PUBLIC_USE_MOCK !== 'true') {
        return null;
    }

    return (
        <Card sx={{ mt: 2 }}>
            <CardContent>
                <Typography variant="h6" gutterBottom>
                    🚀 Login Rápido (Modo Desarrollo)
                </Typography>
                <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
                    Haz clic en cualquier usuario para iniciar sesión automáticamente
                </Typography>

                <List dense>
                    {mockInfo.credentials.map((cred) => (
                        <ListItem key={cred.email} disablePadding>
                            <ListItemButton
                                onClick={() => onLogin(cred.email, cred.password)}
                            >
                                <ListItemIcon>
                                    <AccountCircle />
                                </ListItemIcon>
                                <ListItemText
                                    primary={
                                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                                            <span>{cred.user.avatar}</span>
                                            {cred.user.name}
                                            <Chip
                                                label={cred.user.userType}
                                                size="small"
                                                color={cred.user.userType === 'kid' ? 'secondary' : 'primary'}
                                            />
                                            <Chip
                                                label={cred.user.subscription}
                                                size="small"
                                                color={cred.user.subscription === 'premium' ? 'warning' : 'default'}
                                            />
                                        </Box>
                                    }
                                    secondary={cred.email}
                                />
                            </ListItemButton>
                        </ListItem>
                    ))}
                </List>
            </CardContent>
        </Card>
    );
};

export default DevModeIndicator;
