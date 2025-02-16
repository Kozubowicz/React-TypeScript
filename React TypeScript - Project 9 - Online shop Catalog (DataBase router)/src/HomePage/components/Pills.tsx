import { useEffect, useRef } from 'react';

import img1 from '/img/img1.png';
import img2 from '/img/img2.png';

import pills from '/img/pills.png';

export function Pills() {
  const textRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
        } else {
          entry.target.classList.remove('visible');
        }
      },
      { threshold: 0.9 }
    );

    if (textRef.current) observer.observe(textRef.current);

    return () => observer.disconnect();
  }, []);

  return (
    <>
      <div className='Pills'>
        <div className='Pills-Animation'>
          <img
            src={img1}
            className='Pills-Animation--img Pills-Animation--img-1'
          />

          <img
            src={img2}
            className='Pills-Animation--img Pills-Animation--img-2'
          />
          <img
            src={img2}
            className='Pills-Animation--img Pills-Animation--img-3'
          />
          <img
            src={pills}
            className='Pills-Animation--img Pills-Animation--img-4'
          />
        </div>
        <div className='Pills-Header' ref={textRef}>
          <div className='Pills-Header--1'>Our Jouney to save people lives</div>

          <div className='Pills-Header--2'>
            Our journey began when our founder, Kim Lee vowed to save number of
            people by seeling then the best supplements
          </div>
        </div>
      </div>
    </>
  );
}
