// src/app/(dashboard)/settings/page.tsx
'use client';

import { 
  Box, 
  Typography, 
  Card, 
  CardContent, 
  Switch,
  FormControlLabel,
  Divider,
  Button
} from '@mui/material';
import SettingsIcon from '@mui/icons-material/Settings';

export default function SettingsPage() {
  return (
    <Box sx={{ p: 3 }}>
      <Box sx={{ display: 'flex', alignItems: 'center', mb: 3 }}>
        <SettingsIcon sx={{ mr: 2, fontSize: 32 }} color="primary" />
        <Typography variant="h4" component="h1">
          Configuración
        </Typography>
      </Box>

      <Card sx={{ mb: 3 }}>
        <CardContent>
          <Typography variant="h6" gutterBottom>
            Preferencias de Entrenamiento
          </Typography>
          
          <FormControlLabel
            control={<Switch defaultChecked />}
            label="Notificaciones de recordatorio"
            sx={{ mb: 2, display: 'block' }}
          />
          
          <FormControlLabel
            control={<Switch defaultChecked />}
            label="Reproducir sonidos durante ejercicios"
            sx={{ mb: 2, display: 'block' }}
          />
          
          <FormControlLabel
            control={<Switch />}
            label="Modo oscuro"
            sx={{ mb: 2, display: 'block' }}
          />

          <Divider sx={{ my: 2 }} />

          <Typography variant="h6" gutterBottom>
            Perfil
          </Typography>
          
          <Typography variant="body2" color="text.secondary" paragraph>
            Gestiona tu información personal y preferencias de cuenta.
          </Typography>

          <Button variant="outlined" sx={{ mr: 2 }}>
            Editar Perfil
          </Button>
          
          <Button variant="contained">
            Guardar Cambios
          </Button>
        </CardContent>
      </Card>
    </Box>
  );
}