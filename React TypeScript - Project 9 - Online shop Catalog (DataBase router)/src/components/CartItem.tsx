import { useShopContext } from '../context/Context';
import { CartDataItem } from './CartDataItem';

type CartItemProps = {
  item: CartDataItem;
};

export function CartItem({ item }: CartItemProps) {
  const { _id, name, img, quantity, price } = item;

  const { cleanFromCart, addTocart, reduceFromCart } = useShopContext();

  return (
    <>
      <div className='CartItem'>
        <div className='CartItem-left'>
          <i className='fa fa-close' onClick={() => cleanFromCart(_id)} />
          <div className='CartItem-img'>
            <img src={img} />
          </div>
          {name}
        </div>

        <div className='CartItem-right'>
          <div className='CartItem-container'>{price * quantity}$</div>
          <div>
            <i className='fa fa-minus' onClick={() => reduceFromCart(_id)} />

            {quantity}
            <i className='fa fa-add' onClick={() => addTocart(_id)} />
          </div>
        </div>
      </div>
    </>
  );
}
