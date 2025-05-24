// src/app/(dashboard)/progress/page.tsx
'use client';

import { 
  Box, 
  Typography, 
  Card, 
  CardContent, 
  LinearProgress,
  Grid,
  Chip
} from '@mui/material';
import TrendingUpIcon from '@mui/icons-material/TrendingUp';

export default function ProgressPage() {
  return (
    <Box sx={{ p: 3 }}>
      <Box sx={{ display: 'flex', alignItems: 'center', mb: 3 }}>
        <TrendingUpIcon sx={{ mr: 2, fontSize: 32 }} color="primary" />
        <Typography variant="h4" component="h1">
          Mi Progreso
        </Typography>
      </Box>

      <Grid container spacing={3}>
        <Grid>
        {/* <Grid item xs={12} md={6}> */}
          <Card>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                Ejercicios Completados Esta Semana
              </Typography>
              <LinearProgress 
                variant="determinate" 
                value={75} 
                sx={{ mb: 2, height: 8, borderRadius: 4 }}
              />
              <Typography variant="body2" color="text.secondary">
                15 de 20 ejercicios completados
              </Typography>
            </CardContent>
          </Card>
        </Grid>

        <Grid>
        {/* <Grid item xs={12} md={6}> */}
          <Card>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                Calorías Quemadas
              </Typography>
              <Typography variant="h3" color="primary" gutterBottom>
                1,245
              </Typography>
              <Chip label="Esta semana" color="success" size="small" />
            </CardContent>
          </Card>
        </Grid>

        <Grid>
        {/* <Grid item xs={12}> */}
          <Card>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                Estadísticas Recientes
              </Typography>
              <Typography variant="body1" color="text.secondary">
                Aquí se mostrarán gráficos y estadísticas detalladas de tu progreso.
              </Typography>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Box>
  );
}