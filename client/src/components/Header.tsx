import { useState } from 'react';
import { profile } from '../data/profile';
import { useTheme } from '../hooks/useTheme';
import { useActiveSection } from '../hooks/useActiveSection';
import { CloseIcon, MenuIcon, MoonIcon, SunIcon } from './Icons';

export const NAV = [
  { id: 'about', label: 'About' },
  { id: 'skills', label: 'Skills' },
  { id: 'experience', label: 'Experience' },
  { id: 'projects', label: 'Projects' },
  { id: 'education', label: 'Education' },
  { id: 'contact', label: 'Contact' },
];
const IDS = NAV.map((n) => n.id);

export default function Header() {
  const [open, setOpen] = useState(false);
  const { dark, toggle } = useTheme();
  const active = useActiveSection(IDS);

  const link = (id: string) =>
    `rounded-md px-3 py-2 text-sm font-medium transition-colors ${
      active === id
        ? 'text-indigo-600 dark:text-indigo-400'
        : 'text-slate-600 hover:text-slate-900 dark:text-slate-400 dark:hover:text-white'
    }`;

  return (
    <header className="sticky top-0 z-40 border-b border-slate-200/70 bg-white/80 backdrop-blur-md dark:border-white/10 dark:bg-slate-950/80">
      <div className="mx-auto flex h-16 w-full max-w-6xl items-center justify-between px-5 sm:px-8">
        <a href="#home" className="flex items-center gap-2.5 font-semibold tracking-tight" aria-label={`${profile.name}, home`}>
          <span className="grid h-8 w-8 place-items-center rounded-lg bg-gradient-to-br from-indigo-600 to-violet-600 text-xs font-bold text-white">SA</span>
          <span className="hidden sm:inline">{profile.name}</span>
        </a>

        <nav className="hidden items-center gap-1 md:flex" aria-label="Main">
          {NAV.map((n) => (
            <a key={n.id} href={`#${n.id}`} className={link(n.id)} aria-current={active === n.id ? 'true' : undefined}>
              {n.label}
            </a>
          ))}
        </nav>

        <div className="flex items-center gap-1">
          <button
            type="button"
            onClick={toggle}
            className="grid h-9 w-9 place-items-center rounded-lg text-slate-600 transition-colors hover:bg-slate-100 hover:text-slate-900 dark:text-slate-400 dark:hover:bg-white/10 dark:hover:text-white"
            aria-label={dark ? 'Switch to light theme' : 'Switch to dark theme'}
          >
            {dark ? <SunIcon /> : <MoonIcon />}
          </button>
          <button
            type="button"
            onClick={() => setOpen((v) => !v)}
            className="grid h-9 w-9 place-items-center rounded-lg text-slate-600 hover:bg-slate-100 md:hidden dark:text-slate-400 dark:hover:bg-white/10"
            aria-label={open ? 'Close menu' : 'Open menu'}
            aria-expanded={open}
            aria-controls="mobile-nav"
          >
            {open ? <CloseIcon /> : <MenuIcon />}
          </button>
        </div>
      </div>

      {open && (
        <nav id="mobile-nav" className="border-t border-slate-200 bg-white px-5 py-3 md:hidden dark:border-white/10 dark:bg-slate-950" aria-label="Mobile">
          <ul className="flex flex-col">
            {NAV.map((n) => (
              <li key={n.id}>
                <a href={`#${n.id}`} onClick={() => setOpen(false)} className={`block ${link(n.id)}`}>
                  {n.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>
      )}
    </header>
  );
}
