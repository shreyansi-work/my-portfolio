import { skillGroups } from '../data/skills';
import Reveal from './Reveal';
import Section from './Section';

export default function Skills() {
  return (
    <Section id="skills" eyebrow="Technical skills" title="Tools I work with" description="Grouped by what I use them for." muted>
      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {skillGroups.map((g, i) => (
          <Reveal key={g.title} delay={i * 60}>
            <div className="h-full rounded-2xl border border-slate-200 bg-white p-6 shadow-sm transition hover:-translate-y-0.5 hover:shadow-md dark:border-white/10 dark:bg-white/[0.03]">
              <h3 className="text-sm font-semibold tracking-wide">{g.title}</h3>
              <ul className="mt-4 flex flex-wrap gap-2">
                {g.skills.map((s) => (
                  <li
                    key={s}
                    className="rounded-full border border-slate-200 bg-slate-50 px-3 py-1 text-xs font-medium text-slate-700 dark:border-white/10 dark:bg-white/5 dark:text-slate-300"
                  >
                    {s}
                  </li>
                ))}
              </ul>
            </div>
          </Reveal>
        ))}
      </div>
    </Section>
  );
}
