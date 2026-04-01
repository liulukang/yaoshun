'use client';

import {useEffect, useRef} from 'react';

interface RevealSectionProps {
  id?: string;
  className?: string;
  children: React.ReactNode;
}

export function RevealSection({id, className, children}: RevealSectionProps) {
  const ref = useRef<HTMLElement | null>(null);

  useEffect(() => {
    const node = ref.current;
    if (!node) {
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-visible');
            observer.unobserve(entry.target);
          }
        });
      },
      {
        threshold: 0.2,
        rootMargin: '0px 0px -8% 0px'
      }
    );

    observer.observe(node);

    return () => {
      observer.disconnect();
    };
  }, []);

  return (
    <section id={id} ref={ref} data-reveal className={className}>
      {children}
    </section>
  );
}
