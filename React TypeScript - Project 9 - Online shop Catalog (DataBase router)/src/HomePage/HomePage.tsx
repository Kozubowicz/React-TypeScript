import { useEffect, useRef } from 'react';
import { IntroductionMovie } from './components/IntroductionMovie';
import { Learn } from './components/Learn';
import { Pills } from './components/Pills';

export function HomePage() {
  const sectionsRef = useRef<HTMLElement[]>([]);

  useEffect(() => {
    const handleWheel = (event: WheelEvent) => {
      event.preventDefault();
      const direction = event.deltaY > 0 ? 1 : -1;

      const middleIndex = sectionsRef.current.findIndex((section) => {
        const rect = section.getBoundingClientRect();
        return (
          rect.top <= window.innerHeight / 2 &&
          rect.bottom >= window.innerHeight / 2
        );
      });

      const nextIndex = Math.min(
        Math.max(middleIndex + direction, 0),
        sectionsRef.current.length - 1
      );

      sectionsRef.current[nextIndex]?.scrollIntoView({
        behavior: 'smooth',
        block: 'center',
      });
    };

    window.addEventListener('wheel', handleWheel, { passive: false });

    return () => {
      window.removeEventListener('wheel', handleWheel);
    };
  }, []);

  return (
    <>
      <div className='HomePage'>
        <section ref={(el) => el && (sectionsRef.current[0] = el)}>
          <IntroductionMovie />
        </section>

        <section ref={(el) => el && (sectionsRef.current[1] = el)}>
          <Learn />
        </section>

        <section ref={(el) => el && (sectionsRef.current[2] = el)}>
          <Pills />
        </section>
      </div>
    </>
  );
}
