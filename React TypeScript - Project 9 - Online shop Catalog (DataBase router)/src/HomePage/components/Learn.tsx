import garlic1 from '/img/garlic1.png';
import garlic2 from '/img/garlic2.png';

import bcaa1 from '/img/bcaa1.png';
import bcaa2 from '/img/bcaa2.png';

import slim1 from '/img/slim1.png';
import slim2 from '/img/slim2.png';

export function Learn() {
  return (
    <>
      <div className='Learn'>
        <div className='Learn-item'>
          <img className='Learn-item--img1 ' src={garlic1} />
          <div className='Learn-item--el'>
            <img className='Learn-item--img2' src={garlic2} />
            <div className='Learn-item--des '>
              <div className='Learn-item--des-text'>
                <div className='Learn-item--des-head'>Sundown</div>
                <div className='Learn-item--des-body'>
                  packed with powerful antioxidants, natural garlic extract
                  supports a healthy immune system, promotes cardiovascular
                  health, and helps maintain normal blood pressure levels,{' '}
                  <br />
                  this natural dietary supplement harnesses the benefits of
                  garlic without the strong odor, making it an easy addition to
                  your wellness routine.
                </div>
              </div>
              <button className='Button'>Learn More</button>
            </div>
          </div>
        </div>

        <div className='Learn-item'>
          <img className='Learn-item--img1' src={bcaa1} />
          <div className='Learn-item--el'>
            <img className='Learn-item--img2' src={bcaa2} />
            <div className='Learn-item--des '>
              <div className='Learn-item--des-text'>
                <div className='Learn-item--des-head'>BCAA</div>
                <div className='Learn-item--des-body'>
                  BCAAs (Branched-Chain Amino Acids) are essential nutrients,
                  including leucine, isoleucine, and valine, that support muscle
                  recovery, reduce exercise fatigue, and promote lean muscle
                  growth. Perfect for athletes and fitness enthusiasts, BCAAs
                  fuel your workouts, enhance endurance, and aid in faster
                  post-training recovery.
                </div>
              </div>
              <button className='Button'>Learn More</button>
            </div>
          </div>
        </div>

        <div className='Learn-item'>
          <img className='Learn-item--img1' src={slim1} />
          <div className='Learn-item--el'>
            <img className='Learn-item--img2' src={slim2} />
            <div className='Learn-item--des '>
              <div className='Learn-item--des-text'>
                <div className='Learn-item--des-head'>ForcoSlim</div>
                <div className='Learn-item--des-body'>
                  Is a powerful dietary supplement designed to support weight
                  management by inhibiting lipogenesis and suppressing appetite,
                  making it an ideal companion for your weight loss journey.
                  Enriched with hydroxycitric acid, ForcoSlim helps enhance your
                  metabolism while providing essential nutrients to keep you
                  energized and focused throughout the day.
                </div>
              </div>
              <button className='Button'>Learn More</button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
