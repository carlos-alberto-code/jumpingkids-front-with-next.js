// src/types/routine.ts
export interface Routine {
    id: string;
    title: string;
    description: string;
    exercises: Exercise[];
    totalDuration: number; // Duración estimada total en minutos
    difficulty: 'Principiante' | 'Intermedio' | 'Avanzado';
    categories: string[];
    createdBy: string; // ID del tutor que la creó
    isPublic: boolean; // true = predefinida del sistema, false = personalizada
    createdAt: string;
    updatedAt: string;
}

export interface Exercise {
    id: number;
    title: string;
    description: string;
    duration: number;
    calories: number;
    difficulty: 'Principiante' | 'Intermedio' | 'Avanzado';
    isFavorite: boolean;
    categories: string[];
    gifUrl: string;
}

// Estados de una rutina asignada
export type RoutineAssignmentStatus = 'pending' | 'in-progress' | 'completed' | 'skipped';

// Rutina asignada a un niño para una fecha específica
export interface RoutineAssignment {
    id: string;
    routineId: string;
    routine: Routine;
    kidId: string;
    assignedDate: string; // YYYY-MM-DD
    status: RoutineAssignmentStatus;
    assignedBy: string; // ID del tutor
    completedAt?: string;
    exerciseResults?: ExerciseResult[];
    totalTimeSpent?: number; // Tiempo real tomado en segundos
}

// Resultado de un ejercicio individual dentro de una rutina
export interface ExerciseResult {
    exerciseId: number;
    startedAt: string;
    completedAt?: string;
    timeSpent: number; // Tiempo real en segundos
    skipped: boolean;
    notes?: string;
}

// Estado del entrenamiento en curso
export interface TrainingSession {
    assignmentId: string;
    routine: Routine;
    currentExerciseIndex: number;
    startedAt: string;
    exerciseResults: ExerciseResult[];
    isPaused: boolean;
    isCompleted: boolean;
}

// Datos para requests de API (preparación para backend)
export interface CreateRoutineRequest {
    title: string;
    description: string;
    exerciseIds: number[];
    isPublic?: boolean;
}

export interface UpdateRoutineRequest extends Partial<CreateRoutineRequest> {
    id: string;
}

export interface AssignRoutineRequest {
    routineId: string;
    kidId: string;
    assignedDate: string;
}

export interface CompleteExerciseRequest {
    assignmentId: string;
    exerciseId: number;
    timeSpent: number;
    skipped?: boolean;
    notes?: string;
}

export interface CompleteRoutineRequest {
    assignmentId: string;
    totalTimeSpent: number;
    exerciseResults: ExerciseResult[];
}