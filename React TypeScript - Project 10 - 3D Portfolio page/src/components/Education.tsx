import { EducationItem } from './EducationItem';

const EducationArr = [
  {
    id: 901,
    head: 'Front-end Developer',
    place: 'Mate academy',
    specialization: 'Git, HTML, CSS, JavaScript, Typescript, React, Node.js',
  },
  {
    id: 902,
    head: 'Master of Electronics Engineering',
    place: 'Wrocław University of Science and Technology | 2016-2022',
    specialization: 'Electronic Devices',
  },
  {
    id: 903,
    head: 'IT technician',
    place:
      'Secondary School Complex No. 3 named after Ludwik Czyżewski in Bełchatów | 2012-2016',
    specialization: 'Computer science',
  },
];

export function Education() {
  return (
    <>
      <div className='Education'>
        <div className='Education-title'>Education</div>
        <div className='Education-list'>
          {EducationArr.map((edu) => (
            <EducationItem key={edu.id} education={edu} />
          ))}
        </div>
      </div>
    </>
  );
}
