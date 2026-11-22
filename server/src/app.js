import fs from 'node:fs';
import path from 'node:path';
import express from 'express';
import helmet from 'helmet';
import cors from 'cors';
import compression from 'compression';
import rateLimit from 'express-rate-limit';
import { contactRouter } from './routes/contact.js';
import { healthRouter } from './routes/health.js';

/**
 * Builds the Express app. `contactStore` is injected so the app can be tested without a database.
 * In production this single app serves the API (/api/*) and the built React site.
 */
export function createApp({ config, contactStore }) {
  const app = express();
  app.set('trust proxy', 1); // Render sits behind a proxy; needed for correct per-IP rate limiting
  app.disable('x-powered-by');

  app.use(
    helmet({
      contentSecurityPolicy: {
        directives: {
          defaultSrc: ["'self'"],
          scriptSrc: ["'self'"],
          styleSrc: ["'self'", "'unsafe-inline'"],
          imgSrc: ["'self'", 'data:'],
          fontSrc: ["'self'", 'data:'],
          connectSrc: ["'self'"],
          objectSrc: ["'none'"],
          baseUri: ["'self'"],
          formAction: ["'self'"],
          frameAncestors: ["'none'"],
        },
      },
    }),
  );
  app.use(compression());

  // CORS is only needed if the site is hosted on a different origin than the API.
  if (config.allowedOrigins.length > 0) {
    app.use('/api', cors({ origin: config.allowedOrigins, methods: ['GET', 'POST'] }));
  }

  app.use('/api', rateLimit({ windowMs: 15 * 60 * 1000, limit: 300, standardHeaders: 'draft-7', legacyHeaders: false }));
  app.use('/api', express.json({ limit: '10kb' }));

  app.use('/api/health', healthRouter({ contactStore }));
  app.use('/api/contact', contactRouter({ config, contactStore }));
  app.use('/api', (_req, res) => res.status(404).json({ ok: false, error: 'Not found.' }));

  // Serve the built React app (if present) with a fallback to index.html for client-side routes.
  const indexHtml = path.join(config.clientDist, 'index.html');
  if (fs.existsSync(indexHtml)) {
    app.use(
      express.static(config.clientDist, {
        index: false,
        setHeaders(res, filePath) {
          if (filePath.includes(`${path.sep}assets${path.sep}`)) {
            res.setHeader('Cache-Control', 'public, max-age=31536000, immutable'); // hashed filenames
          } else {
            res.setHeader('Cache-Control', 'public, max-age=300');
          }
        },
      }),
    );
    app.get('/{*splat}', (_req, res) => {
      res.setHeader('Cache-Control', 'no-cache');
      res.sendFile(indexHtml);
    });
  }

  // Error handler: never leaks stack traces or internals.
  // eslint-disable-next-line no-unused-vars
  app.use((err, _req, res, _next) => {
    if (err.type === 'entity.too.large') return res.status(413).json({ ok: false, error: 'Request is too large.' });
    if (err.type === 'entity.parse.failed' || err instanceof SyntaxError)
      return res.status(400).json({ ok: false, error: 'Invalid request body.' });
    console.error('Unhandled error:', err.message);
    return res.status(500).json({ ok: false, error: 'Something went wrong. Please try again later.' });
  });

  return app;
}
