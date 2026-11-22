import { jobs } from '../data/experience';
import Reveal from './Reveal';
import Section from './Section';

export default function Experience() {
  return (
    <Section id="experience" eyebrow="Experience" title="Where I’ve worked" description="Five years across product teams in Surat.">
      <ol className="relative space-y-8 border-l border-slate-200 pl-6 sm:pl-10 dark:border-white/10">
        {jobs.map((job, i) => (
          <li key={job.company} className="relative">
            <span aria-hidden className="absolute -left-[31px] top-7 h-3 w-3 rounded-full border-2 border-indigo-500 bg-white sm:-left-[47px] dark:bg-slate-950" />
            <Reveal delay={i * 80}>
              <article className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm sm:p-8 dark:border-white/10 dark:bg-white/[0.03]">
                <div className="flex flex-col gap-1 sm:flex-row sm:items-baseline sm:justify-between">
                  <div>
                    <h3 className="text-lg font-semibold tracking-tight">{job.role}</h3>
                    <p className="text-sm font-medium text-indigo-600 dark:text-indigo-400">{job.company}</p>
                  </div>
                  <p className="text-sm text-slate-500 dark:text-slate-400">
                    {job.period}
                    {job.location ? ` · ${job.location}` : ''}
                  </p>
                </div>

                <ul className="mt-5 space-y-3 text-sm leading-relaxed text-slate-600 dark:text-slate-400">
                  {job.highlights.map((h) => (
                    <li key={h} className="flex gap-3">
                      <span aria-hidden className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-indigo-500" />
                      <span>{h}</span>
                    </li>
                  ))}
                </ul>

                {job.workedOn && (
                  <div className="mt-6 flex flex-wrap items-center gap-2 border-t border-slate-100 pt-5 dark:border-white/10">
                    <span className="text-xs font-medium uppercase tracking-wider text-slate-500 dark:text-slate-400">Projects</span>
                    {job.workedOn.map((p) => (
                      <a
                        key={p}
                        href="#projects"
                        className="rounded-full border border-slate-200 px-3 py-1 text-xs font-medium text-slate-700 transition hover:border-indigo-400 hover:text-indigo-600 dark:border-white/10 dark:text-slate-300 dark:hover:text-indigo-400"
                      >
                        {p}
                      </a>
                    ))}
                  </div>
                )}
              </article>
            </Reveal>
          </li>
        ))}
      </ol>
    </Section>
  );
}
