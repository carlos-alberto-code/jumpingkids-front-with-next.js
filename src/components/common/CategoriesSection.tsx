import {
    Box,
    Card,
    CardContent,
    Chip,
    Typography
} from '@mui/material';
import { AVAILABLE_CATEGORIES, AVAILABLE_EQUIPMENT } from '../../constants/exercise';

interface CategoriesSectionProps {
    selectedCategories: string[];
    selectedEquipment: string[];
    categoryError?: string;
    onCategoryToggle: (category: string) => void;
    onEquipmentToggle: (equipment: string) => void;
}

export const CategoriesSection: React.FC<CategoriesSectionProps> = ({
    selectedCategories,
    selectedEquipment,
    categoryError,
    onCategoryToggle,
    onEquipmentToggle
}) => {
    return (
        <Card>
            <CardContent>
                <Typography variant="h6" gutterBottom>
                    🎯 Categorías y Equipo
                </Typography>

                <Box sx={{ mb: 3 }}>
                    <Typography variant="subtitle2" gutterBottom>
                        Categorías (selecciona las que apliquen):
                    </Typography>
                    <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
                        {AVAILABLE_CATEGORIES.map((category) => (
                            <Chip
                                key={category}
                                label={category}
                                variant={selectedCategories.includes(category) ? 'filled' : 'outlined'}
                                color={selectedCategories.includes(category) ? 'primary' : 'default'}
                                onClick={() => onCategoryToggle(category)}
                                sx={{ cursor: 'pointer' }}
                            />
                        ))}
                    </Box>
                    {categoryError && (
                        <Typography variant="caption" color="error" sx={{ display: 'block', mt: 1 }}>
                            {categoryError}
                        </Typography>
                    )}
                </Box>

                <Box>
                    <Typography variant="subtitle2" gutterBottom>
                        Equipo necesario:
                    </Typography>
                    <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
                        {AVAILABLE_EQUIPMENT.map((equipment) => (
                            <Chip
                                key={equipment}
                                label={equipment}
                                variant={selectedEquipment.includes(equipment) ? 'filled' : 'outlined'}
                                color={selectedEquipment.includes(equipment) ? 'secondary' : 'default'}
                                onClick={() => onEquipmentToggle(equipment)}
                                sx={{ cursor: 'pointer' }}
                            />
                        ))}
                    </Box>
                </Box>
            </CardContent>
        </Card>
    );
};
