// src/types/routines.ts
import { Exercise } from './exercise';

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
    isPublic: boolean;
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

// 🏃‍♀️ TIPOS PARA CREAR RUTINA
export interface CreateRoutineForm {
    title: string;
    description: string;
    exercises: Exercise[];
    totalDuration: number;
    difficulty: 'Principiante' | 'Intermedio' | 'Avanzado';
    categories: string[];
    isPublic: boolean;
    targetAge: string;
    restTime: number; // segundos entre ejercicios
}

export interface CreateRoutineRequest {
    title: string;
    description: string;
    exerciseIds: number[]; // Solo IDs de ejercicios
    totalDuration: number;
    difficulty: 'Principiante' | 'Intermedio' | 'Avanzado';
    categories: string[];
    isPublic: boolean;
    targetAge: string;
    restTime: number;
}

export interface CreateRoutineResponse {
    success: boolean;
    routine: Routine;
    message?: string;
}

// Filtros para ejercicios en el selector
export interface ExerciseFilter {
    search: string;
    category: string;
    difficulty: string;
}

// Estados de operaciones asíncronas para rutinas
export interface AsyncRoutineOperationState {
    loading: boolean;
    error: string | null;
    success: boolean;
}