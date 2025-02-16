import { useEffect, useRef } from 'react';
import { SiencePageItem } from './SiencePageItem';

type SienceItemProps = {
  item: SiencePageItem;
};

export function SienceItem({ item }: SienceItemProps) {
  const { title, body, img } = item;

  const refDes = useRef(null);
  const refImg = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('slideIn');
          } else {
            entry.target.classList.remove('slideIn');
          }
        });
      },
      { threshold: 0.8 }
    );

    if (refDes.current) observer.observe(refDes.current);
    if (refImg.current) observer.observe(refImg.current);

    return () => observer.disconnect();
  }, []);

  return (
    <>
      <div className='SiencePage-item--des' ref={refDes}>
        <div className='SiencePage-item--des-title'>{title}</div>
        <div className='SiencePage-item--des-body'>{body}</div>
      </div>
      <div className='SiencePage-item--img' ref={refImg}>
        <img src={img} />
      </div>
    </>
  );
}
