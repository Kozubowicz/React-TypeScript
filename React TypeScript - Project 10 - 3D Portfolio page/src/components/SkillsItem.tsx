import { useState } from 'react';
import { SkillItemType } from './SkillsItemType';
import { motion } from 'framer-motion';

type SkillsItemProps = {
  skillsType: string;
  skills: SkillItemType[];
};

export function SkillsItem({ skillsType, skills }: SkillsItemProps) {
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

  return (
    <>
      <motion.div
        className='Skills-windows-item'
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        animate={{ rotateX: rotation.x, rotateY: rotation.y }}
        transition={{ type: 'spring', stiffness: 10000, damping: 100 }}
      >
        <div className='Skills-windows-item--head'>{skillsType}</div>
        <div className='Skills-windows-item--body'>
          {skills.map((skill) => (
            <div className='technology'>
              <div className='technology--img'>
                <img src={skill.img} alt={skill.name} />
              </div>
              <div className='technology--name'>{skill.name}</div>
            </div>
          ))}
        </div>
      </motion.div>
    </>
  );
}
