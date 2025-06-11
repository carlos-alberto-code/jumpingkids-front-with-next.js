import { Add as AddIcon, Delete as DeleteIcon } from '@mui/icons-material';
import {
    Box,
    Button,
    Card,
    CardContent,
    IconButton,
    TextField,
    Typography
} from '@mui/material';

interface InstructionsSectionProps {
    instructions: string[];
    instructionsError?: string;
    onInstructionChange: (index: number, value: string) => void;
    onAddInstruction: () => void;
    onRemoveInstruction: (index: number) => void;
}

export const InstructionsSection: React.FC<InstructionsSectionProps> = ({
    instructions,
    instructionsError,
    onInstructionChange,
    onAddInstruction,
    onRemoveInstruction
}) => {
    return (
        <Card>
            <CardContent>
                <Typography variant="h6" gutterBottom>
                    📋 Instrucciones Paso a Paso
                </Typography>

                {instructions.map((instruction, index) => (
                    <Box key={index} sx={{ display: 'flex', gap: 1, mb: 2 }}>
                        <TextField
                            fullWidth
                            label={`Paso ${index + 1}`}
                            value={instruction}
                            onChange={(e) => onInstructionChange(index, e.target.value)}
                            placeholder="Describe este paso de manera clara y simple"
                        />
                        {instructions.length > 1 && (
                            <IconButton
                                color="error"
                                onClick={() => onRemoveInstruction(index)}
                            >
                                <DeleteIcon />
                            </IconButton>
                        )}
                    </Box>
                ))}

                <Button
                    variant="outlined"
                    startIcon={<AddIcon />}
                    onClick={onAddInstruction}
                    size="small"
                >
                    Agregar paso
                </Button>

                {instructionsError && (
                    <Typography variant="caption" color="error" sx={{ display: 'block', mt: 1 }}>
                        {instructionsError}
                    </Typography>
                )}
            </CardContent>
        </Card>
    );
};
