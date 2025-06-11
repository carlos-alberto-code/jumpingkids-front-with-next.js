// src/services/routine/RoutineService.ts

import { findAssignmentsByKid, findTodayAssignment, MOCK_ROUTINE_ASSIGNMENTS, MOCK_ROUTINES } from "@/constants/routinesMocks";
import { CreateRoutineForm, CreateRoutineRequest, ExerciseResult, Routine, RoutineAssignment, TrainingSession } from "@/types/routines";
import { buildApiUrl, getApiConfig } from '../../config/api';
import { executeWithRetry } from '../../utils/httpUtils';


export class RoutineService {
    private static readonly STORAGE_KEY = 'jumpingkids-training-sessions';
    private static readonly MOCK_DELAY_MS = 800;

    /**
     * 🎯 FUNCIONES PRINCIPALES PARA ENTRENAMIENTO
     */

    /**
     * Obtiene la rutina asignada para HOY del niño especificado
     */
    static async getTodayRoutine(kidId: string): Promise<RoutineAssignment | null> {
        return new Promise((resolve) => {
            setTimeout(() => {
                console.log(`📅 Buscando rutina de hoy para kidId: ${kidId}`);
                const assignment = findTodayAssignment(kidId);
                console.log('📅 Rutina encontrada:', assignment);
                resolve(assignment);
            }, this.MOCK_DELAY_MS);
        });
    }

