import path from 'node:path';
import { fileURLToPath } from 'node:url';

const here = path.dirname(fileURLToPath(import.meta.url));

/** Reads settings from environment variables. Nothing secret is ever logged or sent to the browser. */
export function loadConfig(env = process.env) {
  return {
    nodeEnv: env.NODE_ENV || 'development',
    port: Number(env.PORT) || 5000,
    mongoUri: env.MONGODB_URI || '',
    allowedOrigins: (env.ALLOWED_ORIGINS || '')
      .split(',')
      .map((s) => s.trim())
      .filter(Boolean),
    clientDist: env.CLIENT_DIST || path.resolve(here, '../../client/dist'),
    contactRateLimitMax: Number(env.CONTACT_RATE_LIMIT_MAX) || 5,
    contactRateLimitWindowMs: 15 * 60 * 1000,
    minFormFillMs: 2500,
  };
}
