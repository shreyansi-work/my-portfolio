// Backend validation for the contact form. The same rules exist in client/src/lib/validate.ts
// so users get instant feedback, but the server never trusts the browser.

export const LIMITS = {
  name: { min: 2, max: 80 },
  email: { max: 254 },
  subject: { min: 3, max: 120 },
  message: { min: 10, max: 2000 },
};

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
// Removes control characters (keeps tab and newline) so stored text is clean.
const CONTROL_RE = /[\u0000-\u0008\u000B\u000C\u000E-\u001F\u007F]/g;

function clean(value, { multiline = false } = {}) {
  let v = String(value).replace(CONTROL_RE, '').trim();
  if (!multiline) v = v.replace(/\s+/g, ' ');
  return v;
}

/**
 * @param {unknown} body request JSON
 * @returns {{ ok: true, value: {name:string,email:string,subject:string,message:string} } | { ok: false, errors: Record<string,string> }}
 */
export function validateContact(body) {
  const errors = {};
  const src = body && typeof body === 'object' && !Array.isArray(body) ? body : {};

  const fields = ['name', 'email', 'subject', 'message'];
  for (const f of fields) {
    if (typeof src[f] !== 'string') errors[f] = `${f[0].toUpperCase()}${f.slice(1)} is required.`;
  }
  if (Object.keys(errors).length) return { ok: false, errors };

  const value = {
    name: clean(src.name),
    email: clean(src.email).toLowerCase(),
    subject: clean(src.subject),
    message: clean(src.message, { multiline: true }),
  };

  if (value.name.length < LIMITS.name.min || value.name.length > LIMITS.name.max)
    errors.name = `Name must be ${LIMITS.name.min}-${LIMITS.name.max} characters.`;
  if (value.email.length > LIMITS.email.max || !EMAIL_RE.test(value.email))
    errors.email = 'Enter a valid email address.';
  if (value.subject.length < LIMITS.subject.min || value.subject.length > LIMITS.subject.max)
    errors.subject = `Subject must be ${LIMITS.subject.min}-${LIMITS.subject.max} characters.`;
  if (value.message.length < LIMITS.message.min || value.message.length > LIMITS.message.max)
    errors.message = `Message must be ${LIMITS.message.min}-${LIMITS.message.max} characters.`;

  return Object.keys(errors).length ? { ok: false, errors } : { ok: true, value };
}
