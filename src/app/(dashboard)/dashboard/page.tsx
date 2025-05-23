// src/app/(dashboard)/dashboard/page.tsx
import { PageContainer } from '@toolpad/core/PageContainer';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import Button from '@mui/material/Button';

export default function DashboardPage() {
  return (
    <PageContainer>
      <Typography variant="h4" component="h1" gutterBottom>
        ¡Bienvenido al Dashboard!
      </Typography>
      
      <Typography variant="body1" color="text.secondary" paragraph>
        Esta es tu aplicación con Next.js, Material UI y Toolpad Core funcionando juntos.
      </Typography>

      <Grid container spacing={3} sx={{ mt: 2 }}>
        <Grid size={{ xs: 12, md: 6, lg: 4 }}>
          <Card>
            <CardContent>
              <Typography variant="h6" component="h2">
                Usuarios Activos
              </Typography>
              <Typography variant="h3" color="primary">
                1,234
              </Typography>
              <Typography variant="body2" color="text.secondary">
                +12% desde el mes pasado
              </Typography>
            </CardContent>
          </Card>
        </Grid>

        <Grid size={{ xs: 12, md: 6, lg: 4 }}>
          <Card>
            <CardContent>
              <Typography variant="h6" component="h2">
                Ventas Totales
              </Typography>
              <Typography variant="h3" color="primary">
                $45,678
              </Typography>
              <Typography variant="body2" color="text.secondary">
                +8% desde el mes pasado
              </Typography>
            </CardContent>
          </Card>
        </Grid>

        <Grid size={{ xs: 12, md: 6, lg: 4 }}>
          <Card>
            <CardContent>
              <Typography variant="h6" component="h2">
                Nuevos Clientes
              </Typography>
              <Typography variant="h3" color="primary">
                89
              </Typography>
              <Typography variant="body2" color="text.secondary">
                +15% desde el mes pasado
              </Typography>
            </CardContent>
          </Card>
        </Grid>

        <Grid size={12}>
          <Paper sx={{ p: 3 }}>
            <Typography variant="h6" gutterBottom>
              Acciones Rápidas
            </Typography>
            <Typography variant="body2" color="text.secondary" paragraph>
              Aquí puedes agregar botones y acciones principales de tu aplicación.
            </Typography>
            <Button variant="contained" sx={{ mr: 2 }}>
              Crear Nuevo
            </Button>
            <Button variant="outlined">
              Ver Reportes
            </Button>
          </Paper>
        </Grid>
      </Grid>
    </PageContainer>
  );
}