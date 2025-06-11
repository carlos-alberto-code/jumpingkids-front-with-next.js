import React from 'react';

/**
 * Configuración para cache de datos
 */
export interface CacheConfig {
    ttl: number; // Time To Live en milisegundos
    maxSize: number; // Máximo número de elementos en cache
}

export const DEFAULT_CACHE_CONFIG: CacheConfig = {
    ttl: 5 * 60 * 1000, // 5 minutos
    maxSize: 100
};

/**
 * Elemento del cache con timestamp
 */
interface CacheItem<T> {
    data: T;
    timestamp: number;
    ttl: number;
}

/**
 * Sistema de cache básico con TTL y límite de tamaño
 */
export class MemoryCache<T> {
    private cache = new Map<string, CacheItem<T>>();
    private config: CacheConfig;

    constructor(config: CacheConfig = DEFAULT_CACHE_CONFIG) {
        this.config = config;
    }

    /**
     * Guarda un elemento en el cache
     */
    set(key: string, data: T, customTTL?: number): void {
        const ttl = customTTL || this.config.ttl;
        const item: CacheItem<T> = {
            data,
            timestamp: Date.now(),
            ttl
        };

        // Si el cache está lleno, eliminar el elemento más antiguo
        if (this.cache.size >= this.config.maxSize) {
            const oldestKey = this.getOldestKey();
            if (oldestKey) {
                this.cache.delete(oldestKey);
            }
        }

        this.cache.set(key, item);
    }

    /**
     * Obtiene un elemento del cache
     */
    get(key: string): T | null {
        const item = this.cache.get(key);

        if (!item) {
            return null;
        }

        // Verificar si ha expirado
        const now = Date.now();
        if (now - item.timestamp > item.ttl) {
            this.cache.delete(key);
            return null;
        }

        return item.data;
    }

    /**
     * Verifica si existe una clave en el cache y no ha expirado
     */
    has(key: string): boolean {
        return this.get(key) !== null;
    }

    /**
     * Elimina un elemento del cache
     */
    delete(key: string): boolean {
        return this.cache.delete(key);
    }

    /**
     * Limpia todo el cache
     */
    clear(): void {
        this.cache.clear();
    }

    /**
     * Limpia elementos expirados
     */
    cleanup(): void {
        const now = Date.now();
        const expiredKeys = Array.from(this.cache.entries())
            .filter(([_, item]) => now - item.timestamp > item.ttl)
            .map(([key, _]) => key);

        expiredKeys.forEach(key => this.cache.delete(key));
    }

    /**
     * Obtiene estadísticas del cache
     */
    getStats() {
        return {
            size: this.cache.size,
            maxSize: this.config.maxSize,
            keys: Array.from(this.cache.keys())
        };
    }

    /**
     * Encuentra la clave más antigua
     */
    private getOldestKey(): string | null {
        let oldestKey: string | null = null;
        let oldestTimestamp = Date.now();

        for (const [key, item] of this.cache.entries()) {
            if (item.timestamp < oldestTimestamp) {
                oldestTimestamp = item.timestamp;
                oldestKey = key;
            }
        }

        return oldestKey;
    }
}

/**
 * Cache singleton para ejercicios
 */
export const exerciseCache = new MemoryCache<any>({
    ttl: 10 * 60 * 1000, // 10 minutos para ejercicios
    maxSize: 50
});

/**
 * Genera una clave de cache estable basada en parámetros
 */
export const generateCacheKey = (prefix: string, params: Record<string, any> = {}): string => {
    const sortedParams = Object.keys(params)
        .sort()
        .map(key => `${key}:${JSON.stringify(params[key])}`)
        .join('|');

    return `${prefix}${sortedParams ? `|${sortedParams}` : ''}`;
};

/**
 * Hook para usar cache con React
 */
export const useCacheWithExpiry = <T>(
    key: string,
    fetchFn: () => Promise<T>,
    cache: MemoryCache<T>,
    dependencies: any[] = []
): [T | null, boolean, () => Promise<void>] => {
    const [data, setData] = React.useState<T | null>(null);
    const [loading, setLoading] = React.useState(false);

    const refresh = React.useCallback(async () => {
        setLoading(true);
        try {
            const result = await fetchFn();
            cache.set(key, result);
            setData(result);
        } catch (error) {
            console.error('Error fetching data:', error);
        } finally {
            setLoading(false);
        }
    }, [key, fetchFn, cache]);

    React.useEffect(() => {
        const cachedData = cache.get(key);
        if (cachedData) {
            setData(cachedData);
        } else {
            refresh();
        }
    }, [key, refresh, ...dependencies]);

    return [data, loading, refresh];
};
