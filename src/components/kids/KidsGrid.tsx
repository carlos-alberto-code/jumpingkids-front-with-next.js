import { Grid } from '@mui/material';
import React from 'react';
import { Kid } from '../../types/kids';
import { AddKidButton } from './AddKidButton';
import { KidCard } from './KidCard';

interface KidsGridProps {
    kids: Kid[];
    isPremiumUser: boolean;
    canAddMore: boolean;
    maxKids: number;
    onEditKid: (kid: Kid) => void;
    onDeleteKid: (kid: Kid) => void;
    onAddKid: () => void;
}

export const KidsGrid: React.FC<KidsGridProps> = ({
    kids,
    isPremiumUser,
    canAddMore,
    maxKids,
    onEditKid,
    onDeleteKid,
    onAddKid,
}) => {
    return (
        <Grid container spacing={3} sx={{ mb: 4 }}>
            {kids.map((kid) => (
                <Grid size={{ xs: 12, sm: 6, md: isPremiumUser ? 4 : 6 }} key={kid.id}>
                    <KidCard
                        kid={kid}
                        isPremiumUser={isPremiumUser}
                        onEdit={onEditKid}
                        onDelete={onDeleteKid}
                        isOnlyKid={kids.length === 1}
                    />
                </Grid>
            ))}

            {canAddMore && (
                <Grid size={{ xs: 12, sm: 6, md: isPremiumUser ? 4 : 6 }}>
                    <AddKidButton maxKids={maxKids} onAdd={onAddKid} />
                </Grid>
            )}
        </Grid>
    );
};
