type CacheItem<T> = {
  data: T;
  timestamp: number;
  expiresIn: number;
};

class Cache {
  private static instance: Cache;
  private cache: Map<string, CacheItem<any>>;
  private defaultTTL: number = 5 * 60 * 1000; // 5 minutes

  private constructor() {
    this.cache = new Map();
  }

  public static getInstance(): Cache {
    if (!Cache.instance) {
      Cache.instance = new Cache();
    }
    return Cache.instance;
  }

  private generateKey(key: string, params?: Record<string, any>): string {
    if (!params) return key;
    return `${key}:${JSON.stringify(params)}`;
  }

  public set<T>(
    key: string,
    data: T,
    params?: Record<string, any>,
    ttl: number = this.defaultTTL
  ): void {
    const cacheKey = this.generateKey(key, params);
    this.cache.set(cacheKey, {
      data,
      timestamp: Date.now(),
      expiresIn: ttl,
    });
  }

  public get<T>(key: string, params?: Record<string, any>): T | null {
    const cacheKey = this.generateKey(key, params);
    const item = this.cache.get(cacheKey);

    if (!item) return null;

    const now = Date.now();
    if (now - item.timestamp > item.expiresIn) {
      this.cache.delete(cacheKey);
      return null;
    }

    return item.data as T;
  }

  public clear(): void {
    this.cache.clear();
  }

  public delete(key: string, params?: Record<string, any>): void {
    const cacheKey = this.generateKey(key, params);
    this.cache.delete(cacheKey);
  }
}

export const cache = Cache.getInstance();
