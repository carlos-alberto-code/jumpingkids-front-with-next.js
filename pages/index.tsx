import { usePermissionCheck } from '../src/hooks/auth/useUserPermissions';
import { Box, Container, Typography, Card, CardContent, Chip, Grid } from '@mui/material';
import { Dashboard as DashboardIcon, SupervisorAccount as KidsIcon } from '@mui/icons-material';


export default function DashboardPage() {

  const { user, isPremiumUser, canManageMultipleKids } = usePermissionCheck();

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <Box sx={{
        display: 'flex',
        alignItems: 'center',
        gap: 2,
        mb: 4
      }}>
        <DashboardIcon sx={{ fontSize: 40, color: 'primary.main' }} />
        <Box>
          <Typography variant="h4" component="h1" fontWeight="bold">
            Dashboard Principal
          </Typography>
          <Typography variant="subtitle1" color="text.secondary">
            Vista general del progreso de tus hijos
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

      <Card sx={{ mb: 3 }}>
        <CardContent>
          <Typography variant="h6" gutterBottom>
            👋 ¡Hola {user?.name}!
          </Typography>
          <Typography variant="body1" paragraph>
            Desde aquí puedes supervisar el progreso de tu{canManageMultipleKids ? 's hijo' : ' hijo'} y gestionar sus rutinas de ejercicio.
          </Typography>

          <Box sx={{
            p: 3,
            bgcolor: 'background.default',
            borderRadius: 2
          }}>
            <Grid container spacing={3}>
              <Grid size={{ xs: 12, sm: 6, md: 4 }}>
                <Box sx={{ textAlign: 'center' }}>
                  <KidsIcon sx={{ fontSize: 48, color: 'primary.main', mb: 1 }} />
                  <Typography variant="h6" color="text.secondary">
                    Gestión de Hijos
                  </Typography>
                  <Typography variant="body2" sx={{ mt: 1 }}>
                    {canManageMultipleKids ? 'Hasta 3 hijos' : '1 hijo'} - Funcionalidad disponible en la siguiente fase
                  </Typography>
                </Box>
              </Grid>

              <Grid size={{ xs: 12, sm: 6, md: 4 }}>
                <Box sx={{ textAlign: 'center' }}>
                  <DashboardIcon sx={{ fontSize: 48, color: 'secondary.main', mb: 1 }} />
                  <Typography variant="h6" color="text.secondary">
                    Progreso Semanal
                  </Typography>
                  <Typography variant="body2" sx={{ mt: 1 }}>
                    Resumen consolidado disponible en la siguiente fase
                  </Typography>
                </Box>
              </Grid>
            </Grid>

            {isPremiumUser && (
              <Box sx={{ mt: 3, textAlign: 'center' }}>
                <Typography variant="caption" color="secondary.main">
                  ✨ Dashboard avanzado con analytics, múltiples hijos y reportes disponibles
                </Typography>
              </Box>
            )}
          </Box>
        </CardContent>
      </Card>

      <Card>
        <CardContent>
          <Typography variant="h6" gutterBottom>
            📋 Funcionalidades planificadas:
          </Typography>
          <Box component="ul" sx={{ pl: 2 }}>
            <Typography component="li" variant="body2">
              Resumen de todos los hijos
            </Typography>
            <Typography component="li" variant="body2">
              Progreso semanal consolidado
            </Typography>
            <Typography component="li" variant="body2">
              Accesos rápidos a funciones principales
            </Typography>
            <Typography component="li" variant="body2">
              Alertas y notificaciones importantes
            </Typography>
            {isPremiumUser && (
              <>
                <Typography component="li" variant="body2" color="secondary.main">
                  Analytics avanzados por hijo
                </Typography>
                <Typography component="li" variant="body2" color="secondary.main">
                  Comparativas entre múltiples hijos
                </Typography>
              </>
            )}
          </Box>
        </CardContent>
      </Card>
    </Container>
  );
}