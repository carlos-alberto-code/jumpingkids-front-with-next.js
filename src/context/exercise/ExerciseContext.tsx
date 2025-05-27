import React, { createContext, ReactNode, useContext } from 'react';
import { useExercises } from '../../hooks/exercise/useExercises';

type ExerciseContextType = ReturnType<typeof useExercises>;

const ExerciseContext = createContext<ExerciseContextType | null>(null);

export const ExerciseProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const exerciseData = useExercises();

    return (
        <ExerciseContext.Provider value={exerciseData}>
            {children}
        </ExerciseContext.Provider>
    );
};

export const useExerciseContext = () => {
    const context = useContext(ExerciseContext);
    if (!context) {
        throw new Error('useExerciseContext must be used within ExerciseProvider');
    }
    return context;
};
