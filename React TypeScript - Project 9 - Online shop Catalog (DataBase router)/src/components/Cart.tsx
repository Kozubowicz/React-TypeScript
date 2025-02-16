import { useEffect, useRef, useState } from 'react';
import { useShopContext } from '../context/Context';
import './Cart.css';
import { CartItem } from './CartItem';
import { CartDataItem } from './CartDataItem';
import { Loader } from './Loader';

export function Cart() {
  const {
    isShoppingCartActive,
    toggleShoppingCart,
    shoppingCart,
    fetchCartProductsDataFromServer,
  } = useShopContext();

  const [shoppingCartData, setShoppingCartData] = useState<
    CartDataItem[] | undefined
  >(undefined);
  const prevShoppingCartRef = useRef<{ _id: string; quantity: number }[]>([]);

  useEffect(() => {
    const handleFetchCartdata = async () => {
      try {
        const _ids = shoppingCart.map((el) => ({
          _id: el._id,
        }));

        const response = await fetchCartProductsDataFromServer(_ids);

        const cartData = shoppingCart.map((item) => {
          const data = response.find((el) => el._id === item._id);

          return data
            ? { ...item, ...data }
            : { ...item, name: 'No longer available', img: '', price: 0 };
        });

        console.log(cartData);
        setShoppingCartData(cartData);
      } catch (error) {
        console.error(`Error message ${error}`);
      }
    };

    const handleQuantityUpdate = () => {
      if (shoppingCartData) {
        const cartData = shoppingCart
          .map((item) => {
            const tmp = shoppingCartData.find((el) => el._id === item._id);
            return {
              ...tmp,
              quantity: item.quantity,
            };
          })
          .filter(Boolean) as CartDataItem[];

        console.log(cartData);
        setShoppingCartData(cartData);
      } else {
        setShoppingCartData([]);
      }
    };

    // Checking if there is need for fetching data of new items or only quantity update
    if (shoppingCart.length > prevShoppingCartRef.current.length) {
      handleFetchCartdata();
    } else {
      handleQuantityUpdate();
    }

    prevShoppingCartRef.current = shoppingCart;
  }, [shoppingCart]);

  const cartPrice = (): number => {
    let price = 0;
    if (shoppingCartData) {
      shoppingCartData.forEach((item) => (price += item.price * item.quantity));
    }

    return price;
  };
  return (
    <>
      <div className={`Cart ${isShoppingCartActive ? 'Cart-isOpen' : ''} `}>
        <div className='Cart-Top'>
          Shopping Cart
          <i className='fa fa-close' onClick={toggleShoppingCart} />
        </div>
        {shoppingCartData && shoppingCartData.length > 0 && (
          <div className='Cart-list'>
            {shoppingCartData.map((item, index) => (
              <CartItem item={item} key={item._id || index} />
            ))}
          </div>
        )}
        {!shoppingCartData && <Loader />}
        {shoppingCartData && shoppingCartData.length > 0 && (
          <div className='Cart-Bottom'>To pay: {cartPrice()} $</div>
        )}
        {shoppingCartData && shoppingCartData.length === 0 && (
          <div className='Cart-Bottom'>No items in Cart</div>
        )}
      </div>
    </>
  );
}
