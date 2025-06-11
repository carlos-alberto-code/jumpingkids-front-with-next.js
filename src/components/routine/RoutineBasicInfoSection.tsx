import {
    Card,
    CardContent,
    Checkbox,
    FormControl,
    FormControlLabel,
    Radio,
    RadioGroup,
    Stack,
    TextField,
    Typography
} from '@mui/material';
import { CreateRoutineForm } from '../../types/routines';

interface RoutineBasicInfoSectionProps {
    formData: CreateRoutineForm;
    formErrors: Record<string, string>;
    onInputChange: (field: keyof CreateRoutineForm, value: any) => void;
}

export const RoutineBasicInfoSection: React.FC<RoutineBasicInfoSectionProps> = ({
    formData,
    formErrors,
    onInputChange
}) => {
    return (
        <Card sx={{ mb: 3 }}>
            <CardContent>
                <Typography variant="h6" gutterBottom>
                    📝 Información de la Rutina
                </Typography>

                <Stack spacing={3}>
                    <TextField
                        fullWidth
                        label="Nombre de la rutina"
                        value={formData.title}
                        onChange={(e) => onInputChange('title', e.target.value)}
                        error={!!formErrors.title}
                        helperText={formErrors.title || 'Ej: "Aventura Matutina" o "Entrenamiento Superhéroe"'}
                        placeholder="Escribe un nombre atractivo"
                    />

                    <TextField
                        fullWidth
                        multiline
                        rows={3}
                        label="Descripción"
                        value={formData.description}
                        onChange={(e) => onInputChange('description', e.target.value)}
                        error={!!formErrors.description}
                        helperText={formErrors.description || 'Describe el objetivo y beneficios de la rutina'}
                        placeholder="Explica qué conseguirán los niños con esta rutina..."
                    />

                    <FormControl component="fieldset">
                        <Typography variant="subtitle2" gutterBottom>
                            Edad objetivo:
                        </Typography>
                        <RadioGroup
                            value={formData.targetAge}
                            onChange={(e) => onInputChange('targetAge', e.target.value)}
                            row
                        >
                            <FormControlLabel value="kids" control={<Radio />} label="5-12 años" />
                            <FormControlLabel value="teens" control={<Radio />} label="13-17 años" />
                            <FormControlLabel value="all" control={<Radio />} label="Todas las edades" />
                        </RadioGroup>
                    </FormControl>

                    <TextField
                        type="number"
                        label="Descanso entre ejercicios (segundos)"
                        value={formData.restTime}
                        onChange={(e) => onInputChange('restTime', Number(e.target.value))}
                        inputProps={{ min: 10, max: 120 }}
                        helperText="Tiempo de descanso recomendado entre ejercicios"
                    />

                    <FormControlLabel
                        control={
                            <Checkbox
                                checked={formData.isPublic}
                                onChange={(e) => onInputChange('isPublic', e.target.checked)}
                            />
                        }
                        label="Hacer pública (otros tutores podrán usar esta rutina)"
                    />
                </Stack>
            </CardContent>
        </Card>
    );
};
