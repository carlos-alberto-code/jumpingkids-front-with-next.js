import {
    AccessTime,
    Favorite,
    FavoriteBorder,
    FitnessCenter,
    LocalFireDepartment,
} from '@mui/icons-material';
import {
    alpha,
    Box,
    Card,
    CardContent,
    Chip,
    IconButton,
    Typography,
    useTheme,
} from '@mui/material';
import React, { memo, useState } from 'react';
import { Exercise } from './types';

interface ExerciseCardProps {
    exercise: Exercise;
    onToggleFavorite: (exerciseId: number) => void;
    onCardClick?: (exercise: Exercise) => void;
}

// Mapeo de dificultad a colores de MUI
const getDifficultyColor = (difficulty: Exercise['difficulty']) => {
    switch (difficulty) {
        case 'Principiante':
            return 'success';
        case 'Intermedio':
            return 'warning';
        case 'Avanzado':
            return 'error';
        default:
            return 'default';
    }
};

const ExerciseCard: React.FC<ExerciseCardProps> = memo(({
    exercise,
    onToggleFavorite,
    onCardClick,
}) => {
    const theme = useTheme();
    const [hovered, setHovered] = useState(false);

    const handleFavoriteClick = (e: React.MouseEvent) => {
        e.stopPropagation();
        onToggleFavorite(exercise.id);
    };

    const handleCardClick = () => {
        onCardClick?.(exercise);
    };

    return (
        <Card
            sx={{
                cursor: onCardClick ? 'pointer' : 'default',
                transition: theme.transitions.create(['transform', 'box-shadow', 'border-color'], {
                    duration: theme.transitions.duration.short,
                }),
                transform: hovered ? 'translateX(4px)' : 'translateX(0)',
                boxShadow: hovered ? theme.shadows[4] : theme.shadows[1],
                border: `1px solid ${hovered ? theme.palette.grey[300] : theme.palette.grey[200]}`,
                '&:hover': {
                    '& .exercise-image': {
                        transform: 'scale(1.05)',
                    },
                },
                borderRadius: "18px",
                minWidth: { xs: 320, sm: 400 } // Responsivo: 320px en móvil, 400px en pantallas más grandes
            }}
            onMouseEnter={() => setHovered(true)}
            onMouseLeave={() => setHovered(false)}
            onClick={handleCardClick}
        >
            <CardContent sx={{ p: 2 }}>
                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                    {/* Imagen/GIF del ejercicio - Izquierda */}
                    <Box
                        sx={{
                            flexShrink: 0,
                            width: 96,
                            height: 96,
                            mr: 2,
                        }}
                    >
                        <Box
                            component="img"
                            src={exercise.gifUrl}
                            alt={exercise.title}
                            className="exercise-image"
                            sx={{
                                width: '100%',
                                height: '100%',
                                objectFit: 'cover',
                                borderRadius: theme.shape.borderRadius,
                                backgroundColor: theme.palette.grey[100],
                                transition: theme.transitions.create('transform', {
                                    duration: theme.transitions.duration.short,
                                }),
                            }}
                        />
                    </Box>

                    {/* Información del ejercicio - Centro */}
                    <Box sx={{ flex: 1, minWidth: 0 }}>
                        {/* Título */}
                        <Typography
                            variant="h6"
                            component="h3"
                            sx={{
                                fontWeight: 600,
                                mb: 1,
                                color: theme.palette.text.primary,
                                overflow: 'hidden',
                                textOverflow: 'ellipsis',
                                whiteSpace: 'nowrap',
                            }}
                        >
                            {exercise.title}
                        </Typography>

                        {/* Categorías */}
                        <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5, mb: 1.5 }}>
                            {exercise.categories.map((category: string, index: number) => (
                                <Chip
                                    key={index}
                                    label={category}
                                    size="small"
                                    variant="outlined"
                                    sx={{
                                        fontSize: '0.7rem',
                                        height: 24,
                                        borderColor: theme.palette.primary.main,
                                        color: theme.palette.primary.main,
                                        backgroundColor: alpha(theme.palette.primary.main, 0.05),
                                        borderRadius: '6px',
                                    }}
                                />
                            ))}
                        </Box>

                        {/* Información en fila: Tiempo, Calorías, Dificultad */}
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 1.5 }}>
                            {/* Duración */}
                            <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                                <AccessTime
                                    sx={{
                                        fontSize: 16,
                                        color: theme.palette.text.secondary,
                                    }}
                                />
                                <Typography
                                    variant="body2"
                                    sx={{ color: theme.palette.text.secondary }}
                                >
                                    {exercise.duration} minutos
                                </Typography>
                            </Box>

                            {/* Calorías */}
                            <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                                <LocalFireDepartment
                                    sx={{
                                        fontSize: 16,
                                        color: theme.palette.warning.main,
                                    }}
                                />
                                <Typography
                                    variant="body2"
                                    sx={{ color: theme.palette.text.secondary }}
                                >
                                    {exercise.calories} cal
                                </Typography>
                            </Box>

                            {/* Dificultad */}
                            <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                                <FitnessCenter
                                    sx={{
                                        fontSize: 16,
                                        color: theme.palette.text.secondary,
                                    }}
                                />
                                <Chip
                                    label={exercise.difficulty}
                                    size="small"
                                    color={getDifficultyColor(exercise.difficulty)}
                                    sx={{
                                        fontSize: '0.7rem',
                                        height: 20,
                                        borderRadius: '6px',
                                    }}
                                />
                            </Box>
                        </Box>

                        {/* Descripción */}
                        <Typography
                            variant="body2"
                            sx={{
                                color: theme.palette.text.secondary,
                                display: '-webkit-box',
                                WebkitLineClamp: 2,
                                WebkitBoxOrient: 'vertical',
                                overflow: 'hidden',
                                lineHeight: 1.4,
                            }}
                        >
                            {exercise.description}
                        </Typography>
                    </Box>

                    {/* Botón de Favorito - Derecha (centrado verticalmente) */}
                    <Box sx={{ flexShrink: 0, ml: 2 }}>
                        <IconButton
                            onClick={handleFavoriteClick}
                            sx={{
                                p: 1.5,
                                transition: theme.transitions.create(['transform', 'background-color'], {
                                    duration: theme.transitions.duration.short,
                                }),
                                '&:hover': {
                                    backgroundColor: alpha(theme.palette.grey[500], 0.04),
                                    transform: 'scale(1.1)',
                                },
                            }}
                            aria-label={exercise.isFavorite ? 'Quitar de favoritos' : 'Agregar a favoritos'}
                        >
                            {exercise.isFavorite ? (
                                <Favorite sx={{ color: theme.palette.error.main, fontSize: 24 }} />
                            ) : (
                                <FavoriteBorder
                                    sx={{
                                        color: theme.palette.text.secondary,
                                        fontSize: 24,
                                        '&:hover': {
                                            color: theme.palette.error.main,
                                        },
                                    }}
                                />
                            )}
                        </IconButton>
                    </Box>
                </Box>
            </CardContent>
        </Card>
    );
});

ExerciseCard.displayName = 'ExerciseCard';

export default ExerciseCard;