import { useRef, useState, type ChangeEvent, type FormEvent } from 'react';
import { profile } from '../data/profile';
import { sendContact } from '../lib/api';
import { LIMITS, validateContact, type ContactFields, type FieldErrors } from '../lib/validate';
import { CheckIcon, DownloadIcon, GithubIcon, LinkedinIcon, MailIcon, MapPinIcon, PhoneIcon } from './Icons';
import Reveal from './Reveal';
import Section from './Section';

type Status = 'idle' | 'sending' | 'success' | 'error';
const empty: ContactFields = { name: '', email: '', subject: '', message: '' };

const input =
  'mt-1.5 block w-full rounded-lg border bg-white px-3.5 py-2.5 text-sm text-slate-900 shadow-sm placeholder:text-slate-400 focus:border-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-500/30 dark:bg-white/5 dark:text-slate-100 dark:placeholder:text-slate-500';
const borderOk = 'border-slate-300 dark:border-white/15';
const borderBad = 'border-red-500 dark:border-red-400';

function ContactRow({ icon, label, href, text, external }: { icon: React.ReactNode; label: string; href?: string; text: string; external?: boolean }) {
  const content = <span className="text-sm font-medium">{text}</span>;
  return (
    <li className="flex items-center gap-4">
      <span className="grid h-10 w-10 shrink-0 place-items-center rounded-lg bg-indigo-50 text-indigo-600 dark:bg-indigo-500/10 dark:text-indigo-400">{icon}</span>
      <div className="min-w-0">
        <p className="text-xs font-medium uppercase tracking-wider text-slate-500 dark:text-slate-400">{label}</p>
        {href ? (
          <a href={href} {...(external ? { target: '_blank', rel: 'noopener noreferrer' } : {})} className="break-words hover:text-indigo-600 dark:hover:text-indigo-400">
            {content}
          </a>
        ) : (
          content
        )}
      </div>
    </li>
  );
}

