import type { ReactNode } from 'react';
import Reveal from './Reveal';

type Props = { id: string; eyebrow: string; title: string; description?: string; children: ReactNode; muted?: boolean };

/** Shared section layout: eyebrow label, title, optional description, then content. */
export default function Section({ id, eyebrow, title, description, children, muted = false }: Props) {
  return (
    <section id={id} className={`scroll-mt-16 py-20 sm:py-28 ${muted ? 'bg-slate-50 dark:bg-white/[0.02]' : ''}`}>
      <div className="mx-auto w-full max-w-6xl px-5 sm:px-8">
        <Reveal>
          <p className="text-xs font-semibold uppercase tracking-[0.16em] text-indigo-600 dark:text-indigo-400">{eyebrow}</p>
          <h2 className="mt-3 text-3xl font-semibold tracking-tight sm:text-4xl">{title}</h2>
          {description && <p className="mt-4 max-w-2xl text-base leading-relaxed text-slate-600 dark:text-slate-400">{description}</p>}
        </Reveal>
        <div className="mt-12">{children}</div>
      </div>
    </section>
  );
}
