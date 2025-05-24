import * as React from 'react';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';

export default function HomePage() {
  return (
    <Box sx={{ p: 2 }}>
      <Typography variant="h4" component="h1" gutterBottom>
        ¡Bienvenido al Dashboard!
      </Typography>
      
      <Card sx={{ mt: 3, maxWidth: 600 }}>
        <CardContent>
          <Typography variant="h6" gutterBottom>
            Página Principal
          </Typography>
          <Typography variant="body1" color="text.secondary">
            Esta es la página principal de tu aplicación con Toolpad Core. 
            Aquí puedes agregar cualquier contenido que necesites.
          </Typography>
        </CardContent>
      </Card>
    </Box>
  );
}