import { SkillsItem } from './SkillsItem';

const frontEndSkills = [
  { id: 1, name: 'HTML', img: '/logos/HTML.png' },
  { id: 2, name: 'CSS', img: '/logos/CSS.png' },
  { id: 3, name: 'SCSS', img: '/logos/SCSS.png' },
  { id: 4, name: 'JavaScript', img: '/logos/JavaScript.png' },
  { id: 5, name: 'TypeScript', img: '/logos/TypeScript.png' },
  { id: 6, name: 'React.js', img: '/logos/React.png' },
];

const backEndSkills = [
  { id: 7, name: 'REST API', img: '/logos/API.png' },
  { id: 8, name: 'Node.js', img: '/logos/NodeJs.png' },
  { id: 9, name: 'MongoDB', img: '/logos/MongoDB.png' },
];

const otherSkills = [
  { id: 10, name: 'GitHub', img: '/logos/GitHub.png' },
  { id: 11, name: 'Git', img: '/logos/Git.png' },
  { id: 12, name: 'VS Code', img: '/logos/visual.png' },
];

const listedSkills = [
  { id: 101, body: 'Proficiency in Visual Studio Code environment' },
  { id: 102, body: 'Working with GIT version control system' },
  { id: 103, body: 'Knowledge of HTML/CSS' },
  { id: 104, body: 'Understanding of JavaScript' },
  { id: 105, body: 'Understanding of JavaScript design patterns' },
  { id: 106, body: 'Understanding of the Document Object Model (DOM)' },
  { id: 107, body: 'Knowledge of NodeJS/ExpressJS frameworks' },
  { id: 108, body: 'Creating and managing MongoDB databases' },
  { id: 109, body: 'Utilizing the React.Js framework for website development' },
  { id: 110, body: 'Effective use of TypeScript in projects' },
  { id: 111, body: 'Using Rest API for data retrieval and transmission' },
  { id: 112, body: 'Proficiency in Microsoft Office package' },
];

export function Skills() {
  return (
    <>
      <div className='Skills'>
        <div className='Skills-Header'>Skills</div>
        <div className='Skills-windows'>
          <SkillsItem skillsType={'Front-end'} skills={frontEndSkills} />
          <SkillsItem skillsType={'Back-end'} skills={backEndSkills} />
          <SkillsItem skillsType={'Other'} skills={otherSkills} />
        </div>
        <div className='Skills-list'>
          <div className='Skills-list--head'>Listed skill</div>
          <ul className='Skills-list--list'>
            {listedSkills.map((skill) => (
              <li key={skill.id} className='Skills-list--list-item'>
                {skill.body}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </>
  );
}
