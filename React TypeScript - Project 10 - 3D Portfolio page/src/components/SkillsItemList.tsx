import { useRef, useState, useEffect } from 'react';

type SkillsItemListProps = {
  skill: { id: number; body: string };
};
export function SkillsItemList({ skill }: SkillsItemListProps) {
  const { body } = skill;

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
      <li
        className={`Skills-list-item slideOut ${isVisible ? 'slideIn' : ''}`}
        ref={refItem}
      >
        {body}
      </li>
    </>
  );
}