    /**
     * Inicia una nueva sesión de entrenamiento
     */
    static async startTrainingSession(assignmentId: string): Promise<TrainingSession> {
        return new Promise((resolve, reject) => {
            setTimeout(() => {
                try {
                    const assignment = MOCK_ROUTINE_ASSIGNMENTS.find(a => a.id === assignmentId);
                    if (!assignment) {
                        reject(new Error('Asignación no encontrada'));
                        return;
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
                    this.saveTrainingSession(session);
                    console.log('🏃‍♀️ Sesión de entrenamiento iniciada:', session);
                    resolve(session);
                } catch (error) {
                    console.error('❌ Error iniciando sesión:', error);
                    reject(error);
                }
            }, this.MOCK_DELAY_MS);
        });
    }

    /**
     * Obtiene la sesión de entrenamiento actual (si existe)
     */
    static getCurrentTrainingSession(): TrainingSession | null {
        try {
            if (typeof window === 'undefined') return null;

            const sessionData = localStorage.getItem(this.STORAGE_KEY);
            if (!sessionData) return null;

            const session: TrainingSession = JSON.parse(sessionData);
            console.log('📱 Sesión recuperada:', session);
            return session;
        } catch (error) {
            console.error('❌ Error recuperando sesión:', error);
            return null;
        }
    }

    /**
     * Guarda el progreso de la sesión actual
     */
    static saveTrainingSession(session: TrainingSession): void {
        try {
            if (typeof window === 'undefined') return;

            localStorage.setItem(this.STORAGE_KEY, JSON.stringify(session));
            console.log('💾 Sesión guardada:', session);
        } catch (error) {
            console.error('❌ Error guardando sesión:', error);
        }
    }

    /**
     * Completa un ejercicio específico
     */
    static async completeExercise(
        sessionId: string,
        exerciseId: number,
        timeSpent: number,
        skipped = false
    ): Promise<TrainingSession> {
        return new Promise((resolve, reject) => {
            setTimeout(() => {
                try {
                    const session = this.getCurrentTrainingSession();
                    if (!session || session.assignmentId !== sessionId) {
                        reject(new Error('Sesión no encontrada'));
                        return;
                    }

                    // Crear resultado del ejercicio
                    const exerciseResult: ExerciseResult = {
                        exerciseId,
                        startedAt: new Date(Date.now() - timeSpent * 1000).toISOString(),
                        completedAt: new Date().toISOString(),
                        timeSpent,
                        skipped
                    };

                    // Actualizar sesión
                    const updatedSession: TrainingSession = {
                        ...session,
                        exerciseResults: [...session.exerciseResults, exerciseResult],
                        currentExerciseIndex: session.currentExerciseIndex + 1,
                        isCompleted: session.currentExerciseIndex + 1 >= session.routine.exercises.length
                    };

                    this.saveTrainingSession(updatedSession);
                    console.log('✅ Ejercicio completado:', exerciseResult);
                    resolve(updatedSession);
                } catch (error) {
                    console.error('❌ Error completando ejercicio:', error);
                    reject(error);
                }
            }, 500); // Más rápido para mejor UX
        });
    }

    /**
     * Completa toda la rutina
     */
    static async completeRoutine(sessionId: string): Promise<boolean> {
        return new Promise((resolve, reject) => {
            setTimeout(() => {
                try {
                    const session = this.getCurrentTrainingSession();
                    if (!session || session.assignmentId !== sessionId) {
                        reject(new Error('Sesión no encontrada'));
                        return;
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
                    this.clearTrainingSession();
                    resolve(true);
                } catch (error) {
                    console.error('❌ Error completando rutina:', error);
                    reject(error);
                }
            }, this.MOCK_DELAY_MS);
        });
    }

    /**
     * 🗑️ GESTIÓN DE SESIONES
     */

    /**
     * Pausa/reanuda la sesión actual
     */
    static pauseTrainingSession(): void {
        const session = this.getCurrentTrainingSession();
        if (session) {
            const updatedSession = { ...session, isPaused: !session.isPaused };
            this.saveTrainingSession(updatedSession);
        }
    }

    /**
     * Limpia la sesión de entrenamiento actual
     */
    static clearTrainingSession(): void {
        try {
            if (typeof window !== 'undefined') {
                localStorage.removeItem(this.STORAGE_KEY);
                console.log('🗑️ Sesión de entrenamiento limpiada');
            }
        } catch (error) {
            console.error('❌ Error limpiando sesión:', error);
        }
    }

    /**
     * 📚 FUNCIONES ADICIONALES PARA FUTURO USO
     */

    /**
     * Obtiene todas las rutinas disponibles
     */
    static async getAllRoutines(): Promise<Routine[]> {
        return new Promise((resolve) => {
            setTimeout(() => {
                resolve(MOCK_ROUTINES);
            }, this.MOCK_DELAY_MS);
        });
    }

    /**
     * Obtiene las asignaciones de un niño en un rango de fechas
     */
    static async getAssignments(
        kidId: string,
        startDate?: string,
        endDate?: string
    ): Promise<RoutineAssignment[]> {
        return new Promise((resolve) => {
            setTimeout(() => {
                let assignments = findAssignmentsByKid(kidId);

                if (startDate && endDate) {
                    assignments = assignments.filter(a =>
                        a.assignedDate >= startDate && a.assignedDate <= endDate
                    );
                }

                resolve(assignments);
            }, this.MOCK_DELAY_MS);
        });
    }

    /**
     * 🔮 PREPARACIÓN PARA API REAL
     * Estas funciones están preparadas para cuando tengamos backend
     */

    /**
     * URL base para API (configurar según entorno)
     */
    private static getApiUrl(): string {
        return process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000/api';
    }

    /**
     * Headers para requests HTTP
     */
    private static getHeaders(): Record<string, string> {
        const headers: Record<string, string> = {
            'Content-Type': 'application/json',
        };

        // Agregar token de autenticación cuando esté disponible
        const token = typeof window !== 'undefined'
            ? localStorage.getItem('jumpingkids-session')
            : null;

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

        return headers;
    }

    /**
     * 🔄 Métodos preparados para migración a API real
     * Actualmente usan mocks, pero tienen la estructura lista
     */

    // static async getTodayRoutineFromAPI(kidId: string): Promise<RoutineAssignment | null> {
    //     const response = await fetch(`${this.getApiUrl()}/assignments/today/${kidId}`, {
    //         headers: this.getHeaders()
    //     });
    //     if (!response.ok) throw new Error('Error fetching today routine');
    //     return response.json();
    // }

    // static async completeExerciseAPI(data: CompleteExerciseRequest): Promise<void> {
    //     const response = await fetch(`${this.getApiUrl()}/exercises/complete`, {
    //         method: 'POST',
    //         headers: this.getHeaders(),
    //         body: JSON.stringify(data)
    //     });
    //     if (!response.ok) throw new Error('Error completing exercise');
    // }

    // static async completeRoutineAPI(data: CompleteRoutineRequest): Promise<void> {
    //     const response = await fetch(`${this.getApiUrl()}/routines/complete`, {
    //         method: 'POST',
    //         headers: this.getHeaders(),
    //         body: JSON.stringify(data)
    //     });
    //     if (!response.ok) throw new Error('Error completing routine');
    // }

    /**
     * 🔧 FUNCIONES PARA CREAR RUTINAS
     */

    /**
     * Crear una nueva rutina con retry logic y verificación de conectividad
     */
    static async createRoutine(routineData: CreateRoutineRequest): Promise<Routine> {
        const config = getApiConfig();

        return new Promise((resolve, reject) => {
            setTimeout(async () => {
                try {
                    if (config.USE_MOCK_DATA) {
                        // Simular respuesta exitosa
                        const mockRoutine: Routine = {
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

                        if (config.ENABLE_API_LOGS) {
                            console.log('🎯 Mock: Rutina creada:', mockRoutine);
                        }

                        resolve(mockRoutine);
                        return;
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

                    resolve(result.data || result);

                } catch (error) {
                    if (config.ENABLE_API_LOGS) {
                        console.error('❌ Error al crear rutina:', error);
                    }
                    reject(error);
                }
            }, config.SIMULATE_NETWORK_DELAY ? config.DELAY_MS : 0);
        });
    }

    /**
     * Validar y transformar datos antes de enviar a la API
     */
    static validateCreateRoutineData(data: CreateRoutineForm): CreateRoutineRequest {
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
    }

    /**
     * Validar que una rutina tenga todos los campos requeridos
     */
    static validateRoutine(routine: Partial<Routine>): routine is Routine {
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
    }
}