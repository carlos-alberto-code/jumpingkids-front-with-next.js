import {
    AccessTime,
    Add as AddIcon,
    Favorite,
    FavoriteBorder,
    FitnessCenter,
    LocalFireDepartment,
    Star as StarIcon,
} from '@mui/icons-material';
import {
    Box,
    Card,
    CardContent,
    Chip,
    IconButton,
    Typography,
    useTheme,
} from '@mui/material';
import React, { memo, useState } from 'react';
import { usePermissionCheck } from '../../hooks/auth/useUserPermissions';
import { Exercise } from '../../types/exercise';
import PermissionGate from '../auth/PermissionGate';

interface ExerciseCardProps {
    exercise: Exercise;
    onToggleFavorite: (exerciseId: number) => void;
    onCardClick?: (exercise: Exercise) => void;
}

const ExerciseCard: React.FC<ExerciseCardProps> = memo(({
    exercise,
    onToggleFavorite,
    onCardClick,
}) => {
    const theme = useTheme();
    const [hovered, setHovered] = useState(false);
    const { canAccessPremiumFeatures, isPremiumUser } = usePermissionCheck();

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
                border: `1px solid ${hovered ? theme.vars?.palette.grey[300] || theme.palette.grey[300] : theme.vars?.palette.grey[200] || theme.palette.grey[200]}`,
                '&:hover': {
                    '& .exercise-image': {
                        transform: 'scale(1.05)',
                    },
                },
                borderRadius: "18px",
                minWidth: { xs: 320, sm: 400 }, // Responsivo: 320px en móvil, 400px en pantallas más grandes
                minHeight: 165,
                maxHeight: 165,
                display: 'flex',
                flexDirection: 'column',
                position: 'relative', // Para posicionar el chip de premium
            }}
            onMouseEnter={() => setHovered(true)}
            onMouseLeave={() => setHovered(false)}
            onClick={handleCardClick}
        >
            {/* Indicador de contenido premium */}
            {!isPremiumUser && exercise.categories.includes('Premium') && (
                <Chip
                    icon={<StarIcon />}
                    label="Premium"
                    size="small"
                    color="warning"
                    sx={{
                        position: 'absolute',
                        top: 8,
                        right: 8,
                        zIndex: 1,
                        fontSize: '0.7rem',
                        height: 24,
                    }}
                />
            )}
            <CardContent sx={{
                p: 2,
                display: 'flex',
                flexDirection: 'column',
                height: '100%',
            }}>
                <Box sx={{
                    display: 'flex',
                    alignItems: 'center',
                    height: '100%',
                }}>
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
                                borderRadius: theme.vars?.shape?.borderRadius || theme.shape.borderRadius,
                                backgroundColor: theme.vars?.palette.grey[100] || theme.palette.grey[100],
                                transition: theme.transitions.create('transform', {
                                    duration: theme.transitions.duration.short,
                                }),
                            }}
                        />
                    </Box>

                    {/* Información del ejercicio - Centro */}
                    <Box sx={{
                        flex: 1,
                        minWidth: 0,
                        display: 'flex',
                        flexDirection: 'column',
                        height: '100%',
                        justifyContent: 'flex-start', // 🔄 CAMBIAR de space-between a flex-start
                        py: 0.5, // ✨ AÑADIR - Padding vertical
                    }}>
                        {/* Título */}
                        <Typography
                            variant="h6"
                            component="h3"
                            sx={{
                                fontWeight: 600,
                                mb: 0.75,
                                color: theme.vars?.palette.text.primary || theme.palette.text.primary,
                                overflow: 'hidden',
                                textOverflow: 'ellipsis',
                                whiteSpace: 'nowrap',
                                fontSize: '1rem',
                                lineHeight: 1.2,
                            }}
                        >
                            {exercise.title}
                        </Typography>

                        {/* Categorías */}
                        <Box sx={{
                            display: 'flex',
                            flexWrap: 'wrap',
                            gap: 0.5,
                            mb: 1,
                            minHeight: 28,
                            alignItems: 'flex-start'
                        }}>
                            {exercise.categories.map((category: string, index: number) => (
                                <Chip
                                    key={index}
                                    label={category}
                                    size="small"
                                    variant="outlined"
                                    sx={{
                                        fontSize: '0.7rem',
                                        height: 24,
                                        borderColor: theme.vars?.palette.primary.main || theme.palette.primary.main,
                                        color: theme.vars?.palette.primary.main || theme.palette.primary.main,
                                        backgroundColor: `color-mix(in srgb, ${theme.vars?.palette.primary.main || theme.palette.primary.main} 5%, transparent)`,
                                        borderRadius: '6px',
                                    }}
                                />
                            ))}
                        </Box>

                        <Box sx={{
                            display: 'flex',
                            alignItems: 'center',
                            gap: 1.5,
                            mb: 1,
                            flexWrap: 'wrap'
                        }}>
                            {/* Duración */}
                            <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                                <AccessTime
                                    sx={{
                                        fontSize: 14,
                                        color: theme.vars?.palette.text.secondary || theme.palette.text.secondary,
                                    }}
                                />
                                <Typography
                                    variant="body2"
                                    sx={{ color: theme.vars?.palette.text.secondary || theme.palette.text.secondary }}
                                >
                                    {exercise.duration} minutos
                                </Typography>
                            </Box>

                            {/* Calorías */}
                            <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                                <LocalFireDepartment
                                    sx={{
                                        fontSize: 14,
                                        color: theme.vars?.palette.warning.main || theme.palette.warning.main,
                                    }}
                                />
                                <Typography
                                    variant="body2"
                                    sx={{ color: theme.vars?.palette.text.secondary || theme.palette.text.secondary }}
                                >
                                    {exercise.calories} cal
                                </Typography>
                            </Box>

                            {/* Dificultad */}
                            <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                                <FitnessCenter
                                    sx={{
                                        fontSize: 14,
                                        color: theme.vars?.palette.text.secondary || theme.palette.text.secondary,
                                    }}
                                />
                                <Chip
                                    label={exercise.difficulty}
                                    size="small"
                                    sx={[
                                        {
                                            fontSize: '0.7rem',
                                            height: 20,
                                            borderRadius: '6px',
                                            fontWeight: 500,
                                        },
                                        exercise.difficulty === 'Principiante' && {
                                            backgroundColor: theme.vars?.palette.success.main || theme.palette.success.main,
                                            color: theme.vars?.palette.success.contrastText || theme.palette.success.contrastText,
                                        },
                                        exercise.difficulty === 'Intermedio' && {
                                            backgroundColor: theme.vars?.palette.warning.main || theme.palette.warning.main,
                                            color: theme.vars?.palette.warning.contrastText || theme.palette.warning.contrastText,
                                        },
                                        exercise.difficulty === 'Avanzado' && {
                                            backgroundColor: theme.vars?.palette.error.main || theme.palette.error.main,
                                            color: theme.vars?.palette.error.contrastText || theme.palette.error.contrastText,
                                        },
                                        theme.applyStyles('dark', {
                                            backgroundColor: exercise.difficulty === 'Principiante'
                                                ? theme.palette.exerciseDifficulty.beginner
                                                : exercise.difficulty === 'Intermedio'
                                                    ? theme.palette.exerciseDifficulty.intermediate
                                                    : theme.palette.exerciseDifficulty.advanced,
                                        }),
                                    ]}
                                />
                            </Box>
                        </Box>
                    </Box>

                    {/* Botones de acción - Derecha (centrado verticalmente) */}
                    <Box sx={{
                        flexShrink: 0,
                        ml: 2,
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        gap: 0.5
                    }}>
                        {/* Botón de favoritos */}
                        <IconButton
                            onClick={handleFavoriteClick}
                            sx={[
                                {
                                    p: 1.2,
                                    transition: theme.transitions.create(['transform', 'background-color'], {
                                        duration: theme.transitions.duration.short,
                                    }),
                                },
                                {
                                    '&:hover': {
                                        backgroundColor: `color-mix(in srgb, ${theme.vars?.palette.grey[500] || theme.palette.grey[500]} 8%, transparent)`,
                                        transform: 'scale(1.15)',
                                    },
                                },
                            ]}
                            aria-label={exercise.isFavorite ? 'Quitar de favoritos' : 'Agregar a favoritos'}
                        >
                            {exercise.isFavorite ? (
                                <Favorite sx={{
                                    color: theme.vars?.palette.error.main || theme.palette.error.main,
                                    fontSize: 24
                                }} />
                            ) : (
                                <FavoriteBorder
                                    sx={{
                                        color: theme.vars?.palette.text.secondary || theme.palette.text.secondary,
                                        fontSize: 24,
                                        '&:hover': {
                                            color: theme.vars?.palette.error.main || theme.palette.error.main,
                                        },
                                    }}
                                />
                            )}
                        </IconButton>

                        {/* Botón crear similar - solo tutores premium */}
                        <PermissionGate permission="canCreateCustomExercises">
                            <IconButton
                                size="small"
                                onClick={(e) => {
                                    e.stopPropagation();
                                    // Lógica para crear ejercicio similar
                                    console.log('Crear ejercicio basado en:', exercise.title);
                                }}
                                sx={{
                                    p: 1,
                                    transition: theme.transitions.create(['transform', 'background-color'], {
                                        duration: theme.transitions.duration.short,
                                    }),
                                    '&:hover': {
                                        backgroundColor: `color-mix(in srgb, ${theme.vars?.palette.primary.main || theme.palette.primary.main} 8%, transparent)`,
                                        transform: 'scale(1.1)',
                                    },
                                }}
                                aria-label="Crear ejercicio similar"
                            >
                                <AddIcon
                                    sx={{
                                        color: theme.vars?.palette.primary.main || theme.palette.primary.main,
                                        fontSize: 20
                                    }}
                                />
                            </IconButton>
                        </PermissionGate>
                    </Box>
                </Box>
            </CardContent>
        </Card>
    );
});

ExerciseCard.displayName = 'ExerciseCard';

export default ExerciseCard;