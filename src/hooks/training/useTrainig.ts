// src/hooks/training/useTraining.ts
import { useCallback, useEffect, useRef, useState } from 'react';
import {
    clearTrainingSession,
    completeExercise as completeExerciseService,
    completeRoutine as completeRoutineService,
    getCurrentTrainingSession,
    getTodayRoutine,
    pauseTrainingSession,
    startTrainingSession
} from '../../services/routine/RoutineService';
import { RoutineAssignment, TrainingSession } from '../../types/routines';

export const useTraining = (kidId: string) => {
    const [todayRoutine, setTodayRoutine] = useState<RoutineAssignment | null>(null);
    const [currentSession, setCurrentSession] = useState<TrainingSession | null>(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    // Cargar rutina del día
    const loadTodayRoutine = useCallback(async () => {
        if (!kidId) return;

        setLoading(true);
        setError(null);

        try {
            const routine = await getTodayRoutine(kidId);
            setTodayRoutine(routine);
            console.log('📅 Rutina del día cargada:', routine);
        } catch (err) {
            const errorMessage = err instanceof Error ? err.message : 'Error al cargar rutina';
            setError(errorMessage);
            console.error('❌ Error cargando rutina del día:', err);
        } finally {
            setLoading(false);
        }
    }, [kidId]);

    // Iniciar sesión de entrenamiento
    const startTraining = useCallback(async (assignmentId: string) => {
        setLoading(true);
        setError(null);

        try {
            const session = await startTrainingSession(assignmentId);
            setCurrentSession(session);
            console.log('🏃‍♀️ Entrenamiento iniciado:', session);
            return session;
        } catch (err) {
            const errorMessage = err instanceof Error ? err.message : 'Error al iniciar entrenamiento';
            setError(errorMessage);
            console.error('❌ Error iniciando entrenamiento:', err);
            throw err;
        } finally {
            setLoading(false);
        }
    }, []);

    // Completar ejercicio
    const completeExercise = useCallback(async (
        exerciseId: number,
        timeSpent: number,
        skipped = false
    ) => {
        if (!currentSession) {
            throw new Error('No hay sesión activa');
        }

        setLoading(true);
        setError(null);

        try {
            const updatedSession = await completeExerciseService(
                currentSession.assignmentId,
                exerciseId,
                timeSpent,
                skipped
            );
            setCurrentSession(updatedSession);
            console.log('✅ Ejercicio completado:', { exerciseId, timeSpent, skipped });
            return updatedSession;
        } catch (err) {
            const errorMessage = err instanceof Error ? err.message : 'Error al completar ejercicio';
            setError(errorMessage);
            console.error('❌ Error completando ejercicio:', err);
            throw err;
        } finally {
            setLoading(false);
        }
    }, [currentSession]);

    // Completar rutina completa
    const completeRoutine = useCallback(async () => {
        if (!currentSession) {
            throw new Error('No hay sesión activa');
        }

        setLoading(true);
        setError(null);

        try {
            await completeRoutineService(currentSession.assignmentId);
            setCurrentSession(null);
            // Recargar rutina del día para ver el cambio de estado
            await loadTodayRoutine();
            console.log('🎉 ¡Rutina completada exitosamente!');
            return true;
        } catch (err) {
            const errorMessage = err instanceof Error ? err.message : 'Error al completar rutina';
            setError(errorMessage);
            console.error('❌ Error completando rutina:', err);
            throw err;
        } finally {
            setLoading(false);
        }
    }, [currentSession, loadTodayRoutine]);

    // Pausar/reanudar entrenamiento
    const togglePause = useCallback(() => {
        if (currentSession) {
            pauseTrainingSession();
            setCurrentSession(prev => prev ? { ...prev, isPaused: !prev.isPaused } : null);
        }
    }, [currentSession]);

    // Cancelar entrenamiento
    const cancelTraining = useCallback(() => {
        clearTrainingSession();
        setCurrentSession(null);
        console.log('❌ Entrenamiento cancelado');
    }, []);

    // Recuperar sesión existente al cargar
    const checkExistingSession = useCallback(() => {
        const existingSession = getCurrentTrainingSession();
        if (existingSession && !existingSession.isCompleted) {
            setCurrentSession(existingSession);
            console.log('🔄 Sesión existente recuperada:', existingSession);
        }
    }, []);

    // Limpiar errores
    const clearError = useCallback(() => {
        setError(null);
    }, []);

    // Efecto para cargar datos iniciales
    useEffect(() => {
        loadTodayRoutine();
        checkExistingSession();
    }, [loadTodayRoutine, checkExistingSession]);

    return {
        // Estado
        todayRoutine,
        currentSession,
        loading,
        error,

        // Estado derivado
        hasRoutineToday: !!todayRoutine,
        isTraining: !!currentSession,
        isCompleted: currentSession?.isCompleted || false,
        currentExercise: currentSession
            ? currentSession.routine.exercises[currentSession.currentExerciseIndex]
            : null,
        progress: currentSession
            ? {
                current: currentSession.currentExerciseIndex + 1,
                total: currentSession.routine.exercises.length,
                percentage: Math.round(((currentSession.currentExerciseIndex + 1) / currentSession.routine.exercises.length) * 100)
            }
            : null,

        // Acciones
        startTraining,
        completeExercise,
        completeRoutine,
        togglePause,
        cancelTraining,
        loadTodayRoutine,
        clearError
    };
};

// Hook useTimer separado
export const useTimer = (initialTime = 0, autoStart = false) => {
    const [time, setTime] = useState(initialTime);
    const [isRunning, setIsRunning] = useState(autoStart);
    const [isPaused, setIsPaused] = useState(false);
    const intervalRef = useRef<NodeJS.Timeout | null>(null);
    const startTimeRef = useRef<number>(Date.now());

    // Iniciar timer
    const start = useCallback(() => {
        if (!isRunning) {
            startTimeRef.current = Date.now() - time * 1000;
            setIsRunning(true);
            setIsPaused(false);
        }
    }, [isRunning, time]);

    // Pausar timer
    const pause = useCallback(() => {
        setIsPaused(true);
        setIsRunning(false);
    }, []);

    // Reanudar timer
    const resume = useCallback(() => {
        if (isPaused) {
            startTimeRef.current = Date.now() - time * 1000;
            setIsRunning(true);
            setIsPaused(false);
        }
    }, [isPaused, time]);

    // Detener y resetear timer
    const stop = useCallback(() => {
        setIsRunning(false);
        setIsPaused(false);
        setTime(0);
    }, []);

    // Resetear a tiempo inicial
    const reset = useCallback((newTime = initialTime) => {
        setIsRunning(false);
        setIsPaused(false);
        setTime(newTime);
        startTimeRef.current = Date.now();
    }, [initialTime]);

    // Toggle play/pause
    const toggle = useCallback(() => {
        if (isRunning) {
            pause();
        } else if (isPaused) {
            resume();
        } else {
            start();
        }
    }, [isRunning, isPaused, start, pause, resume]);

    // Efecto para manejar el intervalo
    useEffect(() => {
        if (isRunning) {
            intervalRef.current = setInterval(() => {
                const now = Date.now();
                const elapsed = Math.floor((now - startTimeRef.current) / 1000);
                setTime(elapsed);
            }, 100); // Actualizar cada 100ms para mayor suavidad
        } else {
            if (intervalRef.current) {
                clearInterval(intervalRef.current);
                intervalRef.current = null;
            }
        }

        return () => {
            if (intervalRef.current) {
                clearInterval(intervalRef.current);
            }
        };
    }, [isRunning]);

    // Formatear tiempo para display
    const formatTime = useCallback((seconds: number) => {
        const mins = Math.floor(seconds / 60);
        const secs = seconds % 60;
        return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
    }, []);

    return {
        time,
        isRunning,
        isPaused,
        formattedTime: formatTime(time),
        start,
        pause,
        resume,
        stop,
        reset,
        toggle
    };
};