import { personalProjects, professionalProjects, type Project } from '../data/projects';
import { ChevronDownIcon, ExternalIcon } from './Icons';
import Reveal from './Reveal';
import Section from './Section';

// Full class names are written out so Tailwind can detect them.
const ACCENT = {
  indigo: { bar: 'from-indigo-500 to-violet-500', badge: 'text-indigo-700 bg-indigo-50 dark:text-indigo-300 dark:bg-indigo-500/10' },
  violet: { bar: 'from-violet-500 to-fuchsia-500', badge: 'text-violet-700 bg-violet-50 dark:text-violet-300 dark:bg-violet-500/10' },
  sky: { bar: 'from-sky-500 to-indigo-500', badge: 'text-sky-700 bg-sky-50 dark:text-sky-300 dark:bg-sky-500/10' },
  emerald: { bar: 'from-emerald-500 to-teal-500', badge: 'text-emerald-700 bg-emerald-50 dark:text-emerald-300 dark:bg-emerald-500/10' },
} as const;

function ProjectCard({ project, pointsLabel }: { project: Project; pointsLabel: string }) {
  const a = ACCENT[project.accent];
  return (
    <article className="flex h-full flex-col overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm transition hover:-translate-y-0.5 hover:shadow-md dark:border-white/10 dark:bg-white/[0.03]">
      <div aria-hidden className={`h-1.5 bg-gradient-to-r ${a.bar}`} />
      <div className="flex flex-1 flex-col p-6 sm:p-7">
        <span className={`w-fit rounded-full px-2.5 py-1 text-xs font-semibold ${a.badge}`}>{project.category}</span>
        <h3 className="mt-4 text-xl font-semibold tracking-tight">{project.name}</h3>
        <p className="mt-1 text-sm font-medium text-slate-500 dark:text-slate-400">{project.subtitle}</p>
        <p className="mt-4 text-sm leading-relaxed text-slate-600 dark:text-slate-400">{project.summary}</p>

        <ul className="mt-5 flex flex-wrap gap-2" aria-label="Technologies used">
          {project.tech.map((t) => (
            <li key={t} className="rounded-full border border-slate-200 bg-slate-50 px-2.5 py-1 text-xs font-medium text-slate-700 dark:border-white/10 dark:bg-white/5 dark:text-slate-300">
              {t}
            </li>
          ))}
        </ul>

        <details className="group mt-5 border-t border-slate-100 pt-4 dark:border-white/10">
          <summary className="flex cursor-pointer items-center justify-between rounded-md text-sm font-semibold text-slate-800 dark:text-slate-100">
            {pointsLabel}
            <ChevronDownIcon className="chevron h-5 w-5 text-slate-500 transition-transform" />
          </summary>
          <ul className="mt-4 space-y-2.5 text-sm leading-relaxed text-slate-600 dark:text-slate-400">
            {project.points.map((p) => (
              <li key={p} className="flex gap-3">
                <span aria-hidden className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-indigo-500" />
                <span>{p}</span>
              </li>
            ))}
          </ul>
        </details>

        {project.note && <p className="mt-4 text-xs leading-relaxed text-slate-500 dark:text-slate-500">{project.note}</p>}

        {project.links && project.links.length > 0 && (
          <div className="mt-auto flex flex-wrap gap-3 pt-6">
            {project.links.map((l) => (
              <a
                key={l.href}
                href={l.href}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 rounded-lg border border-slate-300 px-3.5 py-2 text-sm font-semibold text-slate-800 transition hover:border-indigo-400 hover:text-indigo-600 dark:border-white/15 dark:text-slate-100 dark:hover:text-indigo-400"
              >
                {l.label}
                <ExternalIcon width={14} height={14} />
                <span className="sr-only"> (opens in a new tab)</span>
              </a>
            ))}
          </div>
        )}
      </div>
    </article>
  );
}

export default function Projects() {
  return (
    <Section
      id="projects"
      eyebrow="Projects"
      title="Selected work"
      description="Professional products I built at WebOsmotic, and a personal AI project. Employer projects are described at a high level; no private code, data or customer details are shown."
      muted
    >
      <Reveal>
        <h3 className="text-sm font-semibold uppercase tracking-[0.14em] text-slate-500 dark:text-slate-400">Professional projects</h3>
      </Reveal>
      <div className="mt-6 grid gap-6 md:grid-cols-2">
        {professionalProjects.map((p, i) => (
          <Reveal key={p.name} delay={(i % 2) * 80}>
            <ProjectCard project={p} pointsLabel="Key contributions" />
          </Reveal>
        ))}
      </div>

      <Reveal className="mt-16">
        <h3 className="text-sm font-semibold uppercase tracking-[0.14em] text-slate-500 dark:text-slate-400">Personal projects</h3>
      </Reveal>
      <div className="mt-6 grid gap-6 md:grid-cols-2">
        {personalProjects.map((p, i) => (
          <Reveal key={p.name} delay={(i % 2) * 80}>
            <ProjectCard project={p} pointsLabel="Features" />
          </Reveal>
        ))}
      </div>
    </Section>
  );
}
