// src/constants/routineMocks.ts
import { Routine, RoutineAssignment } from '@/types/routines';
import { MOCK_EXERCISES } from './exerciseMocks';

// Rutinas predefinidas del sistema
export const MOCK_ROUTINES: Routine[] = [
    {
        id: 'routine-001',
        title: 'Rutina Matutina Energética',
        description: 'Rutina perfecta para empezar el día con energía. Combina calentamiento, ejercicios de fuerza y estiramiento.',
        exercises: [
            MOCK_EXERCISES[5], // Estiramiento de Gato - calentamiento
            MOCK_EXERCISES[0], // Lagartijas Clásicas
            MOCK_EXERCISES[1], // Sentadillas
            MOCK_EXERCISES[3], // Jumping Jacks
            MOCK_EXERCISES[5], // Estiramiento de Gato - enfriamiento
        ],
        totalDuration: 35, // 5 + 10 + 15 + 12 + 5 = 47, pero estimamos 35 para ser realistas
        difficulty: 'Principiante',
        categories: ['Cuerpo Completo', 'Cardio', 'Fuerza'],
        createdBy: 'system',
        isPublic: true,
        createdAt: '2024-01-01T00:00:00Z',
        updatedAt: '2024-01-01T00:00:00Z',
    },
    {
        id: 'routine-002',
        title: 'Cardio Rápido',
        description: 'Rutina intensa de cardio para quemar energía. Perfecta para después del colegio.',
        exercises: [
            MOCK_EXERCISES[3], // Jumping Jacks
            MOCK_EXERCISES[6], // Mountain Climbers
            MOCK_EXERCISES[9], // Correr en el Lugar
            MOCK_EXERCISES[4], // Burpees
        ],
        totalDuration: 25, // Rutina más corta pero intensa
        difficulty: 'Intermedio',
        categories: ['Cardio', 'Cuerpo Completo'],
        createdBy: 'system',
        isPublic: true,
        createdAt: '2024-01-01T00:00:00Z',
        updatedAt: '2024-01-01T00:00:00Z',
    },
    {
        id: 'routine-003',
        title: 'Fuerza y Equilibrio',
        description: 'Desarrolla fuerza y equilibrio con ejercicios controlados y conscientes.',
        exercises: [
            MOCK_EXERCISES[5], // Estiramiento de Gato - preparación
            MOCK_EXERCISES[0], // Lagartijas Clásicas
            MOCK_EXERCISES[1], // Sentadillas
            MOCK_EXERCISES[2], // Plancha Isométrica
            MOCK_EXERCISES[7], // Yoga Saludo al Sol
        ],
        totalDuration: 40,
        difficulty: 'Intermedio',
        categories: ['Fuerza', 'Core', 'Flexibilidad'],
        createdBy: 'system',
        isPublic: true,
        createdAt: '2024-01-01T00:00:00Z',
        updatedAt: '2024-01-01T00:00:00Z',
    },
    {
        id: 'routine-004',
        title: 'Relajación y Estiramiento',
        description: 'Rutina suave para relajarse y mejorar la flexibilidad. Ideal para antes de dormir.',
        exercises: [
            MOCK_EXERCISES[5], // Estiramiento de Gato
            MOCK_EXERCISES[7], // Yoga Saludo al Sol
            MOCK_EXERCISES[8], // Yoga Saludo al Sol - Variación 2
            MOCK_EXERCISES[10], // Yoga Saludo al Sol - Variación 1
        ],
        totalDuration: 35,
        difficulty: 'Principiante',
        categories: ['Flexibilidad', 'Movilidad', 'Bienestar'],
        createdBy: 'system',
        isPublic: true,
        createdAt: '2024-01-01T00:00:00Z',
        updatedAt: '2024-01-01T00:00:00Z',
    },
    {
        id: 'routine-005',
        title: 'Desafío Avanzado',
        description: 'Para niños que quieren un reto mayor. Ejercicios de alta intensidad.',
        exercises: [
            MOCK_EXERCISES[3], // Jumping Jacks - calentamiento
            MOCK_EXERCISES[4], // Burpees
            MOCK_EXERCISES[6], // Mountain Climbers
            MOCK_EXERCISES[2], // Plancha Isométrica
            MOCK_EXERCISES[0], // Lagartijas Clásicas
            MOCK_EXERCISES[5], // Estiramiento de Gato - enfriamiento
        ],
        totalDuration: 50,
        difficulty: 'Avanzado',
        categories: ['Cardio', 'Fuerza', 'Cuerpo Completo'],
        createdBy: 'system',
        isPublic: true,
        createdAt: '2024-01-01T00:00:00Z',
        updatedAt: '2024-01-01T00:00:00Z',
    }
];

