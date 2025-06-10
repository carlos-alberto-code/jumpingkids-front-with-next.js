import { CalendarDay } from './ProgressCalendar';

export const generateProgressCalendar = (): CalendarDay[] => {
    const today = new Date();
    const year = today.getFullYear();
    const month = today.getMonth();
    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);
    const startDate = new Date(firstDay);
    startDate.setDate(startDate.getDate() - firstDay.getDay());
    
    const days: CalendarDay[] = [];
    const currentDate = new Date(startDate);
    
    for (let i = 0; i < 35; i++) {
        const isCurrentMonth = currentDate.getMonth() === month;
        const isToday = currentDate.toDateString() === today.toDateString();
        const hasActivity = isCurrentMonth && Math.random() > 0.6; // Simulación
        
        days.push({
            date: new Date(currentDate),
            dayNumber: currentDate.getDate(),
            isCurrentMonth,
            isToday,
            hasActivity
        });
        
        currentDate.setDate(currentDate.getDate() + 1);
    }
    
    return days;
};

export const getMonthNames = (): string[] => [
    'Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio',
    'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'
];
