import { useEffect, useState, useRef } from 'react';

type EducationItemProps = {
  education: {
    id: number;
    head: string;
    place: string;
    specialization: string;
  };
};
export function EducationItem({ education }: EducationItemProps) {
  const { head, place, specialization } = education;

  const [isVisible, setIsVisible] = useState(false);
  const refItem = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsVisible(true);
          }
        });
      },
      { threshold: 0.5 }
    );

    if (refItem.current) {
      observer.observe(refItem.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <>
      <div
        className={`Education-list-item slideOut ${isVisible ? 'slideIn' : ''}`}
        ref={refItem}
      >
        <div className='Education-list-item--head'>{head}</div>
        <div className='Education-list-item--body'>
          {place}
          <br /> Specialization: {specialization}
        </div>
      </div>
    </>
  );
}
