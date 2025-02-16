import { useEffect, useState } from 'react';
import { useShopContext } from '../context/Context';
import { Product } from '../product';
import './Recommended.css';
import { Loader } from './Loader';
import { Item } from './Item';

export function Recommended() {
  const [products, setProducts] = useState<Product[] | undefined>(undefined);
  const [offset, setOffset] = useState<number>(0);
  const [isAnimated, setIsAnimated] = useState<boolean>(true);

  const { fetchReccomendedProductsFromServer } = useShopContext();

  useEffect(() => {
    const handeFetchData = async () => {
      try {
        const data = await fetchReccomendedProductsFromServer();

        setProducts([
          ...data,
          ...data.slice(0, 5).map((el) => ({ ...el, _id: el._id + 100 })),
        ]);
      } catch (error) {
        console.error(`Error message: ${error}`);
      }
    };

    handeFetchData();
  }, []);

  useEffect(() => {
    if (products) {
      const interval = setInterval(
        () => setOffset((prev) => (prev += 20)),
        5000
      );

      return () => clearInterval(interval);
    }
  }, [products]);

  useEffect(() => {
    if (products) {
      const totalOffset = 13 * 20;

      if (offset >= totalOffset) {
        setIsAnimated(false);
        setOffset(0);

        setTimeout(() => setIsAnimated(true), 10);
      }
    }
  }, [offset, products]);

  return (
    <>
      <div className='Recommended'>
        <div className='RecommendedHeader'>Recommenmded products</div>
        <div
          className={`RecommendedList ${
            isAnimated ? 'RecommendedList-Animation' : ''
          }`}
          style={{ transform: `translateX(${-offset}vw)` }}
        >
          {products ? (
            products.map((item) => <Item item={item} key={item._id} />)
          ) : (
            <Loader />
          )}
        </div>
      </div>
    </>
  );
}
