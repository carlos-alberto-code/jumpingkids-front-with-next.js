// src/services/routine/RoutineService.ts

import { findAssignmentsByKid, findTodayAssignment, MOCK_ROUTINE_ASSIGNMENTS, MOCK_ROUTINES } from "@/constants/routinesMocks";
import { ExerciseResult, Routine, RoutineAssignment, TrainingSession } from "@/types/routines";


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
}