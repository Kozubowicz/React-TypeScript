import { useEffect, useRef, useState } from 'react';
import { SienceItem } from './SienceItem';
import './SiencePage.css';
import sienceItems from './sienceItems.json';

export function SiencePage() {
  const [endMessage] = useState('sience...');
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
      <div className='SiencePage'>
        <div className='SiencePage-List'>
          {sienceItems.map((item, index) => (
            <section
              className='SiencePage-item'
              key={item.id}
              ref={(el) => el && (sectionsRef.current[index] = el)}
            >
              <SienceItem item={item} key={item.id} />
            </section>
          ))}
        </div>
        <section
          className='SiencePage-End'
          ref={(el) => el && (sectionsRef.current[sienceItems.length] = el)}
        >
          {[...endMessage].map((el, i) => (
            <span
              key={el + i.toString()}
              style={{ '--i': i } as React.CSSProperties}
            >
              {el}
            </span>
          ))}
        </section>
      </div>
    </>
  );
}
