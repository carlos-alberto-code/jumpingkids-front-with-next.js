import { Add as AddIcon } from '@mui/icons-material';
import { Alert, Container, Fab } from '@mui/material';
import { useState } from 'react';
import PermissionGate from '../../src/components/auth/PermissionGate';
import {
    ConsolidatedStats,
    DeleteKidModal,
    KidForm,
    KidsGrid,
    KidsPageHeader,
    PlanInfoAlert
} from '../../src/components/kids';
import { usePermissionCheck } from '../../src/hooks/auth/useUserPermissions';
import { Kid, KidFormData } from '../../src/types/kids';

// 📊 DATOS MOCK DE HIJOS (según suscripción del tutor)
const MOCK_KIDS_FREE: Kid[] = [
    {
        id: 'sofia-001',
        name: 'Sofia García',
        age: 8,
        avatar: '👧',
        birthDate: '2016-03-15',
        preferences: {
            favoriteExercises: ['Jumping Jacks', 'Lagartijas Clásicas'],
            preferredTime: '16:00',
            maxDailyExercises: 5,
            difficulty: 'Principiante'
        },
        stats: {
            totalRoutines: 45,
            thisWeekCompleted: 4,
            thisWeekAssigned: 5,
            currentStreak: 3,
            longestStreak: 8,
            favoriteCategory: 'Cardio',
            totalMinutes: 1200,
            lastActivity: '2024-06-04T16:30:00Z'
        },
        createdAt: '2024-01-15T10:00:00Z'
    }
];

const MOCK_KIDS_PREMIUM: Kid[] = [
    ...MOCK_KIDS_FREE,
    {
        id: 'diego-002',
        name: 'Diego Martínez',
        age: 6,
        avatar: '👦',
        birthDate: '2018-07-22',
        preferences: {
            favoriteExercises: ['Burpees', 'Sentadillas'],
            preferredTime: '15:30',
            maxDailyExercises: 4,
            difficulty: 'Principiante'
        },
        stats: {
            totalRoutines: 32,
            thisWeekCompleted: 3,
            thisWeekAssigned: 4,
            currentStreak: 2,
            longestStreak: 5,
            favoriteCategory: 'Fuerza',
            totalMinutes: 800,
            lastActivity: '2024-06-04T15:45:00Z'
        },
        createdAt: '2024-02-01T14:00:00Z'
    },
    {
        id: 'maria-003',
        name: 'María López',
        age: 10,
        avatar: '👧',
        birthDate: '2014-11-08',
        preferences: {
            favoriteExercises: ['Plancha Isométrica', 'Yoga Saludo al Sol'],
            preferredTime: '17:00',
            maxDailyExercises: 6,
            difficulty: 'Intermedio'
        },
        stats: {
            totalRoutines: 67,
            thisWeekCompleted: 6,
            thisWeekAssigned: 6,
            currentStreak: 7,
            longestStreak: 15,
            favoriteCategory: 'Flexibilidad',
            totalMinutes: 1800,
            lastActivity: '2024-06-04T17:15:00Z'
        },
        createdAt: '2024-01-20T09:00:00Z'
    }
];

