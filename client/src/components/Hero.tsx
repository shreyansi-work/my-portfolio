import { profile } from '../data/profile';
import { ArrowRightIcon, DownloadIcon, GithubIcon, LinkedinIcon, MailIcon } from './Icons';

const btnPrimary =
  'inline-flex items-center justify-center gap-2 rounded-lg bg-indigo-600 px-5 py-3 text-sm font-semibold text-white shadow-sm transition hover:bg-indigo-500 active:scale-[0.98]';
const btnSecondary =
  'inline-flex items-center justify-center gap-2 rounded-lg border border-slate-300 bg-white px-5 py-3 text-sm font-semibold text-slate-800 transition hover:border-slate-400 hover:bg-slate-50 active:scale-[0.98] dark:border-white/15 dark:bg-white/5 dark:text-slate-100 dark:hover:bg-white/10';
const btnGhost =
  'inline-flex items-center justify-center gap-2 rounded-lg px-5 py-3 text-sm font-semibold text-slate-700 transition hover:bg-slate-100 dark:text-slate-300 dark:hover:bg-white/10';
const social =
  'grid h-10 w-10 place-items-center rounded-lg border border-slate-200 text-slate-600 transition hover:border-slate-300 hover:text-indigo-600 dark:border-white/10 dark:text-slate-400 dark:hover:text-indigo-400';

export default function Hero() {
  return (
    <section id="home" className="relative overflow-hidden">
      {/* Restrained gradient glow, decorative only */}
      <div aria-hidden className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute -top-40 left-1/2 h-[480px] w-[900px] -translate-x-1/2 rounded-full bg-gradient-to-r from-indigo-300/40 via-violet-300/30 to-sky-300/30 blur-3xl dark:from-indigo-600/25 dark:via-violet-600/20 dark:to-sky-600/15" />
      </div>

      <div className="mx-auto grid grid-cols-1 w-full max-w-6xl items-center gap-14 px-5 pb-14 pt-14 sm:px-8 sm:pt-20 lg:grid-cols-[1.15fr_0.85fr] lg:pb-20">
        <div className="min-w-0">
          <p className="inline-flex items-center gap-2 rounded-full border border-slate-200 bg-white/70 px-3 py-1 text-xs font-medium text-slate-600 backdrop-blur dark:border-white/10 dark:bg-white/5 dark:text-slate-300">
            <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" aria-hidden />
            {profile.location}
          </p>
          <h1 className="mt-6 text-4xl font-semibold leading-[1.1] tracking-tight sm:text-5xl lg:text-6xl">
            Hi, I’m{' '}
            <span className="bg-gradient-to-r from-indigo-600 to-violet-600 bg-clip-text text-transparent dark:from-indigo-400 dark:to-violet-400">
              {profile.name}
            </span>
          </h1>
          <p className="mt-4 text-lg font-medium text-slate-700 sm:text-xl dark:text-slate-300">{profile.title}</p>
          <p className="mt-5 max-w-xl text-base leading-relaxed text-slate-600 dark:text-slate-400">
            {profile.intro} I focus on clean APIs, reliable real-time and payment workflows, and practical AI features built on solid engineering.
          </p>

          <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
            <a href="#projects" className={btnPrimary}>
              View Projects <ArrowRightIcon width={18} height={18} />
            </a>
            <a href={profile.resumeFullStack} download className={btnSecondary}>
              <DownloadIcon width={18} height={18} /> Download Resume
            </a>
            <a href="#contact" className={btnGhost}>
              <MailIcon width={18} height={18} /> Contact Me
            </a>
          </div>

          <div className="mt-8 flex items-center gap-3">
            <a href={profile.linkedin} target="_blank" rel="noopener noreferrer" className={social} aria-label="LinkedIn profile (opens in a new tab)">
              <LinkedinIcon width={18} height={18} />
            </a>
            <a href={profile.github} target="_blank" rel="noopener noreferrer" className={social} aria-label="GitHub profile (opens in a new tab)">
              <GithubIcon width={18} height={18} />
            </a>
          </div>
        </div>

        {/* Profile card built only from verified facts (no photo, no invented numbers) */}
        <div className="relative mx-auto w-full max-w-md">
          <div className="rounded-2xl border border-slate-200 bg-white shadow-xl shadow-indigo-500/5 dark:border-white/10 dark:bg-slate-900 dark:shadow-black/30">
            <div className="flex items-center gap-1.5 border-b border-slate-200 px-4 py-3 dark:border-white/10">
              <span className="h-2.5 w-2.5 rounded-full bg-slate-300 dark:bg-white/20" />
              <span className="h-2.5 w-2.5 rounded-full bg-slate-300 dark:bg-white/20" />
              <span className="h-2.5 w-2.5 rounded-full bg-slate-300 dark:bg-white/20" />
              <span className="ml-3 font-mono text-xs text-slate-500 dark:text-slate-400">profile.json</span>
            </div>
            <pre className="overflow-x-auto p-5 font-mono text-[13px] leading-7 text-slate-700 dark:text-slate-300" aria-label="Profile summary">
              <code>
                {'{\n'}
                {'  '}<span className="text-indigo-600 dark:text-indigo-400">"role"</span>: <span className="text-emerald-600 dark:text-emerald-400">"Full Stack Developer"</span>,{'\n'}
                {'  '}<span className="text-indigo-600 dark:text-indigo-400">"experience"</span>: <span className="text-emerald-600 dark:text-emerald-400">"5 years"</span>,{'\n'}
                {'  '}<span className="text-indigo-600 dark:text-indigo-400">"frontend"</span>: [<span className="text-emerald-600 dark:text-emerald-400">"React.js"</span>, <span className="text-emerald-600 dark:text-emerald-400">"React Native"</span>],{'\n'}
                {'  '}<span className="text-indigo-600 dark:text-indigo-400">"backend"</span>: [<span className="text-emerald-600 dark:text-emerald-400">"Node.js"</span>, <span className="text-emerald-600 dark:text-emerald-400">"NestJS"</span>],{'\n'}
                {'  '}<span className="text-indigo-600 dark:text-indigo-400">"databases"</span>: [<span className="text-emerald-600 dark:text-emerald-400">"MongoDB"</span>, <span className="text-emerald-600 dark:text-emerald-400">"PostgreSQL"</span>],{'\n'}
                {'  '}<span className="text-indigo-600 dark:text-indigo-400">"ai"</span>: [<span className="text-emerald-600 dark:text-emerald-400">"RAG"</span>, <span className="text-emerald-600 dark:text-emerald-400">"MCP"</span>, <span className="text-emerald-600 dark:text-emerald-400">"Agentic AI"</span>],{'\n'}
                {'  '}<span className="text-indigo-600 dark:text-indigo-400">"location"</span>: <span className="text-emerald-600 dark:text-emerald-400">"Surat, India"</span>{'\n'}
                {'}'}
              </code>
            </pre>
          </div>
        </div>
      </div>
    </section>
  );
}
