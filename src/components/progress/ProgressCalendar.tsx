import { Box, Grid, Paper, Typography } from '@mui/material';

export interface CalendarDay {
    date: Date;
    dayNumber: number;
    isCurrentMonth: boolean;
    isToday: boolean;
    hasActivity: boolean;
}

export interface ProgressCalendarProps {
    calendarDays: CalendarDay[];
    monthName: string;
}

const dayNames = ['D', 'L', 'M', 'X', 'J', 'V', 'S'];

export default function ProgressCalendar({ calendarDays, monthName }: ProgressCalendarProps) {
    return (
        <>
            <Typography variant="h6" gutterBottom>
                📅 Calendario de Actividad - {monthName}
            </Typography>
            
            {/* Días de la semana */}
            <Grid container sx={{ mb: 1 }}>
                {dayNames.map((day, index) => (
                    <Grid size={{ xs: 12/7 }} key={index}>
                        <Typography 
                            variant="caption" 
                            sx={{ 
                                display: 'block',
                                textAlign: 'center',
                                fontWeight: 'bold',
                                color: 'text.secondary',
                                py: 1
                            }}
                        >
                            {day}
                        </Typography>
                    </Grid>
                ))}
            </Grid>

            {/* Días del calendario */}
            <Grid container>
                {calendarDays.map((day, index) => (
                    <Grid size={{ xs: 12/7 }} key={index}>
                        <Paper
                            elevation={0}
                            sx={{
                                height: 40,
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                opacity: day.isCurrentMonth ? 1 : 0.3,
                                backgroundColor: 
                                    day.isToday ? 'primary.light' :
                                    day.hasActivity ? 'success.light' : 
                                    'transparent',
                                border: day.isToday ? '2px solid' : '1px solid',
                                borderColor: 
                                    day.isToday ? 'primary.main' :
                                    day.hasActivity ? 'success.main' :
                                    'transparent',
                                borderRadius: 1,
                                m: 0.25
                            }}
                        >
                            <Typography 
                                variant="caption"
                                sx={{
                                    fontWeight: day.isToday ? 'bold' : 'normal',
                                    color: 
                                        day.isToday ? 'primary.main' :
                                        day.hasActivity ? 'success.main' :
                                        'inherit'
                                }}
                            >
                                {day.dayNumber}
                            </Typography>
                        </Paper>
                    </Grid>
                ))}
            </Grid>

            {/* Leyenda */}
            <Box sx={{ mt: 2, display: 'flex', gap: 3, justifyContent: 'center' }}>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                    <Box sx={{ 
                        width: 12, 
                        height: 12, 
                        backgroundColor: 'success.light',
                        border: '1px solid',
                        borderColor: 'success.main',
                        borderRadius: 0.5
                    }} />
                    <Typography variant="caption">Rutina completada</Typography>
                </Box>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                    <Box sx={{ 
                        width: 12, 
                        height: 12, 
                        backgroundColor: 'primary.light',
                        border: '2px solid',
                        borderColor: 'primary.main',
                        borderRadius: 0.5
                    }} />
                    <Typography variant="caption">Hoy</Typography>
                </Box>
            </Box>
        </>
    );
}
