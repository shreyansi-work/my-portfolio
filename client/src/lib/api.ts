// In production the site and API share one origin, so the base URL is empty (relative /api/...).
// Set VITE_API_URL only if you host the API on a different domain.
const API_BASE = (import.meta.env.VITE_API_URL as string | undefined) ?? '';

export type ContactPayload = {
  name: string;
  email: string;
  subject: string;
  message: string;
  website: string; // honeypot: must stay empty
  elapsedMs: number;
};

export type ContactResult =
  | { ok: true; message: string }
  | { ok: false; error: string; fieldErrors?: Record<string, string> };

export async function sendContact(payload: ContactPayload): Promise<ContactResult> {
  try {
    const res = await fetch(`${API_BASE}/api/contact`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    });
    const data = await res.json().catch(() => null);
    if (res.ok && data?.ok) return { ok: true, message: data.message ?? 'Thanks, your message has been received.' };
    return {
      ok: false,
      error: data?.error ?? 'Something went wrong. Please try again or email me directly.',
      fieldErrors: data?.fieldErrors,
    };
  } catch {
    return { ok: false, error: 'Could not reach the server. Please check your connection or email me directly.' };
  }
}
