// Same rules as server/src/validation.js (the server re-checks everything).
export type ContactFields = { name: string; email: string; subject: string; message: string };
export type FieldErrors = Partial<Record<keyof ContactFields, string>>;

export const LIMITS = {
  name: { min: 2, max: 80 },
  subject: { min: 3, max: 120 },
  message: { min: 10, max: 2000 },
};

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

export function validateContact(v: ContactFields): FieldErrors {
  const errors: FieldErrors = {};
  const name = v.name.trim();
  const subject = v.subject.trim();
  const message = v.message.trim();
  const email = v.email.trim();

  if (name.length < LIMITS.name.min || name.length > LIMITS.name.max)
    errors.name = `Please enter your name (${LIMITS.name.min}-${LIMITS.name.max} characters).`;
  if (email.length > 254 || !EMAIL_RE.test(email)) errors.email = 'Please enter a valid email address.';
  if (subject.length < LIMITS.subject.min || subject.length > LIMITS.subject.max)
    errors.subject = `Please add a subject (${LIMITS.subject.min}-${LIMITS.subject.max} characters).`;
  if (message.length < LIMITS.message.min || message.length > LIMITS.message.max)
    errors.message = `Your message should be ${LIMITS.message.min}-${LIMITS.message.max} characters.`;
  return errors;
}