// Rutinas asignadas para testing - simulando diferentes estados
export const MOCK_ROUTINE_ASSIGNMENTS: RoutineAssignment[] = [
    // Rutina para HOY - pending (la que se mostrará en entrenamiento)
    {
        id: 'assignment-today',
        routineId: 'routine-001',
        routine: MOCK_ROUTINES[0], // Rutina Matutina Energética
        kidId: 'kid-free-001', // Sofia
        assignedDate: new Date().toISOString().split('T')[0], // Hoy
        status: 'pending',
        assignedBy: 'tutor-free-001', // Ana
    },
    // Rutina de ayer - completed
    {
        id: 'assignment-yesterday',
        routineId: 'routine-004',
        routine: MOCK_ROUTINES[3], // Relajación y Estiramiento
        kidId: 'kid-free-001', // Sofia
        assignedDate: new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString().split('T')[0], // Ayer
        status: 'completed',
        assignedBy: 'tutor-free-001', // Ana
        completedAt: new Date(Date.now() - 20 * 60 * 60 * 1000).toISOString(), // Hace 20 horas
        totalTimeSpent: 1800, // 30 minutos
        exerciseResults: [
            {
                exerciseId: 5,
                startedAt: new Date(Date.now() - 20 * 60 * 60 * 1000).toISOString(),
                completedAt: new Date(Date.now() - 20 * 60 * 60 * 1000 + 5 * 60 * 1000).toISOString(),
                timeSpent: 300, // 5 minutos
                skipped: false
            }
        ]
    },
    // Rutina mañana - pending
    {
        id: 'assignment-tomorrow',
        routineId: 'routine-002',
        routine: MOCK_ROUTINES[1], // Cardio Rápido
        kidId: 'kid-free-001', // Sofia
        assignedDate: new Date(Date.now() + 24 * 60 * 60 * 1000).toISOString().split('T')[0], // Mañana
        status: 'pending',
        assignedBy: 'tutor-free-001', // Ana
    },

    // Rutinas para el niño premium (Diego)
    {
        id: 'assignment-premium-today',
        routineId: 'routine-003',
        routine: MOCK_ROUTINES[2], // Fuerza y Equilibrio
        kidId: 'kid-premium-001', // Diego
        assignedDate: new Date().toISOString().split('T')[0], // Hoy
        status: 'pending',
        assignedBy: 'tutor-premium-001', // Carlos
    }
];

// Helper functions para encontrar rutinas
export const findRoutineById = (routineId: string): Routine | null => {
    return MOCK_ROUTINES.find(routine => routine.id === routineId) || null;
};

export const findTodayAssignment = (kidId: string): RoutineAssignment | null => {
    const today = new Date().toISOString().split('T')[0];
    return MOCK_ROUTINE_ASSIGNMENTS.find(
        assignment => assignment.kidId === kidId && assignment.assignedDate === today
    ) || null;
};

export const findAssignmentsByKid = (kidId: string): RoutineAssignment[] => {
    return MOCK_ROUTINE_ASSIGNMENTS.filter(assignment => assignment.kidId === kidId);
};

export const findAssignmentsByDateRange = (
    kidId: string,
    startDate: string,
    endDate: string
): RoutineAssignment[] => {
    return MOCK_ROUTINE_ASSIGNMENTS.filter(assignment =>
        assignment.kidId === kidId &&
        assignment.assignedDate >= startDate &&
        assignment.assignedDate <= endDate
    );
};