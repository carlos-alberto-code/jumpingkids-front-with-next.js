// src/services/api/httpClient.ts
import axios from 'axios';

interface ApiConfig {
  baseURL: string;
  timeout: number;
  headers: Record<string, string>;
}

// Create axios instance without explicit typing
const createHttpClient = (config: ApiConfig) => {
  return axios.create({
    baseURL: config.baseURL,
    timeout: config.timeout,
    headers: config.headers,
  });
};

export class HttpClient {
  private instance: ReturnType<typeof axios.create>;
  private authToken: string | null = null;

  constructor(config: ApiConfig) {
    this.instance = createHttpClient(config);
    this.setupInterceptors();
  }

  private setupInterceptors() {
    // Request interceptor - agregar auth token automáticamente
    this.instance.interceptors.request.use(
      (config: any) => {
        if (this.authToken && config.headers) {
          config.headers.Authorization = `Bearer ${this.authToken}`;
        }

        console.log('🚀 API Request:', {
          method: config.method?.toUpperCase(),
          url: config.url,
          data: config.data ? { ...config.data, password: '[HIDDEN]' } : undefined
        });

        return config;
      },
      (error: any) => {
        console.error('❌ Request Error:', error);
        return Promise.reject(error);
      }
    );

    // Response interceptor - manejo global de errores
    this.instance.interceptors.response.use(
      (response: any) => {
        console.log('✅ API Response:', {
          status: response.status,
          url: response.config.url,
          success: response.data?.success || true
        });
        return response;
      },
      (error: any) => {
        console.error('❌ API Error:', {
          status: error.response?.status,
          url: error.config?.url,
          message: error.message,
          data: error.response?.data
        });

        // Manejo global de errores
        if (error.response?.status === 401) {
          this.clearAuthToken();
          if (typeof window !== 'undefined') {
            window.location.href = '/auth/login';
          }
        }

        return Promise.reject(this.formatError(error));
      }
    );
  }

  private formatError(error: any): Error {
    // Error específico del backend
    if (error.response?.data?.message) {
      return new Error(error.response.data.message);
    }

    // Errores de validación
    if (error.response?.data?.errors) {
      const errors = error.response.data.errors;
      if (typeof errors === 'object') {
        const firstError = Object.values(errors)[0];
        if (Array.isArray(firstError)) {
          return new Error(firstError[0]);
        }
      }
      return new Error('Datos inválidos');
    }

    // Errores HTTP estándar
    if (error.response?.status) {
      const statusMessages: Record<number, string> = {
        400: 'Datos inválidos',
        401: 'No autorizado',
        403: 'Acceso denegado',
        404: 'Recurso no encontrado',
        409: 'El email ya está registrado',
        422: 'Datos de validación incorrectos',
        500: 'Error interno del servidor',
        503: 'Servicio no disponible'
      };

      return new Error(statusMessages[error.response.status] || 'Error del servidor');
    }

    // Error de conexión
    if (error.code === 'ECONNREFUSED' || error.code === 'NETWORK_ERROR' || !error.response) {
      return new Error('Error de conexión - verifica que el servidor esté ejecutándose');
    }

    return new Error(error.message || 'Error desconocido');
  }

  // Métodos públicos
  setAuthToken(token: string) {
    this.authToken = token;
  }

  clearAuthToken() {
    this.authToken = null;
  }

  async get<T>(url: string, config?: Record<string, any>): Promise<T> {
    const response = await this.instance.get(url, config);
    return response.data as T;
  }

  async post<T>(url: string, data?: any, config?: Record<string, any>): Promise<T> {
    const response = await this.instance.post(url, data, config);
    return response.data as T;
  }

  async put<T>(url: string, data?: any, config?: Record<string, any>): Promise<T> {
    const response = await this.instance.put(url, data, config);
    return response.data as T;
  }

  async delete<T>(url: string, config?: Record<string, any>): Promise<T> {
    const response = await this.instance.delete(url, config);
    return response.data as T;
  }
}

// Instancia global del cliente
const API_CONFIG: ApiConfig = {
  baseURL: process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000/api',
  timeout: 15000, // 15 segundos
  headers: {
    'Content-Type': 'application/json',
  }
};

export const httpClient = new HttpClient(API_CONFIG);