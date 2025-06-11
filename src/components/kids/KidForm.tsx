import {
    Alert,
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    FormControl,
    InputLabel,
    MenuItem,
    Select,
    Stack,
    TextField
} from '@mui/material';
import React from 'react';
import { KidFormData } from '../../types/kids';
import { AgeSelector, AvatarPicker } from '../common';

interface KidFormProps {
    open: boolean;
    formData: KidFormData;
    isEditing: boolean;
    isPremiumUser: boolean;
    onClose: () => void;
    onSave: () => void;
    onChange: (data: Partial<KidFormData>) => void;
}

export const KidForm: React.FC<KidFormProps> = ({
    open,
    formData,
    isEditing,
    isPremiumUser,
    onClose,
    onSave,
    onChange,
}) => {
    const title = isEditing ? '✏️ Editar Hijo' : '👶 Agregar Nuevo Hijo';
    const saveLabel = isEditing ? 'Guardar Cambios' : 'Agregar Hijo';

    return (
        <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
            <DialogTitle>{title}</DialogTitle>
            <DialogContent>
                <Stack spacing={3} sx={{ mt: 1 }}>
                    <TextField
                        fullWidth
                        label="Nombre completo"
                        value={formData.name}
                        onChange={(e) => onChange({ name: e.target.value })}
                    />

                    <AgeSelector
                        value={formData.age}
                        onChange={(age: number) => onChange({ age })}
                    />

                    <AvatarPicker
                        value={formData.avatar}
                        onChange={(avatar: string) => onChange({ avatar })}
                    />

                    <TextField
                        fullWidth
                        label="Horario preferido"
                        type="time"
                        value={formData.preferredTime}
                        onChange={(e) => onChange({ preferredTime: e.target.value })}
                        InputLabelProps={{ shrink: true }}
                    />

                    <FormControl fullWidth>
                        <InputLabel>Máximo ejercicios por día</InputLabel>
                        <Select
                            value={formData.maxDailyExercises}
                            label="Máximo ejercicios por día"
                            onChange={(e) => onChange({ maxDailyExercises: Number(e.target.value) })}
                        >
                            {[3, 4, 5, 6, 7, 8].map((num) => (
                                <MenuItem key={num} value={num}>
                                    {num} ejercicio{num > 1 ? 's' : ''}
                                </MenuItem>
                            ))}
                        </Select>
                    </FormControl>

                    <FormControl fullWidth>
                        <InputLabel>Nivel de dificultad</InputLabel>
                        <Select
                            value={formData.difficulty}
                            label="Nivel de dificultad"
                            onChange={(e) => onChange({ difficulty: e.target.value as any })}
                            disabled={!isPremiumUser}
                        >
                            <MenuItem value="Principiante">Principiante</MenuItem>
                            <MenuItem value="Intermedio">Intermedio</MenuItem>
                            <MenuItem value="Avanzado">Avanzado</MenuItem>
                        </Select>
                    </FormControl>

                    {!isPremiumUser && (
                        <Alert severity="info">
                            Las configuraciones individuales están disponibles con la suscripción Premium
                        </Alert>
                    )}
                </Stack>
            </DialogContent>
            <DialogActions>
                <Button onClick={onClose}>Cancelar</Button>
                <Button
                    onClick={onSave}
                    variant="contained"
                    disabled={!formData.name.trim()}
                >
                    {saveLabel}
                </Button>
            </DialogActions>
        </Dialog>
    );
};
