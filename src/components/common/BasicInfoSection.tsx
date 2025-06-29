import {
    Card,
    CardContent,
    FormControl,
    Grid,
    InputAdornment,
    InputLabel,
    MenuItem,
    Select,
    TextField,
    Typography
} from '@mui/material';
import { DIFFICULTY_OPTIONS } from '../../constants/exercise';
import { CreateExerciseForm } from '../../types/exercise';

interface BasicInfoSectionProps {
    formData: CreateExerciseForm;
    formErrors: Record<string, string>;
    estimatedCalories: number;
    onInputChange: (field: keyof CreateExerciseForm, value: any) => void;
}

export const BasicInfoSection: React.FC<BasicInfoSectionProps> = ({
    formData,
    formErrors,
    estimatedCalories,
    onInputChange
}) => {
    return (
        <Card>
            <CardContent>
                <Typography variant="h6" gutterBottom>
                    📝 Información Básica
                </Typography>

                <Grid container spacing={3}>
                    <Grid size={{ xs: 12 }}>
                        <TextField
                            fullWidth
                            label="Nombre del ejercicio"
                            value={formData.title}
                            onChange={(e) => onInputChange('title', e.target.value)}
                            error={!!formErrors.title}
                            helperText={formErrors.title || 'Ej: "Saltos de rana divertidos"'}
                            placeholder="Escribe un nombre atractivo para niños"
                        />
                    </Grid>

                    <Grid size={{ xs: 12 }}>
                        <TextField
                            fullWidth
                            multiline
                            rows={3}
                            label="Descripción"
                            value={formData.description}
                            onChange={(e) => onInputChange('description', e.target.value)}
                            error={!!formErrors.description}
                            helperText={formErrors.description || 'Describe el ejercicio de manera simple y motivadora'}
                            placeholder="Explica qué hace el ejercicio y por qué es divertido..."
                        />
                    </Grid>

                    <Grid size={{ xs: 12, sm: 4 }}>
                        <TextField
                            fullWidth
                            type="number"
                            label="Duración (minutos)"
                            value={formData.duration}
                            onChange={(e) => {
                                const value = e.target.value;
                                // Solo permitir números enteros
                                if (value === '' || /^\d+$/.test(value)) {
                                    onInputChange('duration', value === '' ? 0 : parseInt(value, 10));
                                }
                            }}
                            onKeyDown={(e) => {
                                // Prevenir entrada de punto decimal y caracteres no numéricos
                                if (e.key === '.' || e.key === ',' || e.key === 'e' || e.key === 'E' || e.key === '+' || e.key === '-') {
                                    e.preventDefault();
                                }
                            }}
                            error={!!formErrors.duration}
                            helperText={formErrors.duration}
                            inputProps={{
                                min: 1,
                                max: 60,
                                step: 1
                            }}
                            sx={{
                                '& input[type="number"]::-webkit-outer-spin-button, & input[type="number"]::-webkit-inner-spin-button': {
                                    WebkitAppearance: 'auto',
                                    height: '30px',
                                    opacity: 1
                                },
                                '& input[type="number"]': {
                                    MozAppearance: 'textfield'
                                }
                            }}
                        />
                    </Grid>

                    <Grid size={{ xs: 12, sm: 4 }}>
                        <TextField
                            fullWidth
                            type="number"
                            label="Calorías estimadas"
                            value={formData.calories}
                            onChange={(e) => {
                                const value = e.target.value;
                                // Solo permitir números enteros
                                if (value === '' || /^\d+$/.test(value)) {
                                    onInputChange('calories', value === '' ? 0 : parseInt(value, 10));
                                }
                            }}
                            onKeyDown={(e) => {
                                // Prevenir entrada de punto decimal y caracteres no numéricos
                                if (e.key === '.' || e.key === ',' || e.key === 'e' || e.key === 'E' || e.key === '+' || e.key === '-') {
                                    e.preventDefault();
                                }
                            }}
                            slotProps={{
                                input: {
                                    endAdornment: (
                                        <InputAdornment position="end">
                                            <Typography variant="caption" color="text.secondary">
                                                Est: {estimatedCalories}
                                            </Typography>
                                        </InputAdornment>
                                    ),
                                },
                            }}
                            helperText="Ajusta según la intensidad"
                            inputProps={{
                                min: 1,
                                max: 500,
                                step: 1
                            }}
                            sx={{
                                '& input[type="number"]::-webkit-outer-spin-button, & input[type="number"]::-webkit-inner-spin-button': {
                                    WebkitAppearance: 'auto',
                                    height: '30px',
                                    opacity: 1
                                },
                                '& input[type="number"]': {
                                    MozAppearance: 'textfield'
                                }
                            }}
                        />
                    </Grid>

                    <Grid size={{ xs: 12, sm: 4 }}>
                        <FormControl fullWidth error={!!formErrors.difficulty}>
                            <InputLabel>Dificultad</InputLabel>
                            <Select
                                value={formData.difficulty}
                                label="Dificultad"
                                onChange={(e) => onInputChange('difficulty', e.target.value)}
                            >
                                {DIFFICULTY_OPTIONS.map((difficulty) => (
                                    <MenuItem key={difficulty} value={difficulty}>
                                        {difficulty}
                                    </MenuItem>
                                ))}
                            </Select>
                        </FormControl>
                    </Grid>
                </Grid>
            </CardContent>
        </Card>
    );
};
