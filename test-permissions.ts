// Test para verificar el funcionamiento del sistema de permisos
// Este archivo puede ejecutarse con: npx tsx test-permissions.ts

import { User } from './src/types/auth';
import { checkPermissions, getUserPermissions } from './src/utils/permissions';

console.log('🧪 Testing Permission System - Fase 3\n');

// Mock users for testing
const mockUsers: (User | null)[] = [
    null, // Usuario anónimo

    // Niño FREE
    {
        id: '1',
        name: 'Ana Niña',
        email: 'ana@test.com',
        userType: 'kid',
        subscription: 'free',
        createdAt: '2023-01-01'
    },

    // Niño PREMIUM
    {
        id: '2',
        name: 'Luis Niño Premium',
        email: 'luis@test.com',
        userType: 'kid',
        subscription: 'premium',
        createdAt: '2023-01-01'
    },

    // Tutor FREE
    {
        id: '3',
        name: 'María Tutora',
        email: 'maria@test.com',
        userType: 'tutor',
        subscription: 'free',
        createdAt: '2023-01-01'
    },

    // Tutor PREMIUM
    {
        id: '4',
        name: 'Carlos Tutor Pro',
        email: 'carlos@test.com',
        userType: 'tutor',
        subscription: 'premium',
        createdAt: '2023-01-01'
    }
];

const userLabels = [
    'Usuario Anónimo',
    'Niño FREE',
    'Niño PREMIUM',
    'Tutor FREE',
    'Tutor PREMIUM'
];

mockUsers.forEach((user, index) => {
    console.log(`\n📋 ${userLabels[index]}:`);
    console.log('─'.repeat(50));

    const permissions = getUserPermissions(user);

    // Tests principales
    console.log(`✨ Premium Exercises: ${permissions.canAccessPremiumExercises ? '✅' : '❌'}`);
    console.log(`🛠️  Create Custom: ${permissions.canCreateCustomExercises ? '✅' : '❌'}`);
    console.log(`📊 Track Progress: ${permissions.canTrackProgress ? '✅' : '❌'}`);
    console.log(`👨‍👩‍👧‍👦 Manage Kids: ${permissions.canManageMultipleKids ? '✅' : '❌'}`);
    console.log(`📈 Analytics: ${permissions.canAccessAnalytics ? '✅' : '❌'}`);
    console.log(`💰 Can Upgrade: ${permissions.canUpgradeSubscription ? '✅' : '❌'}`);

    // Límites
    console.log(`🏃 Exercise Limit: ${permissions.maxExercisesPerDay ?? 'Unlimited'}`);
    console.log(`📝 Routine Limit: ${permissions.maxRoutinesStored ?? 'Unlimited'}`);

    // Tests con helper functions
    console.log(`🎯 Is Premium: ${checkPermissions.isPremiumUser(user) ? '✅' : '❌'}`);
    console.log(`👩‍🏫 Is Tutor: ${checkPermissions.isTutor(user) ? '✅' : '❌'}`);
    console.log(`🎨 Can Create Content: ${checkPermissions.canCreateContent(user) ? '✅' : '❌'}`);
});

console.log('\n🎉 Permission system test completed!');
console.log('\n📋 Expected behavior:');
console.log('• Anónimo: solo navegación básica');
console.log('• Niño FREE: 5 ejercicios/día, 1 rutina, sin seguimiento');
console.log('• Niño PREMIUM: ejercicios ilimitados, 10 rutinas, seguimiento completo');
console.log('• Tutor FREE: seguimiento básico, 3 rutinas, sin múltiples niños');
console.log('• Tutor PREMIUM: acceso completo, creación custom, analytics, múltiples niños');
