import { Box, Card, CardContent, Chip, Typography } from '@mui/material';
import { FC } from 'react';

interface ExerciseCardProps {
    title: string;
    description: string;
    tags: string[];
}

const ExerciseCard: FC<ExerciseCardProps> = ({
    title,
    description,
    tags = [],
}) => {
    return (
        <Card sx={{ mt: 3, maxWidth: 900, boxShadow: 3, transition: '0.2s', '&:hover': { boxShadow: 6 }, borderRadius: '12px' }}>
            <CardContent>
                <Typography variant="h6" component="div" sx={{ fontWeight: 600, color: 'primary.main' }}>
                    {title}
                </Typography>
                <Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap', mt: 2 }}>
                    {tags.map((tag, index) => (
                        <Chip
                            key={index}
                            label={tag}
                            color="secondary"
                            size="small"
                            variant="outlined"
                            sx={{ borderRadius: '6px' }}
                        />
                    ))}
                </Box>
                <Typography variant="body2" color="text.secondary" sx={{ mt: 2 }}>
                    {description}
                </Typography>
            </CardContent>
        </Card>
    );
};

export default ExerciseCard;