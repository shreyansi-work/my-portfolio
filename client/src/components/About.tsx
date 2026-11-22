import { profile } from '../data/profile';
import Reveal from './Reveal';
import Section from './Section';

const facts = [
  { label: 'Experience', value: 'Nearly 5 years' },
  { label: 'Based in', value: profile.location },
  { label: 'Core stack', value: 'React.js, Node.js, TypeScript' },
  { label: 'Looking for', value: 'Full Stack, React/Node and AI application roles' },
];

export default function About() {
  return (
    <Section id="about" eyebrow="About" title="Building reliable products, end to end">
      <div className="grid grid-cols-1 gap-12 lg:grid-cols-[1.3fr_0.7fr]">
        <Reveal>
          <div className="space-y-5 text-base leading-relaxed text-slate-600 dark:text-slate-400">
            <p>
              I’m a Full Stack Developer with nearly 5 years of experience building web and mobile applications, including SaaS platforms and AI-powered
              applications. I work across React.js, React Native, Next.js, Node.js, Express.js, NestJS, TypeScript, MongoDB and PostgreSQL.
            </p>
            <p>
              My work covers REST APIs, real-time systems, payment workflows, subscriptions and third-party integrations, along with production debugging and
              performance optimization. I like owning a feature from the API contract to the user interface and following it into production.
            </p>
            <p>
              I’m increasingly building AI-powered applications. I have hands-on experience with Python, RAG, MCP and agentic AI, and I use AI-assisted
              development in my daily workflow. I’m most interested in practical systems, for example answering questions from real documents with
              citations, where accuracy matters more than hype.
            </p>
          </div>
        </Reveal>

        <Reveal delay={100}>
          <dl className="divide-y divide-slate-200 rounded-2xl border border-slate-200 bg-white dark:divide-white/10 dark:border-white/10 dark:bg-white/[0.03]">
            {facts.map((f) => (
              <div key={f.label} className="px-5 py-4">
                <dt className="text-xs font-medium uppercase tracking-wider text-slate-500 dark:text-slate-400">{f.label}</dt>
                <dd className="mt-1 text-sm font-medium">{f.value}</dd>
              </div>
            ))}
          </dl>
        </Reveal>
      </div>
    </Section>
  );
}
