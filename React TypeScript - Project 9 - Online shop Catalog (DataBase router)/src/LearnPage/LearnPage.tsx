import { LearnItem } from './LearnItem';
import './LearnPage.css';
import LearnItems from './Learndata.json';

export function LearnPage() {
  return (
    <>
      <div className='LearnPage'>
        {LearnItems.map((item) => (
          <LearnItem item={item} key={item.id} />
        ))}
      </div>
    </>
  );
}
