import { Link, useLocation } from 'react-router-dom';
import { useShopContext } from '../context/Context';
import { useEffect, useState } from 'react';

export function NavBar() {
  const [itemsInCart, setItemsInCart] = useState<number>(0);

  const location = useLocation().pathname;

  const { toggleShoppingCart, shoppingCart } = useShopContext();

  useEffect(() => {
    const itemsNum = shoppingCart.reduce(
      (acumulator, item) => acumulator + item.quantity,
      0
    );

    setItemsInCart(itemsNum);
  }, [shoppingCart]);

  return (
    <>
      <nav className='NavBar'>
        <div className='NavBar-CompanyName'>Healthy Five</div>
        <div className='NavBar-links'>
          <Link
            to='/'
            className={`NavBar-links--item ${
              location === '/' ? 'is-active' : ''
            }`}
          >
            Home
          </Link>
          <Link
            to='/shop'
            className={`NavBar-links--item ${
              location === '/shop' ? 'is-active' : ''
            }`}
          >
            Shop
          </Link>
          <Link
            to='/sience'
            className={`NavBar-links--item ${
              location === '/sience' ? 'is-active' : ''
            }`}
          >
            Sience
          </Link>
          <Link
            to='/learn'
            className={`NavBar-links--item ${
              location === '/learn' ? 'is-active' : ''
            }`}
          >
            Learn
          </Link>
          <Link
            to='/aboutus'
            className={`NavBar-links--item ${
              location === '/aboutus' ? 'is-active' : ''
            }`}
          >
            About Us
          </Link>
          <div className='NavBar-links--item ' onClick={toggleShoppingCart}>
            <i className='fa fa-shopping-cart NavBar-links--item-cart'>
              {itemsInCart > 0 && (
                <i className='NavBar-links--item-cart-quantity'>
                  {itemsInCart}
                </i>
              )}
            </i>
          </div>
        </div>
      </nav>
    </>
  );
}
