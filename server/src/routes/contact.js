import { Router } from 'express';
import rateLimit from 'express-rate-limit';
import { validateContact } from '../validation.js';

/**
 * POST /api/contact
 * Spam protection: per-IP rate limit, hidden honeypot field ("website"), and a minimum fill time.
 * Messages are only stored; nothing is emailed unless you add an email integration yourself.
 */
export function contactRouter({ config, contactStore }) {
  const router = Router();

  const limiter = rateLimit({
    windowMs: config.contactRateLimitWindowMs,
    limit: config.contactRateLimitMax,
    standardHeaders: 'draft-7',
    legacyHeaders: false,
    handler: (_req, res) =>
      res.status(429).json({ ok: false, error: 'Too many messages from this connection. Please try again in a few minutes.' }),
  });

  router.post('/', limiter, async (req, res, next) => {
    try {
      const body = req.body && typeof req.body === 'object' ? req.body : {};

      // Honeypot: real visitors never see or fill this field. Pretend success so bots learn nothing.
      if (typeof body.website === 'string' && body.website.trim() !== '') {
        return res.status(200).json({ ok: true, message: 'Thanks, your message has been received.' });
      }

      // Humans need more than a couple of seconds to fill the form.
      const elapsed = Number(body.elapsedMs);
      if (Number.isFinite(elapsed) && elapsed < config.minFormFillMs) {
        return res.status(400).json({ ok: false, error: 'That was very quick. Please check your message and send it again.' });
      }

      const result = validateContact(body);
      if (!result.ok) {
        return res.status(400).json({ ok: false, error: 'Please correct the highlighted fields.', fieldErrors: result.errors });
      }

      if (!contactStore || !contactStore.isReady()) {
        return res.status(503).json({
          ok: false,
          error: 'The contact form is temporarily unavailable. Please email me directly instead.',
        });
      }

      await contactStore.save({
        ...result.value,
        userAgent: String(req.get('user-agent') || '').slice(0, 300),
      });
      return res.status(201).json({ ok: true, message: 'Thanks, your message has been received.' });
    } catch (err) {
      next(err);
    }
  });

  return router;
}