export default function Contact() {
  const [values, setValues] = useState<ContactFields>(empty);
  const [errors, setErrors] = useState<FieldErrors>({});
  const [honeypot, setHoneypot] = useState('');
  const [status, setStatus] = useState<Status>('idle');
  const [feedback, setFeedback] = useState('');
  const openedAt = useRef(Date.now());

  const onChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setValues((v) => ({ ...v, [name]: value }));
    if (errors[name as keyof ContactFields]) setErrors((er) => ({ ...er, [name]: undefined }));
  };

  const onSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (status === 'sending') return;
    const found = validateContact(values);
    setErrors(found);
    if (Object.keys(found).length > 0) {
      setStatus('idle');
      setFeedback('');
      return;
    }
    setStatus('sending');
    setFeedback('');
    const result = await sendContact({ ...values, website: honeypot, elapsedMs: Date.now() - openedAt.current });
    if (result.ok) {
      setStatus('success');
      setFeedback(result.message);
      setValues(empty);
      openedAt.current = Date.now();
    } else {
      setStatus('error');
      setFeedback(result.error);
      if (result.fieldErrors) setErrors(result.fieldErrors as FieldErrors);
    }
  };

  const err = (k: keyof ContactFields) => errors[k];

  return (
    <Section id="contact" eyebrow="Contact" title="Let’s talk" description="I’m open to Full Stack, React/Node and AI application roles. The best way to reach me is email or LinkedIn, or use the form.">
      <div className="grid grid-cols-1 gap-12 lg:grid-cols-[0.8fr_1.2fr]">
        <Reveal>
          <ul className="space-y-5">
            <ContactRow icon={<MailIcon />} label="Email" href={`mailto:${profile.email}`} text={profile.email} />
            <ContactRow icon={<LinkedinIcon width={20} height={20} />} label="LinkedIn" href={profile.linkedin} text="linkedin.com/in/shreyansi-ariwala" external />
            <ContactRow icon={<GithubIcon width={20} height={20} />} label="GitHub" href={profile.github} text="github.com/shreyansi-work" external />
            {profile.phone && <ContactRow icon={<PhoneIcon />} label="Phone" href={`tel:${profile.phone.replace(/\s+/g, '')}`} text={profile.phone} />}
            <ContactRow icon={<MapPinIcon />} label="Location" text={profile.location} />
          </ul>

          <div className="mt-8 rounded-2xl border border-slate-200 p-5 dark:border-white/10">
            <p className="text-sm font-semibold">Resume</p>
            <div className="mt-3 flex flex-col gap-2 text-sm">
              <a href={profile.resumeFullStack} download className="inline-flex items-center gap-2 font-medium text-indigo-600 hover:underline dark:text-indigo-400">
                <DownloadIcon width={16} height={16} /> Full Stack Developer (PDF)
              </a>
              <a href={profile.resumeAiFullStack} download className="inline-flex items-center gap-2 font-medium text-indigo-600 hover:underline dark:text-indigo-400">
                <DownloadIcon width={16} height={16} /> AI Full Stack Developer (PDF)
              </a>
            </div>
          </div>
        </Reveal>

        <Reveal delay={100}>
          <form onSubmit={onSubmit} noValidate className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm sm:p-8 dark:border-white/10 dark:bg-white/[0.03]">
            <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
              <div>
                <label htmlFor="name" className="text-sm font-medium">Name</label>
                <input id="name" name="name" type="text" autoComplete="name" maxLength={LIMITS.name.max} value={values.name} onChange={onChange}
                  className={`${input} ${err('name') ? borderBad : borderOk}`} aria-invalid={!!err('name')} aria-describedby={err('name') ? 'name-error' : undefined} />
                {err('name') && <p id="name-error" className="mt-1.5 text-xs text-red-600 dark:text-red-400">{err('name')}</p>}
              </div>
              <div>
                <label htmlFor="email" className="text-sm font-medium">Email</label>
                <input id="email" name="email" type="email" autoComplete="email" maxLength={254} value={values.email} onChange={onChange}
                  className={`${input} ${err('email') ? borderBad : borderOk}`} aria-invalid={!!err('email')} aria-describedby={err('email') ? 'email-error' : undefined} />
                {err('email') && <p id="email-error" className="mt-1.5 text-xs text-red-600 dark:text-red-400">{err('email')}</p>}
              </div>
            </div>

            <div className="mt-5">
              <label htmlFor="subject" className="text-sm font-medium">Subject</label>
              <input id="subject" name="subject" type="text" maxLength={LIMITS.subject.max} value={values.subject} onChange={onChange}
                className={`${input} ${err('subject') ? borderBad : borderOk}`} aria-invalid={!!err('subject')} aria-describedby={err('subject') ? 'subject-error' : undefined} />
              {err('subject') && <p id="subject-error" className="mt-1.5 text-xs text-red-600 dark:text-red-400">{err('subject')}</p>}
            </div>

            <div className="mt-5">
              <label htmlFor="message" className="text-sm font-medium">Message</label>
              <textarea id="message" name="message" rows={6} maxLength={LIMITS.message.max} value={values.message} onChange={onChange}
                className={`${input} resize-y ${err('message') ? borderBad : borderOk}`} aria-invalid={!!err('message')} aria-describedby={err('message') ? 'message-error' : 'message-count'} />
              <div className="mt-1.5 flex justify-between gap-4 text-xs">
                <span id="message-error" className="text-red-600 dark:text-red-400">{err('message')}</span>
                <span id="message-count" className="ml-auto text-slate-500 dark:text-slate-400">{values.message.length}/{LIMITS.message.max}</span>
              </div>
            </div>

            {/* Honeypot: hidden from people; bots tend to fill it in. */}
            <div aria-hidden="true" style={{ position: 'absolute', left: '-9999px', width: 1, height: 1, overflow: 'hidden' }}>
              <label htmlFor="website">Leave this field empty</label>
              <input id="website" name="website" type="text" tabIndex={-1} autoComplete="off" value={honeypot} onChange={(e) => setHoneypot(e.target.value)} />
            </div>

            <div className="mt-6 flex flex-col gap-4 sm:flex-row sm:items-center">
              <button
                type="submit"
                disabled={status === 'sending'}
                className="inline-flex items-center justify-center gap-2 rounded-lg bg-indigo-600 px-6 py-3 text-sm font-semibold text-white shadow-sm transition hover:bg-indigo-500 disabled:cursor-not-allowed disabled:opacity-60"
              >
                {status === 'sending' ? 'Sending…' : 'Send message'}
              </button>
              <div role="status" aria-live="polite" className="text-sm">
                {status === 'success' && (
                  <p className="flex items-center gap-2 font-medium text-emerald-600 dark:text-emerald-400">
                    <CheckIcon width={18} height={18} /> {feedback}
                  </p>
                )}
                {status === 'error' && <p className="font-medium text-red-600 dark:text-red-400">{feedback}</p>}
              </div>
            </div>
          </form>
        </Reveal>
      </div>
    </Section>
  );
}
