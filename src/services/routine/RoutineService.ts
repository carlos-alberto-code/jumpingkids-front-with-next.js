// src/services/routine/RoutineService.ts

import { findAssignmentsByKid, findTodayAssignment, MOCK_ROUTINE_ASSIGNMENTS, MOCK_ROUTINES } from "@/constants/routinesMocks";
import { CreateRoutineForm, CreateRoutineRequest, ExerciseResult, Routine, RoutineAssignment, TrainingSession } from "@/types/routines";
import { buildApiUrl, getApiConfig } from '../../config/api';
import { executeWithRetry } from '../../utils/httpUtils';

// ============================================================================
// Constants & Configuration
// ============================================================================

const STORAGE_KEY = 'jumpingkids-training-sessions';
const MOCK_DELAY_MS = 800;

// ============================================================================
// Utilities & Helpers
// ============================================================================

/**
 * Simula un delay de red para desarrollo
 */
const simulateDelay = (ms: number = MOCK_DELAY_MS): Promise<void> => {
    return new Promise(resolve => setTimeout(resolve, ms));
};

/**
 * Verifica si el código se ejecuta en el navegador
 */
const isBrowser = (): boolean => typeof window !== 'undefined';

/**
 * Obtiene URL base para API
 */
const getApiUrl = (): string => {
    return process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000/api';
};

/**
 * Obtiene headers para requests HTTP
 */
const getHeaders = (): Record<string, string> => {
    const headers: Record<string, string> = {
        'Content-Type': 'application/json',
    };

    // Agregar token de autenticación cuando esté disponible
    if (isBrowser()) {
        const token = localStorage.getItem('jumpingkids-session');
        if (token) {
            try {
                const session = JSON.parse(token);
                if (session.token) {
                    headers['Authorization'] = `Bearer ${session.token}`;
                }
            } catch {
                // Token inválido, ignorar
            }
        }
    }

    return headers;
};

/**
 * Crea un ejercicio resultado para la sesión
 */
const createExerciseResult = (
    exerciseId: number,
    timeSpent: number,
    skipped: boolean = false
): ExerciseResult => {
    return {
        exerciseId,
        startedAt: new Date(Date.now() - timeSpent * 1000).toISOString(),
        completedAt: new Date().toISOString(),
        timeSpent,
        skipped
    };
};

/**
 * Crea una rutina mock para desarrollo
 */
const createMockRoutine = (routineData: CreateRoutineRequest): Routine => {
    return {
        id: Date.now().toString(),
        title: routineData.title,
        description: routineData.description,
        exercises: [], // Se poblaría desde exerciseIds
        totalDuration: routineData.totalDuration,
        difficulty: routineData.difficulty,
        categories: routineData.categories,
        isPublic: routineData.isPublic || false,
        createdBy: 'mock-user-id',
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
    };
};

// ============================================================================
// Core Training Functions
// ============================================================================

/**
 * Obtiene la rutina asignada para HOY del niño especificado
 */
export const getTodayRoutine = async (kidId: string): Promise<RoutineAssignment | null> => {
    await simulateDelay();

    console.log(`📅 Buscando rutina de hoy para kidId: ${kidId}`);
    const assignment = findTodayAssignment(kidId);
    console.log('📅 Rutina encontrada:', assignment);

    return assignment;
};

/**
 * Inicia una nueva sesión de entrenamiento
 */
export const startTrainingSession = async (assignmentId: string): Promise<TrainingSession> => {
    await simulateDelay();

    const assignment = MOCK_ROUTINE_ASSIGNMENTS.find(a => a.id === assignmentId);
    if (!assignment) {
        throw new Error('Asignación no encontrada');
    }

    const session: TrainingSession = {
        assignmentId,
        routine: assignment.routine,
        currentExerciseIndex: 0,
        startedAt: new Date().toISOString(),
        exerciseResults: [],
        isPaused: false,
        isCompleted: false
    };

    // Guardar sesión en localStorage
    saveTrainingSession(session);
    console.log('🏃‍♀️ Sesión de entrenamiento iniciada:', session);

    return session;
};

/**
 * Completa un ejercicio específico
 */
