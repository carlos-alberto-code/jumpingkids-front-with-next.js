// src/types/api.ts
import { SubscriptionType, User, UserType } from './auth';

// ===== REQUEST TYPES =====
export interface SignUpRequest {
  name: string;
  username: string;  // Cambiado de email a username
  password: string;
  confirmPassword: string;
  userType: UserType;
  subscription?: SubscriptionType;
  // Campos específicos para tutores
  phoneNumber?: string;
  organization?: string;
  verificationPhoto?: File | string;
}

export interface SignInRequest {
  username: string;
  password: string;
  rememberMe?: boolean;
}

// ===== RESPONSE TYPES =====
export interface ApiResponse<T = any> {
  success: boolean;
  data?: T;
  message?: string;
  errors?: Record<string, string[]>;
  timestamp?: string;
}

export interface AuthTokens {
  accessToken: string;
  refreshToken: string;
  expiresIn: number; // segundos
  tokenType: 'Bearer';
}

export interface SignUpResponse {
  user: User;
  tokens: AuthTokens;
  requiresVerification: boolean;
  verificationMethod?: 'email' | 'phone' | 'photo';
}

export interface SignInResponse {
  user: User;
  tokens: AuthTokens;
  lastLogin?: string;
}

// ===== ENDPOINTS =====
export const API_ENDPOINTS = {
  signUp: '/auth/signup',
  signIn: '/auth/signin',
  signOut: '/auth/signout',
  refreshToken: '/auth/refresh',
  verifyAccount: '/auth/verify',
  checkEmail: '/auth/check-email',

  // User endpoints
  profile: '/user/profile',
  updateProfile: '/user/profile',

  // Exercise endpoints
  exercises: '/exercises',
  createExercise: '/exercises',

  // Routine endpoints
  routines: '/routines',
  createRoutine: '/routines',
} as const;