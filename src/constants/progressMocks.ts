import { RoutineAssignment } from '../types/routines';
import { MOCK_ROUTINES } from './routinesMocks';

/**
 * 📋 TIPOS PARA PROGRESO Y SESIONES DE ENTRENAMIENTO
 */
export interface TrainingSession {
    id: string;
    kidId: string;
    routineId?: string;
    exerciseId?: string;
    startTime: string;
    endTime?: string;
    duration: number; // en minutos
    caloriesBurned: number;
    status: 'completed' | 'in_progress' | 'paused';
    notes?: string;
}

export interface KidProgress {
    kidId: string;
    totalSessions: number;
    totalDuration: number; // en minutos
    totalCalories: number;
    streak: number; // días consecutivos
    level: number;
    experience: number;
    achievements: string[];
    weeklyGoal: {
        target: number; // minutos por semana
        current: number;
        week: string; // formato: "2024-W25"
    };
}

/**
 * 📋 ASIGNACIONES MOCK - Usando el tipo correcto de routines.ts
 */
export const MOCK_ASSIGNMENTS: RoutineAssignment[] = [
    // Asignaciones para Sofia (kid-free-001)
    {
        id: 'assignment-001',
        routineId: 'routine-001', // Rutina Matutina Energética
        routine: MOCK_ROUTINES[0], // Rutina Matutina Energética
        kidId: 'kid-free-001',
        assignedDate: '2024-06-19',
        status: 'in-progress',
        assignedBy: 'tutor-free-001',
        totalTimeSpent: 1800 // 30 minutos en segundos
    },
    {
        id: 'assignment-002',
        routineId: 'routine-004', // Relajación y Estiramiento
        routine: MOCK_ROUTINES[3], // Relajación y Estiramiento
        kidId: 'kid-free-001',
        assignedDate: '2024-06-20',
        status: 'pending',
        assignedBy: 'tutor-free-001'
    },

    // Asignaciones para Diego (kid-free-002)
    {
        id: 'assignment-003',
        routineId: 'routine-002', // Cardio Rápido
        routine: MOCK_ROUTINES[1], // Cardio Rápido
        kidId: 'kid-free-002',
        assignedDate: '2024-06-18',
        status: 'completed',
        assignedBy: 'tutor-free-002',
        completedAt: '2024-06-18T16:30:00Z',
        totalTimeSpent: 1500 // 25 minutos
    },

    // Asignaciones para Emma (kid-premium-001)
    {
        id: 'assignment-004',
        routineId: 'routine-005', // Desafío Avanzado
        routine: MOCK_ROUTINES[4], // Desafío Avanzado
        kidId: 'kid-premium-001',
        assignedDate: '2024-06-19',
        status: 'in-progress',
        assignedBy: 'tutor-premium-001',
        totalTimeSpent: 2700 // 45 minutos
    },
    {
        id: 'assignment-005',
        routineId: 'routine-003', // Fuerza y Equilibrio
        routine: MOCK_ROUTINES[2], // Fuerza y Equilibrio
        kidId: 'kid-premium-001',
        assignedDate: '2024-06-21',
        status: 'pending',
        assignedBy: 'tutor-premium-001'
    },

    // Asignaciones para Lucas (kid-premium-002)
    {
        id: 'assignment-006',
        routineId: 'routine-001', // Rutina Matutina Energética
        routine: MOCK_ROUTINES[0], // Rutina Matutina Energética
        kidId: 'kid-premium-002',
        assignedDate: '2024-06-19',
        status: 'completed',
        assignedBy: 'tutor-premium-002',
        completedAt: '2024-06-19T07:30:00Z',
        totalTimeSpent: 2100 // 35 minutos
    }
];

/**
 * 🏃‍♀️ SESIONES DE ENTRENAMIENTO MOCK
 */
