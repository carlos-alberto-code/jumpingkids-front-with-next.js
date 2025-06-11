import { CloudUpload as UploadIcon } from '@mui/icons-material';
import {
    Box,
    Button,
    Card,
    CardContent,
    TextField,
    Typography
} from '@mui/material';

interface MediaSectionProps {
    gifUrl: string;
    gifUrlError?: string;
    onGifUrlChange: (url: string) => void;
}

export const MediaSection: React.FC<MediaSectionProps> = ({
    gifUrl,
    gifUrlError,
    onGifUrlChange
}) => {
    return (
        <Card>
            <CardContent>
                <Typography variant="h6" gutterBottom>
                    🎬 Media y Demostración
                </Typography>

                <TextField
                    fullWidth
                    label="URL del GIF o imagen"
                    value={gifUrl}
                    onChange={(e) => onGifUrlChange(e.target.value)}
                    error={!!gifUrlError}
                    helperText={gifUrlError || 'Pega la URL de un GIF que muestre el ejercicio'}
                    placeholder="https://ejemplo.com/mi-ejercicio.gif"
                    sx={{ mb: 2 }}
                />

                <Button
                    variant="outlined"
                    startIcon={<UploadIcon />}
                    disabled
                    sx={{ mb: 2 }}
                >
                    Subir archivo (próximamente)
                </Button>

                {gifUrl && (
                    <Box sx={{ textAlign: 'center', mt: 2 }}>
                        <Typography variant="subtitle2" gutterBottom>
                            Vista previa:
                        </Typography>
                        <Box
                            component="img"
                            src={gifUrl}
                            alt="Vista previa del ejercicio"
                            sx={{
                                maxWidth: '100%',
                                maxHeight: 200,
                                borderRadius: 2,
                                boxShadow: 2
                            }}
                            onError={(e) => {
                                e.currentTarget.style.display = 'none';
                            }}
                        />
                    </Box>
                )}
            </CardContent>
        </Card>
    );
};
