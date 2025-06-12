// Barrel exports para servicios de rutinas
export {
    // Legacy class (deprecated)
    RoutineService, clearTrainingSession, completeExercise,
    completeRoutine,
    createRoutine,
    // Data Fetching
    getAllRoutines,
    getAssignments,
    // Session Management
    getCurrentTrainingSession,
    // Modern functions - Core Training
    getTodayRoutine, pauseTrainingSession, saveTrainingSession, startTrainingSession,
    // Validation
    validateCreateRoutineData,
    validateRoutine
} from './RoutineService';