export const MOCK_TRAINING_SESSIONS: TrainingSession[] = [
    // Sesiones de Sofia
    {
        id: 'session-001',
        kidId: 'kid-free-001',
        routineId: 'routine-001',
        startTime: '2024-06-19T08:00:00Z',
        endTime: '2024-06-19T08:35:00Z',
        duration: 35,
        caloriesBurned: 120,
        status: 'completed',
        notes: 'Excelente sesión matutina'
    },
    {
        id: 'session-002',
        kidId: 'kid-free-001',
        routineId: 'routine-004',
        startTime: '2024-06-18T20:00:00Z',
        endTime: '2024-06-18T20:30:00Z',
        duration: 30,
        caloriesBurned: 80,
        status: 'completed'
    },

    // Sesiones de Diego
    {
        id: 'session-003',
        kidId: 'kid-free-002',
        routineId: 'routine-002',
        startTime: '2024-06-18T16:00:00Z',
        endTime: '2024-06-18T16:25:00Z',
        duration: 25,
        caloriesBurned: 150,
        status: 'completed',
        notes: 'Cardio intenso completado'
    },

    // Sesiones de Emma
    {
        id: 'session-004',
        kidId: 'kid-premium-001',
        routineId: 'routine-005',
        startTime: '2024-06-19T07:00:00Z',
        endTime: '2024-06-19T07:45:00Z',
        duration: 45,
        caloriesBurned: 200,
        status: 'completed',
        notes: 'Desafío avanzado superado!'
    },
    {
        id: 'session-005',
        kidId: 'kid-premium-001',
        routineId: 'routine-003',
        startTime: '2024-06-18T15:30:00Z',
        endTime: '2024-06-18T16:10:00Z',
        duration: 40,
        caloriesBurned: 140,
        status: 'completed'
    },

    // Sesiones de Lucas
    {
        id: 'session-006',
        kidId: 'kid-premium-002',
        routineId: 'routine-001',
        startTime: '2024-06-19T07:15:00Z',
        endTime: '2024-06-19T07:50:00Z',
        duration: 35,
        caloriesBurned: 130,
        status: 'completed',
        notes: 'Rutina matutina perfecta'
    }
];

/**
 * 📊 PROGRESO DE NIÑOS MOCK
 */
export const MOCK_KIDS_PROGRESS: KidProgress[] = [
    // Progreso de Sofia (kid-free-001)
    {
        kidId: 'kid-free-001',
        totalSessions: 15,
        totalDuration: 420, // 7 horas
        totalCalories: 1250,
        streak: 3,
        level: 2,
        experience: 350,
        achievements: ['first_workout', 'week_warrior', 'early_bird'],
        weeklyGoal: {
            target: 120, // 2 horas por semana
            current: 95,
            week: '2024-W25'
        }
    },

    // Progreso de Diego (kid-free-002)
    {
        kidId: 'kid-free-002',
        totalSessions: 8,
        totalDuration: 200,
        totalCalories: 890,
        streak: 1,
        level: 1,
        experience: 180,
        achievements: ['first_workout', 'cardio_king'],
        weeklyGoal: {
            target: 90,
            current: 75,
            week: '2024-W25'
        }
    },

    // Progreso de Emma (kid-premium-001)
    {
        kidId: 'kid-premium-001',
        totalSessions: 28,
        totalDuration: 850,
        totalCalories: 2100,
        streak: 7,
        level: 4,
        experience: 720,
        achievements: ['first_workout', 'week_warrior', 'premium_champion', 'streak_master', 'challenge_crusher'],
        weeklyGoal: {
            target: 180, // 3 horas por semana
            current: 165,
            week: '2024-W25'
        }
    },

    // Progreso de Lucas (kid-premium-002)
    {
        kidId: 'kid-premium-002',
        totalSessions: 22,
        totalDuration: 680,
        totalCalories: 1850,
        streak: 5,
        level: 3,
        experience: 580,
        achievements: ['first_workout', 'week_warrior', 'premium_champion', 'morning_hero'],
        weeklyGoal: {
            target: 150,
            current: 140,
            week: '2024-W25'
        }
    }
];

/**
 * ✅ HELPERS PARA OBTENER DATOS MOCK
 */

export function getMockAssignmentsForKid(kidId: string): RoutineAssignment[] {
    return MOCK_ASSIGNMENTS.filter(assignment => assignment.kidId === kidId);
}

export function getMockAssignmentsForTutor(tutorId: string): RoutineAssignment[] {
    return MOCK_ASSIGNMENTS.filter(assignment => assignment.assignedBy === tutorId);
}

export function getMockTrainingSessionsForKid(kidId: string): TrainingSession[] {
    return MOCK_TRAINING_SESSIONS.filter(session => session.kidId === kidId);
}

export function getMockProgressForKid(kidId: string): KidProgress | null {
    return MOCK_KIDS_PROGRESS.find(progress => progress.kidId === kidId) || null;
}

export function getMockAssignmentById(assignmentId: string): RoutineAssignment | null {
    return MOCK_ASSIGNMENTS.find(assignment => assignment.id === assignmentId) || null;
}

export function getMockSessionById(sessionId: string): TrainingSession | null {
    return MOCK_TRAINING_SESSIONS.find(session => session.id === sessionId) || null;
}
