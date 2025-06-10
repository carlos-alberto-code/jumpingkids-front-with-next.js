import { Box, Card, CardContent, Stack, Typography } from '@mui/material';

export interface PremiumInsight {
    label: string;
    value: string;
    color?: 'success' | 'primary' | 'info' | 'warning' | 'error';
}

export interface PremiumUpgradePromptProps {
    insights: PremiumInsight[];
    title?: string;
}

export default function PremiumUpgradePrompt({
    insights,
    title = '📊 Insights Premium',
}: PremiumUpgradePromptProps) {
    return (
        <Card>
            <CardContent>
                <Typography variant="h6" fontWeight="bold" gutterBottom>
                    {title}
                </Typography>

                <Stack spacing={1}>
                    {insights.map((insight, index) => (
                        <Box key={index}>
                            <Typography variant="body2" color="text.secondary">
                                {insight.label}
                            </Typography>
                            <Typography
                                variant="body1"
                                fontWeight="bold"
                                color={insight.color ? `${insight.color}.main` : 'text.primary'}
                            >
                                {insight.value}
                            </Typography>
                        </Box>
                    ))}
                </Stack>
            </CardContent>
        </Card>
    );
}
