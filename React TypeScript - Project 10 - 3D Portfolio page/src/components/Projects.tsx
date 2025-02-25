import projectsData from './projectsData.json';
import { ProjectsItem } from './ProjectsItem';

export function Projects() {
  return (
    <>
      <div className='Projects'>
        <div className='Projects-header'>Projects</div>
        <div className='Projects-list'>
          {projectsData.map((project) => (
            <ProjectsItem key={project.id} project={project} />
          ))}
        </div>
      </div>
    </>
  );
}