export default function MyKidsPage() {
    const { user, isPremiumUser, canManageMultipleKids } = usePermissionCheck();
    const [kids, setKids] = useState<Kid[]>(isPremiumUser ? MOCK_KIDS_PREMIUM : MOCK_KIDS_FREE);
    const [selectedKid, setSelectedKid] = useState<Kid | null>(null);
    const [editModalOpen, setEditModalOpen] = useState(false);
    const [addModalOpen, setAddModalOpen] = useState(false);
    const [deleteConfirmOpen, setDeleteConfirmOpen] = useState(false);
    const [kidToDelete, setKidToDelete] = useState<Kid | null>(null);

    // Límites según suscripción
    const maxKids = isPremiumUser ? 3 : 1;
    const canAddMore = kids.length < maxKids;

    // Form state para agregar/editar
    const [formData, setFormData] = useState<KidFormData>({
        name: '',
        age: 6,
        avatar: '👧',
        preferredTime: '16:00',
        maxDailyExercises: 5,
        difficulty: 'Principiante'
    });

    // Handlers
    const handleEditKid = (kid: Kid) => {
        setSelectedKid(kid);
        setFormData({
            name: kid.name,
            age: kid.age,
            avatar: kid.avatar,
            preferredTime: kid.preferences.preferredTime,
            maxDailyExercises: kid.preferences.maxDailyExercises,
            difficulty: kid.preferences.difficulty
        });
        setEditModalOpen(true);
    };

    const handleAddKid = () => {
        setFormData({
            name: '',
            age: 6,
            avatar: '👧',
            preferredTime: '16:00',
            maxDailyExercises: 5,
            difficulty: 'Principiante'
        });
        setAddModalOpen(true);
    };

    const handleSaveKid = () => {
        if (selectedKid) {
            // Editar hijo existente
            const updatedKid: Kid = {
                ...selectedKid,
                name: formData.name,
                age: formData.age,
                avatar: formData.avatar,
                preferences: {
                    ...selectedKid.preferences,
                    preferredTime: formData.preferredTime,
                    maxDailyExercises: formData.maxDailyExercises,
                    difficulty: formData.difficulty
                }
            };
            setKids(prevKids => prevKids.map(kid => kid.id === selectedKid.id ? updatedKid : kid));
            setEditModalOpen(false);
        } else {
            // Agregar nuevo hijo
            const newKid: Kid = {
                id: `kid-${Date.now()}`,
                name: formData.name,
                age: formData.age,
                avatar: formData.avatar,
                birthDate: new Date(new Date().getFullYear() - formData.age, 0, 1).toISOString(),
                preferences: {
                    favoriteExercises: [],
                    preferredTime: formData.preferredTime,
                    maxDailyExercises: formData.maxDailyExercises,
                    difficulty: formData.difficulty
                },
                stats: {
                    totalRoutines: 0,
                    thisWeekCompleted: 0,
                    thisWeekAssigned: 0,
                    currentStreak: 0,
                    longestStreak: 0,
                    favoriteCategory: 'Cardio',
                    totalMinutes: 0
                },
                createdAt: new Date().toISOString()
            };
            setKids(prevKids => [...prevKids, newKid]);
            setAddModalOpen(false);
        }
        setSelectedKid(null);
    };

    const handleDeleteKid = (kid: Kid) => {
        setKidToDelete(kid);
        setDeleteConfirmOpen(true);
    };

    const confirmDelete = () => {
        if (kidToDelete) {
            setKids(prevKids => prevKids.filter(kid => kid.id !== kidToDelete.id));
            setDeleteConfirmOpen(false);
            setKidToDelete(null);
        }
    };

    const handleFormChange = (data: Partial<KidFormData>) => {
        setFormData(prev => ({ ...prev, ...data }));
    };

    const handleCloseModals = () => {
        setEditModalOpen(false);
        setAddModalOpen(false);
        setSelectedKid(null);
    };

    return (
        <PermissionGate
            permission="canManageKids"
            fallback={
                <Container maxWidth="lg" sx={{ py: 4 }}>
                    <Alert severity="warning" sx={{ mb: 3 }}>
                        Esta funcionalidad está disponible solo para tutores.
                    </Alert>
                </Container>
            }
        >
            <Container maxWidth="lg" sx={{ py: 4 }}>
                <KidsPageHeader
                    kidsCount={kids.length}
                    maxKids={maxKids}
                    isPremiumUser={isPremiumUser}
                />

                <PlanInfoAlert isPremiumUser={isPremiumUser} />

                <KidsGrid
                    kids={kids}
                    isPremiumUser={isPremiumUser}
                    canAddMore={canAddMore}
                    maxKids={maxKids}
                    onEditKid={handleEditKid}
                    onDeleteKid={handleDeleteKid}
                    onAddKid={handleAddKid}
                />

                <ConsolidatedStats
                    kids={kids}
                    isPremiumUser={isPremiumUser}
                />

                {/* FAB para agregar hijo */}
                {canAddMore && (
                    <Fab
                        color="primary"
                        aria-label="add kid"
                        onClick={handleAddKid}
                        sx={{ position: 'fixed', bottom: 16, right: 16 }}
                    >
                        <AddIcon />
                    </Fab>
                )}

                {/* Modales */}
                <KidForm
                    open={addModalOpen}
                    formData={formData}
                    isEditing={false}
                    isPremiumUser={isPremiumUser}
                    onClose={handleCloseModals}
                    onSave={handleSaveKid}
                    onChange={handleFormChange}
                />

                <KidForm
                    open={editModalOpen}
                    formData={formData}
                    isEditing={true}
                    isPremiumUser={isPremiumUser}
                    onClose={handleCloseModals}
                    onSave={handleSaveKid}
                    onChange={handleFormChange}
                />

                <DeleteKidModal
                    open={deleteConfirmOpen}
                    kid={kidToDelete}
                    onClose={() => setDeleteConfirmOpen(false)}
                    onConfirm={confirmDelete}
                />
            </Container>
        </PermissionGate>
    );
}
