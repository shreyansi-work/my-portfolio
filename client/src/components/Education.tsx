import { education } from '../data/education';
import Reveal from './Reveal';
import Section from './Section';

export default function Education() {
  return (
    <Section id="education" eyebrow="Education" title="Education">
      <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
        {education.map((e, i) => (
          <Reveal key={e.degree} delay={i * 80}>
            <div className="h-full rounded-2xl border border-slate-200 bg-white p-6 shadow-sm dark:border-white/10 dark:bg-white/[0.03]">
              <h3 className="text-base font-semibold tracking-tight">{e.degree}</h3>
              <p className="mt-2 text-sm text-slate-600 dark:text-slate-400">{e.institute}</p>
            </div>
          </Reveal>
        ))}
      </div>
    </Section>
  );
}
