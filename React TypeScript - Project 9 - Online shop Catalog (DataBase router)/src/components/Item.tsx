import { useShopContext } from '../context/Context';
import { Product } from '../product';
import './Item.css';

type ItemProps = {
  item: Product;
};

export function Item({ item }: ItemProps) {
  const { _id, img, name, price } = item;

  const { shoppingCart, reduceFromCart, addTocart } = useShopContext();

  const returnQuantity = (): number => {
    const tmp = shoppingCart.find((el) => el._id === _id);
    return tmp ? tmp.quantity : 0;
  };

  const handleReduce = () => {
    reduceFromCart(_id);
  };

  const handleAdd = () => {
    addTocart(_id);
  };

  const quantity = returnQuantity();
  return (
    <>
      <div className='Item' key={_id}>
        <div className='Item-img'>
          <img src={img} />
        </div>
        <div className='Item-name'>{name}</div>
        <div className='Item-price'>{price} $</div>

        {quantity <= 0 ? (
          <button className='Button Item-cart' onClick={handleAdd}>
            Add to cart
          </button>
        ) : (
          <div className='Item-cart--quantity'>
            <i
              className='fa-solid fa-caret-left Item-cart--quantity-button'
              onClick={handleReduce}
            />
            {quantity}
            <i
              className='fa-solid fa-caret-right Item-cart--quantity-button'
              onClick={handleAdd}
            />
          </div>
        )}
      </div>
    </>
  );
}
