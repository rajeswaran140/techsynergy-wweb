import Redis from 'ioredis';
import { NextRequest, NextResponse } from 'next/server';

// Initialize Redis with error handling
let redis: Redis | null = null;
const REDIS_ENABLED = process.env.REDIS_HOST ? true : false;

if (REDIS_ENABLED) {
  try {
    redis = new Redis({
      host: process.env.REDIS_HOST,
      port: parseInt(process.env.REDIS_PORT || '6379'),
      password: process.env.REDIS_PASSWORD,
      db: parseInt(process.env.REDIS_DB || '0'),
      lazyConnect: true,
      retryStrategy: (times) => {
        if (times > 3) {
          console.error('Redis connection failed after 3 attempts. Rate limiting disabled.');
          return null; // Stop retrying
        }
        return Math.min(times * 100, 3000);
      },
    });

    redis.on('error', (err) => {
      console.error('Redis connection error:', err.message);
    });
  } catch (error) {
    console.error('Failed to initialize Redis:', error);
    redis = null;
  }
}

interface RateLimitConfig {
  maxRequests: number;
  windowSeconds: number;
  prefix: string;
}

const configs = {
  login: { maxRequests: 5, windowSeconds: 900, prefix: 'rl:login' }, // 5 per 15min
  api: { maxRequests: 100, windowSeconds: 3600, prefix: 'rl:api' }, // 100 per hour
  contact: { maxRequests: 3, windowSeconds: 3600, prefix: 'rl:contact' }, // 3 per hour
};

export async function checkRateLimit(
  request: NextRequest,
  type: keyof typeof configs,
  identifier?: string
): Promise<NextResponse | null> {
  // If Redis is not configured, skip rate limiting
  if (!redis || !REDIS_ENABLED) {
    if (process.env.NODE_ENV === 'development') {
      console.warn('Rate limiting disabled: Redis not configured');
    }
    return null; // Allow request without rate limiting
  }

  try {
    const config = configs[type];
    const ip = identifier || request.headers.get('x-forwarded-for') || request.headers.get('x-real-ip') || 'anonymous';
    const key = `${config.prefix}:${ip}`;

    const now = Date.now();
    const windowStart = now - (config.windowSeconds * 1000);

    // Remove old entries and count current requests
    await redis.zremrangebyscore(key, 0, windowStart);
    const count = await redis.zcard(key);

    if (count >= config.maxRequests) {
      const oldestEntry = await redis.zrange(key, 0, 0, 'WITHSCORES');
      const resetTime = parseInt(oldestEntry[1]) + (config.windowSeconds * 1000);

      return NextResponse.json(
        {
          error: 'Too many requests. Please try again later.',
          retryAfter: new Date(resetTime).toISOString(),
        },
        {
          status: 429,
          headers: {
            'X-RateLimit-Limit': config.maxRequests.toString(),
            'X-RateLimit-Remaining': '0',
            'Retry-After': Math.ceil((resetTime - now) / 1000).toString(),
          },
        }
      );
    }

    // Add current request
    await redis.zadd(key, now, `${now}-${Math.random()}`);
    await redis.expire(key, config.windowSeconds);

    return null;
  } catch (error) {
    // If Redis fails, allow the request (fail open)
    console.error('Rate limiting error:', error);
    return null;
  }
}
