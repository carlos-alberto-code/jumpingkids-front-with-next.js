import { Add as AddIcon, Delete as DeleteIcon } from '@mui/icons-material';
import {
    Box,
    Button,
    Card,
    CardContent,
    FormControl,
    FormControlLabel,
    FormLabel,
    IconButton,
    Radio,
    RadioGroup,
    TextField,
    Typography
} from '@mui/material';
import { TARGET_AUDIENCE_OPTIONS } from '../../constants/exercise';
import { CreateExerciseForm } from '../../types/exercise';

interface AdvancedConfigSectionProps {
    targetAudience: CreateExerciseForm['targetAudience'];
    safetyNotes: string[];
    isPublic: boolean;
    onTargetAudienceChange: (value: CreateExerciseForm['targetAudience']) => void;
    onSafetyNoteChange: (index: number, value: string) => void;
    onAddSafetyNote: () => void;
    onRemoveSafetyNote: (index: number) => void;
    onIsPublicChange: (value: boolean) => void;
}

export const AdvancedConfigSection: React.FC<AdvancedConfigSectionProps> = ({
    targetAudience,
    safetyNotes,
    isPublic,
    onTargetAudienceChange,
    onSafetyNoteChange,
    onAddSafetyNote,
    onRemoveSafetyNote,
    onIsPublicChange
}) => {
    return (
        <Card>
            <CardContent>
                <Typography variant="h6" gutterBottom>
                    ⚙️ Configuraciones Avanzadas
                </Typography>

                <FormControl component="fieldset" sx={{ mb: 3 }}>
                    <FormLabel component="legend">Audiencia objetivo:</FormLabel>
                    <RadioGroup
                        value={targetAudience}
                        onChange={(e) => onTargetAudienceChange(e.target.value as CreateExerciseForm['targetAudience'])}
                    >
                        {TARGET_AUDIENCE_OPTIONS.map((option) => (
                            <FormControlLabel
                                key={option.value}
                                value={option.value}
                                control={<Radio />}
                                label={
                                    <Box>
                                        <Typography variant="body2">{option.label}</Typography>
                                        <Typography variant="caption" color="text.secondary">
                                            {option.description}
                                        </Typography>
                                    </Box>
                                }
                            />
                        ))}
                    </RadioGroup>
                </FormControl>

                {/* Notas de seguridad */}
                <Typography variant="subtitle2" gutterBottom>
                    Notas de seguridad (opcional):
                </Typography>
                {safetyNotes.map((note, index) => (
                    <Box key={index} sx={{ display: 'flex', gap: 1, mb: 2 }}>
                        <TextField
                            fullWidth
                            label={`Nota de seguridad ${index + 1}`}
                            value={note}
                            onChange={(e) => onSafetyNoteChange(index, e.target.value)}
                            placeholder="Ej: Mantener la espalda recta durante el ejercicio"
                            size="small"
                        />
                        {safetyNotes.length > 1 && (
                            <IconButton
                                color="error"
                                onClick={() => onRemoveSafetyNote(index)}
                                size="small"
                            >
                                <DeleteIcon />
                            </IconButton>
                        )}
                    </Box>
                ))}

                <Button
                    variant="outlined"
                    startIcon={<AddIcon />}
                    onClick={onAddSafetyNote}
                    size="small"
                    sx={{ mb: 2 }}
                >
                    Agregar nota de seguridad
                </Button>

                <FormControlLabel
                    control={
                        <Radio
                            checked={isPublic}
                            onChange={(e) => onIsPublicChange(e.target.checked)}
                        />
                    }
                    label="Hacer público (otros tutores podrán usar este ejercicio)"
                />
            </CardContent>
        </Card>
    );
};