export const completeExercise = async (
    sessionId: string,
    exerciseId: number,
    timeSpent: number,
    skipped: boolean = false
): Promise<TrainingSession> => {
    await simulateDelay(500); // Más rápido para mejor UX

    const session = getCurrentTrainingSession();
    if (!session || session.assignmentId !== sessionId) {
        throw new Error('Sesión no encontrada');
    }

    // Crear resultado del ejercicio
    const exerciseResult = createExerciseResult(exerciseId, timeSpent, skipped);

    // Actualizar sesión
    const updatedSession: TrainingSession = {
        ...session,
        exerciseResults: [...session.exerciseResults, exerciseResult],
        currentExerciseIndex: session.currentExerciseIndex + 1,
        isCompleted: session.currentExerciseIndex + 1 >= session.routine.exercises.length
    };

    saveTrainingSession(updatedSession);
    console.log('✅ Ejercicio completado:', exerciseResult);

    return updatedSession;
};

/**
 * Completa toda la rutina
 */
export const completeRoutine = async (sessionId: string): Promise<boolean> => {
    await simulateDelay();

    const session = getCurrentTrainingSession();
    if (!session || session.assignmentId !== sessionId) {
        throw new Error('Sesión no encontrada');
    }

    // Calcular tiempo total
    const totalTimeSpent = session.exerciseResults.reduce(
        (total, result) => total + result.timeSpent, 0
    );

    // En una implementación real, esto actualizaría la base de datos
    console.log('🎉 ¡Rutina completada!', {
        assignmentId: sessionId,
        totalTimeSpent,
        exerciseResults: session.exerciseResults
    });

    // Limpiar sesión local
    clearTrainingSession();
    return true;
};

/**
 * Crear una nueva rutina con retry logic y verificación de conectividad
 */
export const createRoutine = async (routineData: CreateRoutineRequest): Promise<Routine> => {
    const config = getApiConfig();

    // Simular delay de red si está configurado
    if (config.SIMULATE_NETWORK_DELAY) {
        await simulateDelay(config.DELAY_MS);
    }

    if (config.USE_MOCK_DATA) {
        // Simular respuesta exitosa
        const mockRoutine = createMockRoutine(routineData);

        if (config.ENABLE_API_LOGS) {
            console.log('🎯 Mock: Rutina creada:', mockRoutine);
        }

        return mockRoutine;
    }

    // Verificar conectividad antes de intentar la petición
    const isOnline = navigator.onLine;
    if (!isOnline) {
        throw new Error('Sin conexión a internet');
    }

    // Realizar petición HTTP real
    const url = buildApiUrl('/routines');
    const response = await executeWithRetry(() =>
        fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
                // Agregar headers de autenticación aquí si es necesario
                // 'Authorization': `Bearer ${getToken()}`
            },
            body: JSON.stringify(routineData)
        })
    );

    if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(errorData.message || `HTTP ${response.status}: ${response.statusText}`);
    }

    const result = await response.json();

    if (config.ENABLE_API_LOGS) {
        console.log('✅ Rutina creada exitosamente:', result);
    }

    return result.data || result;
};

// ============================================================================
// Session Management Functions
// ============================================================================

/**
 * Obtiene la sesión de entrenamiento actual (si existe)
 */
export const getCurrentTrainingSession = (): TrainingSession | null => {
    try {
        if (!isBrowser()) return null;

        const sessionData = localStorage.getItem(STORAGE_KEY);
        if (!sessionData) return null;

        const session: TrainingSession = JSON.parse(sessionData);
        console.log('📱 Sesión recuperada:', session);
        return session;
    } catch (error) {
        console.error('❌ Error recuperando sesión:', error);
        return null;
    }
};

/**
 * Guarda el progreso de la sesión actual
 */
export const saveTrainingSession = (session: TrainingSession): void => {
    try {
        if (!isBrowser()) return;

        localStorage.setItem(STORAGE_KEY, JSON.stringify(session));
        console.log('💾 Sesión guardada:', session);
    } catch (error) {
        console.error('❌ Error guardando sesión:', error);
    }
};

/**
 * Pausa/reanuda la sesión actual
 */
export const pauseTrainingSession = (): void => {
    const session = getCurrentTrainingSession();
    if (session) {
        const updatedSession = { ...session, isPaused: !session.isPaused };
        saveTrainingSession(updatedSession);
    }
};

/**
 * Limpia la sesión de entrenamiento actual
 */
export const clearTrainingSession = (): void => {
    try {
        if (isBrowser()) {
            localStorage.removeItem(STORAGE_KEY);
            console.log('🗑️ Sesión de entrenamiento limpiada');
        }
    } catch (error) {
        console.error('❌ Error limpiando sesión:', error);
    }
};

// ============================================================================
// Data Fetching Functions
// ============================================================================

