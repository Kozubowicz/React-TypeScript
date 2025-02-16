import { useState } from 'react';
import { LearnItemType } from './LearnItemType';

type LearnItemProps = {
  item: LearnItemType;
};

export function LearnItem({ item }: LearnItemProps) {
  const {
    imgs,
    name,
    description,
    recommendedDosage,
    types,
    benefits,
    potentialSideEffects,
    popularBrands,
  } = item;

  const [mainImg, setMainImg] = useState(imgs[0]);
  return (
    <>
      <div className='LearnPageItem'>
        <div className='LearnPageItem-gallery'>
          <div className='LearnPageItem-gallery-Top'>
            <img src={mainImg} />
          </div>
          <div className='LearnPageItem-gallery-bottom'>
            {imgs.map((el) => (
              <img
                src={el}
                key={el}
                onClick={() => setMainImg(el)}
                className={el === mainImg ? 'selected-img ' : ''}
              />
            ))}
          </div>
        </div>
        <div className='LearnPageItem-des'>
          <div className='LearnPageItem-des--title'>{name}</div>
          <div className='LearnPageItem-des--body'>{description}</div>
          <div className='LearnPageItem-des--body'>
            <b>Recommended dosage: </b>
            {recommendedDosage}
          </div>
          <div className='LearnPageItem-des--details'>
            <div className='LearnPageItem-des--details-div'>
              <b>Types:</b>
              <ul>
                {types.map((el) => (
                  <li key={el}>{el}</li>
                ))}
              </ul>
            </div>

            <div className='LearnPageItem-des--details-div'>
              <b>Benefits:</b>
              <ul>
                {benefits.map((el) => (
                  <li key={el}>{el}</li>
                ))}
              </ul>
            </div>

            <div className='LearnPageItem-des--details-div'>
              <b>Potential side effects:</b>
              <ul>
                {potentialSideEffects.map((el) => (
                  <li key={el}>{el}</li>
                ))}
              </ul>
            </div>

            <div className='LearnPageItem-des--details-div'>
              <b>Popular brands:</b>
              <ul>
                {popularBrands.map((el) => (
                  <li key={el}>{el}</li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
