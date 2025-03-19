import { CiSquareMinus, CiSquarePlus } from 'react-icons/ci';

import { useAppContext } from '../context/Context';
import './Counter.scss';

export function Counter() {
  const { counterVal, increaseCounter, decreaseCounter } = useAppContext();

  return (
    <>
      <div className='Counter'>
        <button className='Counter--Button' onClick={decreaseCounter}>
          <CiSquareMinus size={50} />
        </button>
        <div className='Counter--Value'>{counterVal}</div>
        <button className='Counter--Button' onClick={increaseCounter}>
          <CiSquarePlus size={50} />
        </button>
      </div>
    </>
  );
}