/**
 * Obtiene todas las rutinas disponibles
 */
export const getAllRoutines = async (): Promise<Routine[]> => {
    await simulateDelay();
    return MOCK_ROUTINES;
};

/**
 * Obtiene las asignaciones de un niño en un rango de fechas
 */
export const getAssignments = async (
    kidId: string,
    startDate?: string,
    endDate?: string
): Promise<RoutineAssignment[]> => {
    await simulateDelay();

    let assignments = findAssignmentsByKid(kidId);

    if (startDate && endDate) {
        assignments = assignments.filter(a =>
            a.assignedDate >= startDate && a.assignedDate <= endDate
        );
    }

    return assignments;
};

// ============================================================================
// Validation Functions
// ============================================================================

/**
 * Validar y transformar datos antes de enviar a la API
 */
export const validateCreateRoutineData = (data: CreateRoutineForm): CreateRoutineRequest => {
    // Validar campos requeridos
    if (!data.title?.trim()) {
        throw new Error('El título es requerido');
    }

    if (!data.description?.trim()) {
        throw new Error('La descripción es requerida');
    }

    if (!data.exercises || data.exercises.length === 0) {
        throw new Error('Selecciona al menos un ejercicio');
    }

    if (data.exercises.length < 2) {
        throw new Error('Una rutina debe tener al menos 2 ejercicios');
    }

    // Transformar y limpiar datos
    return {
        title: data.title.trim(),
        description: data.description.trim(),
        exerciseIds: data.exercises.map(ex => ex.id),
        totalDuration: data.totalDuration || 0,
        difficulty: data.difficulty || 'Principiante',
        categories: data.categories.filter(cat => cat.trim()),
        isPublic: Boolean(data.isPublic),
        targetAge: data.targetAge || 'kids',
        restTime: Number(data.restTime) || 30
    };
};

/**
 * Validar que una rutina tenga todos los campos requeridos
 */
export const validateRoutine = (routine: Partial<Routine>): routine is Routine => {
    return !!(
        routine.id &&
        routine.title &&
        routine.description &&
        routine.exercises &&
        routine.totalDuration !== undefined &&
        routine.difficulty &&
        routine.categories &&
        routine.createdBy &&
        routine.createdAt &&
        routine.updatedAt
    );
};

// ============================================================================
// Legacy Class Support (Deprecated)
// ============================================================================

/**
 * @deprecated Use individual functions instead
 * Mantener por compatibilidad hacia atrás
 */
export class RoutineService {
    private static readonly STORAGE_KEY = STORAGE_KEY;
    private static readonly MOCK_DELAY_MS = MOCK_DELAY_MS;

    static async getTodayRoutine(kidId: string): Promise<RoutineAssignment | null> {
        return getTodayRoutine(kidId);
    }

    static async startTrainingSession(assignmentId: string): Promise<TrainingSession> {
        return startTrainingSession(assignmentId);
    }

    static getCurrentTrainingSession(): TrainingSession | null {
        return getCurrentTrainingSession();
    }

    static saveTrainingSession(session: TrainingSession): void {
        return saveTrainingSession(session);
    }

    static async completeExercise(
        sessionId: string,
        exerciseId: number,
        timeSpent: number,
        skipped = false
    ): Promise<TrainingSession> {
        return completeExercise(sessionId, exerciseId, timeSpent, skipped);
    }

    static async completeRoutine(sessionId: string): Promise<boolean> {
        return completeRoutine(sessionId);
    }

    static pauseTrainingSession(): void {
        return pauseTrainingSession();
    }

    static clearTrainingSession(): void {
        return clearTrainingSession();
    }

    static async getAllRoutines(): Promise<Routine[]> {
        return getAllRoutines();
    }

    static async getAssignments(
        kidId: string,
        startDate?: string,
        endDate?: string
    ): Promise<RoutineAssignment[]> {
        return getAssignments(kidId, startDate, endDate);
    }

    private static getApiUrl(): string {
        return getApiUrl();
    }

    private static getHeaders(): Record<string, string> {
        return getHeaders();
    }

    static async createRoutine(routineData: CreateRoutineRequest): Promise<Routine> {
        return createRoutine(routineData);
    }

    static validateCreateRoutineData(data: CreateRoutineForm): CreateRoutineRequest {
        return validateCreateRoutineData(data);
    }

    static validateRoutine(routine: Partial<Routine>): routine is Routine {
        return validateRoutine(routine);
    }
}