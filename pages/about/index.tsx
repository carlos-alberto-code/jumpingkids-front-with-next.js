import * as React from 'react';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Chip from '@mui/material/Chip';

export default function AboutPage() {
  return (
    <Box sx={{ p: 2 }}>
      <Typography variant="h4" component="h1" gutterBottom>
        Acerca de esta aplicación
      </Typography>
      
      <Card sx={{ mt: 3, maxWidth: 600 }}>
        <CardContent>
          <Typography variant="h6" gutterBottom>
            Tecnologías utilizadas
          </Typography>
          <Typography variant="body1" color="text.secondary" paragraph>
            Esta aplicación está construida con las siguientes tecnologías:
          </Typography>
          
          <Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap', mt: 2 }}>
            <Chip label="Next.js" color="primary" />
            <Chip label="React" color="primary" />
            <Chip label="Material-UI" color="secondary" />
            <Chip label="Toolpad Core" color="success" />
            <Chip label="TypeScript" color="info" />
          </Box>
          
          <Typography variant="body2" color="text.secondary" sx={{ mt: 2 }}>
            ¡Navega entre las páginas usando el menú lateral!
          </Typography>
        </CardContent>
      </Card>
    </Box>
  );
}