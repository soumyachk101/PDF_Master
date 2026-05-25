'use client';

import { useEffect, useRef } from 'react';
import { usePathname, useSearchParams } from 'next/navigation';

export default function ScrollToHash() {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const hash = typeof window !== 'undefined' ? window.location.hash : '';
  const prevPathnameRef = useRef(pathname);

  useEffect(() => {
    if (hash) {
      const id = hash.replace('#', '');

      const scrollToElement = () => {
        const element = document.getElementById(id);
        if (element) {
          setTimeout(() => {
            element.scrollIntoView({ behavior: 'smooth' });
          }, 50);
          return true;
        }
        return false;
      };

      if (!scrollToElement()) {
        const interval = setInterval(() => {
          if (scrollToElement()) {
            clearInterval(interval);
          }
        }, 100);
        const timeout = setTimeout(() => clearInterval(interval), 3000);
        return () => {
          clearInterval(interval);
          clearTimeout(timeout);
        };
      }
    } else if (pathname !== prevPathnameRef.current) {
      window.scrollTo(0, 0);
    }
    prevPathnameRef.current = pathname;
  }, [pathname, searchParams, hash]);

  return null;
}
