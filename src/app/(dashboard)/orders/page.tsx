// src/app/(dashboard)/orders/page.tsx
import { PageContainer } from '@toolpad/core/PageContainer';
import Typography from '@mui/material/Typography';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Chip from '@mui/material/Chip';

// Datos de ejemplo
const orders = [
  { id: '001', customer: 'Juan Pérez', amount: '$234.50', status: 'Completado', date: '2024-05-20' },
  { id: '002', customer: 'María García', amount: '$567.30', status: 'Pendiente', date: '2024-05-21' },
  { id: '003', customer: 'Carlos López', amount: '$123.80', status: 'Enviado', date: '2024-05-22' },
  { id: '004', customer: 'Ana Martínez', amount: '$890.20', status: 'Completado', date: '2024-05-22' },
];

const getStatusColor = (status: string) => {
  switch (status) {
    case 'Completado':
      return 'success';
    case 'Pendiente':
      return 'warning';
    case 'Enviado':
      return 'info';
    default:
      return 'default';
  }
};

export default function OrdersPage() {
  return (
    <PageContainer>
      <Typography variant="h4" component="h1" gutterBottom>
        Gestión de Pedidos
      </Typography>
      
      <Typography variant="body1" color="text.secondary" paragraph>
        Aquí puedes ver y administrar todos los pedidos de tu aplicación.
      </Typography>

      <TableContainer component={Paper} sx={{ mt: 3 }}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>ID Pedido</TableCell>
              <TableCell>Cliente</TableCell>
              <TableCell>Monto</TableCell>
              <TableCell>Estado</TableCell>
              <TableCell>Fecha</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {orders.map((order) => (
              <TableRow key={order.id} hover>
                <TableCell>#{order.id}</TableCell>
                <TableCell>{order.customer}</TableCell>
                <TableCell>{order.amount}</TableCell>
                <TableCell>
                  <Chip 
                    label={order.status} 
                    color={getStatusColor(order.status) as any}
                    size="small"
                  />
                </TableCell>
                <TableCell>{order.date}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </PageContainer>
  );
}