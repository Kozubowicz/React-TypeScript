import { useEffect, useRef, useState } from 'react';
import { ProjectItemType } from '../helpers/Project';

type ProjectsItem = {
  project: ProjectItemType;
};

export function ProjectsItem({ project }: ProjectsItem) {
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
      console.log('Observing element:', refItem.current);

      observer.observe(refItem.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <>
      <div
        key={project.id}
        className={`Projects-list-item slideOut ${isVisible ? 'slideIn' : ''} `}
        ref={refItem}
      >
        <div className='Projects-list-item--header'>{project.name} </div>
        <div className='Projects-list-item--description'>
          {project.description}
        </div>
        <div className='Projects-list-item--technologies'>
          {project.technologies.map((technology) => (
            <div key={technology} className='technology'>
              <div className='technology--img'>
                <img src={`./logos/${technology}.png`} alt={technology} />
              </div>
              <div className='technology--name'>{technology}</div>
            </div>
          ))}

          <div className='Projects-list-item--technologies-item'></div>
        </div>
        <div className='Projects-list-item--buttons'>
          <a href={project.demo} className='Projects-list-item--buttons-item'>
            DEMO
          </a>

          <a href={project.code} className='Projects-list-item--buttons-item'>
            CODE
          </a>
        </div>
      </div>
    </>
  );
}
