// src/services/api/authApi.ts
import {
  API_ENDPOINTS,
  ApiResponse,
  SignInRequest,
  SignInResponse,
  SignUpRequest,
  SignUpResponse
} from '../../types/api';
import { httpClient } from './httpClient';

export class AuthApi {
  /**
   * Registrar nuevo usuario
   */
  static async signUp(userData: SignUpRequest): Promise<SignUpResponse> {
    try {
      console.log('🚀 AuthApi.signUp:', {
        name: userData.name,
        username: userData.username,  // Cambiado de email a username
        userType: userData.userType,
        subscription: userData.subscription
      });

      // Preparar datos para el backend
      const requestData = {
        name: userData.name.trim(),
        username: userData.username.toLowerCase().trim(),  // Cambiado de email a username
        password: userData.password,
        confirm_password: userData.confirmPassword, // Backend usa snake_case
        user_type: userData.userType,
        subscription: userData.subscription || 'free',

        // Campos opcionales para tutores
        ...(userData.userType === 'tutor' && {
          phone_number: userData.phoneNumber?.trim(),
          organization: userData.organization?.trim(),
        })
      };

      const response = await httpClient.post<ApiResponse<SignUpResponse>>(
        API_ENDPOINTS.signUp,
        requestData
      );

      // Verificar respuesta del servidor
      if (!response.success || !response.data) {
        throw new Error(response.message || 'Error en el registro');
      }

      // Configurar token automáticamente
      if (response.data.tokens?.accessToken) {
        httpClient.setAuthToken(response.data.tokens.accessToken);
      }

      console.log('✅ Registro exitoso');
      return response.data;

    } catch (error) {
      console.error('❌ Error en registro:', error);
      throw error; // Re-lanzar error formateado por httpClient
    }
  }

  /**
   * Iniciar sesión
   */
  static async signIn(credentials: SignInRequest): Promise<SignInResponse> {
    try {
      console.log('🚀 AuthApi.signIn:', {
        username: credentials.username
      });

      const requestData = {
        username: credentials.username.toLowerCase().trim(),
        password: credentials.password,
        remember_me: credentials.rememberMe || false
      };

      const response = await httpClient.post<ApiResponse<SignInResponse>>(
        API_ENDPOINTS.signIn,
        requestData
      );

      if (!response.success || !response.data) {
        throw new Error(response.message || 'Credenciales inválidas');
      }

      // Configurar token automáticamente
      if (response.data.tokens?.accessToken) {
        httpClient.setAuthToken(response.data.tokens.accessToken);
      }

      console.log('✅ Login exitoso');
      return response.data;

    } catch (error) {
      console.error('❌ Error en login:', error);
      throw error;
    }
  }

  /**
   * Cerrar sesión
   */
  static async signOut(): Promise<void> {
    try {
      await httpClient.post(API_ENDPOINTS.signOut);
      httpClient.clearAuthToken();
      console.log('✅ Logout exitoso');
    } catch (error) {
      console.error('❌ Error en logout:', error);
      httpClient.clearAuthToken(); // Limpiar token incluso si hay error
      throw error;
    }
  }

  /**
   * Verificar si email ya existe
   */
  static async checkEmailExists(email: string): Promise<boolean> {
    try {
      const response = await httpClient.get<ApiResponse<{ exists: boolean }>>(
        `${API_ENDPOINTS.checkEmail}?email=${encodeURIComponent(email)}`
      );

      return response.data?.exists || false;
    } catch (error) {
      console.error('❌ Error al verificar email:', error);
      return false; // En caso de error, asumir que no existe
    }
  }

  /**
   * Verificar cuenta con foto (tutores)
   */
  static async verifyAccount(data: {
    userId: string;
    verificationPhoto?: File;
  }): Promise<{ verified: boolean; message: string }> {
    try {
      const formData = new FormData();
      formData.append('user_id', data.userId);

      if (data.verificationPhoto) {
        formData.append('verification_photo', data.verificationPhoto);
      }

      const response = await httpClient.post<ApiResponse<{ verified: boolean; message: string }>>(
        API_ENDPOINTS.verifyAccount,
        formData,
        {
          headers: {
            'Content-Type': 'multipart/form-data'
          }
        }
      );

      if (!response.success || !response.data) {
        throw new Error(response.message || 'Error en la verificación');
      }

      return response.data;
    } catch (error) {
      console.error('❌ Error en verificación:', error);
      throw error;
    }
  }
}