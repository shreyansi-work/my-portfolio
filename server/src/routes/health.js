import { Router } from 'express';

export function healthRouter({ contactStore }) {
  const router = Router();
  router.get('/', (_req, res) => {
    const db = !contactStore ? 'not_configured' : contactStore.isReady() ? 'connected' : 'disconnected';
    res.json({ status: 'ok', db, uptimeSeconds: Math.round(process.uptime()) });
  });
  return router;
}
