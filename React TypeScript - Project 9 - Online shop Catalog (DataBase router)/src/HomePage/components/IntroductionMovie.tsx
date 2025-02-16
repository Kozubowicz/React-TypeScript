import { useEffect, useState } from 'react';

export function IntroductionMovie() {
  const words = ['Brain', 'Body'];
  const [index, setIndex] = useState(0);
  const [isShaking, setIsShaking] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      setIsShaking(true);
      setTimeout(() => {
        setIndex((prev) => (prev + 1) % words.length);
        setIsShaking(false);
      }, 500);
    }, 2000);

    return () => clearInterval(interval);
  }, []);
  return (
    <>
      <div className='IntroductionMovie'>
        <div className='IntroductionMovie'>
          <div />
          <div className='IntroductionMovie-H1'>
            <div className={isShaking ? 'shake' : ''}>{words[index]}</div>
            .health
          </div>
          <div className='IntroductionMovie-H3'>
            scroll to learn more
            <i className='fa-solid fa-arrow-down' />
          </div>
        </div>
      </div>
    </>
  );
}
