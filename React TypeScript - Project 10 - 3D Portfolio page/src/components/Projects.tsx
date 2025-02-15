import projectsData from './projectsData.json';

export function Projects() {
  return (
    <>
      <div className='Projects'>
        <div className='Projects-header'>Projects</div>
        <div className='Projects-list'>
          {projectsData.map((project) => (
            <div className='Projects-list-item'>
              <div className='Projects-list-item--header'>{project.name} </div>
              <div className='Projects-list-item--technologies'>
                {project.technologies.map((technology) => (
                  <div className='technology'>
                    <div className='technology--img'>
                      <img src={`/logos/${technology}.png`} alt={technology} />
                    </div>
                    <div className='technology--name'>{technology}</div>
                  </div>
                ))}

                <div className='Projects-list-item--technologies-item'></div>
              </div>
              <div className='Projects-list-item--buttons'>
                <a
                  href={project.demo}
                  className='Projects-list-item--buttons-item'
                >
                  DEMO
                </a>

                <a
                  href={project.code}
                  className='Projects-list-item--buttons-item'
                >
                  CODE
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}
