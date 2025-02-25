import { useRef, useEffect, useState } from 'react';
import { SkillItemType } from './SkillsItemType';
import { motion } from 'framer-motion';

type SkillsItemProps = {
  skillsType: string;
  skills: SkillItemType[];
};

export function SkillsItemWindow({ skillsType, skills }: SkillsItemProps) {
  const [isVisible, setIsVisible] = useState(false);
  const refItem = useRef(null);

  const [rotation, setRotation] = useState({ x: 0, y: 0 });

  const handleMouseMove = (e: React.MouseEvent) => {
    const { clientX, clientY, currentTarget } = e;
    const { left, top, width, height } = currentTarget.getBoundingClientRect();

    const x = ((clientX - left) / width - 0.5) * 30;
    const y = ((clientY - top) / height - 0.5) * 30;

    setRotation({ x: y, y: x });
  };

  const handleMouseLeave = () => {
    setRotation({ x: 0, y: 0 });
  };

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
        className={`Skills-windows-container slideOut ${
          isVisible ? 'slideIn' : ''
        }`}
      >
        <motion.div
          ref={refItem}
          className='Skills-windows-container-item'
          onMouseMove={handleMouseMove}
          onMouseLeave={handleMouseLeave}
          animate={{ rotateX: rotation.x, rotateY: rotation.y }}
          transition={{ type: 'spring', stiffness: 10000, damping: 100 }}
        >
          <div className='Skills-windows-container-item--head'>
            {skillsType}
          </div>
          <div className='Skills-windows-container-item--body'>
            {skills.map((skill) => (
              <div key={skill.id} className='technology'>
                <div className='technology--img'>
                  <img src={skill.img} alt={skill.name} />
                </div>
                <div className='technology--name'>{skill.name}</div>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </>
  );
}
