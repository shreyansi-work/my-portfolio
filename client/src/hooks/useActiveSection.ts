import { useEffect, useState } from 'react';

/** Returns the id of the section currently in the middle of the viewport (for nav highlighting). */
export function useActiveSection(ids: string[]) {
  const [active, setActive] = useState('');

  useEffect(() => {
    if (!('IntersectionObserver' in window)) return;
    const observer = new IntersectionObserver(
      (entries) => {
        for (const e of entries) if (e.isIntersecting) setActive(e.target.id);
      },
      { rootMargin: '-40% 0px -55% 0px' },
    );
    ids.forEach((id) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });
    return () => observer.disconnect();
  }, [ids]);

  return active;
}
