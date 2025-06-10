import {
    BarChart as BarChartIcon,
    Person as PersonIcon,
    Timeline as TimelineIcon
} from '@mui/icons-material';
import { Alert, Box, Card, CardContent, Grid, Tab, Tabs, Typography } from '@mui/material';
import React, { useState } from 'react';
import type { KidAnalytics, OverallMetrics } from '../../types/analytics';
import { ConsistencyRanking } from './ConsistencyRanking';
import { KidAnalyticsCard } from './KidAnalyticsCard';
import { MonthlyTrends } from './MonthlyTrends';
import { TimeExercisedRanking } from './TimeExercisedRanking';

interface AnalyticsTabsProps {
    kidsData: KidAnalytics[];
    selectedKid: string;
    overallMetrics: OverallMetrics;
}

export function AnalyticsTabs({ kidsData, selectedKid, overallMetrics }: AnalyticsTabsProps) {
    const [currentTab, setCurrentTab] = useState(0);
    const selectedKidData = selectedKid === 'all' ? null : kidsData.find(k => k.id === selectedKid);

    const handleTabChange = (event: React.SyntheticEvent, newValue: number) => {
        setCurrentTab(newValue);
    };

    return (
        <Card>
            <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                <Tabs value={currentTab} onChange={handleTabChange}>
                    <Tab
                        icon={<PersonIcon />}
                        label={`Análisis Individual (${kidsData.length})`}
                        iconPosition="start"
                    />
                    <Tab
                        icon={<BarChartIcon />}
                        label="Comparativas"
                        iconPosition="start"
                    />
                    <Tab
                        icon={<TimelineIcon />}
                        label="Tendencias"
                        iconPosition="start"
                    />
                </Tabs>
            </Box>

            <CardContent sx={{ p: 3 }}>
                {/* Tab 1: Análisis Individual */}
                {currentTab === 0 && (
                    <Box>
                        {selectedKidData ? (
                            <KidAnalyticsCard kid={selectedKidData} />
                        ) : (
                            <Box>
                                <Typography variant="h6" gutterBottom>
                                    📊 Análisis Detallado por Niño
                                </Typography>
                                {kidsData.map(kid => (
                                    <KidAnalyticsCard key={kid.id} kid={kid} />
                                ))}
                            </Box>
                        )}
                    </Box>
                )}

                {/* Tab 2: Comparativas */}
                {currentTab === 1 && (
                    <Box>
                        <Typography variant="h6" gutterBottom>
                            📈 Comparativas entre Niños
                        </Typography>

                        {kidsData.length > 1 ? (
                            <Grid container spacing={3}>
                                <Grid size={{ xs: 12, md: 6 }}>
                                    <ConsistencyRanking kidsData={kidsData} />
                                </Grid>
                                <Grid size={{ xs: 12, md: 6 }}>
                                    <TimeExercisedRanking kidsData={kidsData} />
                                </Grid>
                            </Grid>
                        ) : (
                            <Alert severity="info">
                                Las comparativas están disponibles cuando gestiones múltiples niños
                            </Alert>
                        )}
                    </Box>
                )}

                {/* Tab 3: Tendencias */}
                {currentTab === 2 && (
                    <MonthlyTrends
                        kidsData={kidsData}
                        overallMetrics={overallMetrics}
                    />
                )}
            </CardContent>
        </Card>
    );
}
