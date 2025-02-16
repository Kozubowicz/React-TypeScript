import { createContext, ReactNode, useContext, useState } from 'react';
import { Product } from '../product';
import { useLocalStorage } from '../hooks/useLocalStorage';

type ShoppingCartItem = { _id: string; quantity: number };

type ShopContextProps = {
  children: ReactNode;
};

type ShopContext = {
  isShoppingCartActive: boolean;
  toggleShoppingCart: () => void;
  shoppingCart: ShoppingCartItem[];
  addTocart: (_id: string) => void;
  reduceFromCart: (_id: string) => void;
  cleanFromCart: (_id: string) => void;
  cleanAllFromCart: () => void;
  fetchReccomendedProductsFromServer: () => Promise<Product[]>;
  fetchProductsSiteFromServer: (
    siteIndex: number,
    itemsPerPage: number,
    query?: string
  ) => Promise<{ numOfproducts: number; products: Product[] }>;
  fetchCartProductsDataFromServer: (
    cart: { _id: string }[]
  ) => Promise<Product[]>;
};

const ShopContext = createContext({} as ShopContext);

export function useShopContext() {
  return useContext(ShopContext);
}

export function ShopContextProvider({ children }: ShopContextProps) {
  const [isShoppingCartActive, setIsShoppingCartActive] =
    useState<boolean>(false);
  const [shoppingCart, setShoppingCart] = useLocalStorage<ShoppingCartItem[]>(
    'Cart',
    []
  );

  const toggleShoppingCart = () => {
    setIsShoppingCartActive((prev) => !prev);
  };

  const fetchProductsSiteFromServer = async (
    siteIndex = 1,
    itemsPerPage = 12,
    query?: string
  ): Promise<{ numOfproducts: number; products: Product[] }> => {
    try {
      const response = await fetch(
        'https://us-east-1.aws.data.mongodb-api.com/app/healthyshopapi-twcszmi/endpoint/getProducts',
        {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ siteIndex, itemsPerPage, query }),
        }
      );

      if (!response.ok) {
        throw new Error(
          `Http error during fetching data, status: ${response.status} - ${response.statusText}`
        );
      }

      const data = await response.json();

      return data;
    } catch (error) {
      console.error('Error fetching data:', error);
      throw error;
    }
  };

  const fetchReccomendedProductsFromServer = async (): Promise<Product[]> => {
    try {
      const response = await fetch(
        'https://us-east-1.aws.data.mongodb-api.com/app/healthyshopapi-twcszmi/endpoint/getRecommended'
      );

      if (!response.ok) {
        throw new Error(
          `Error during fetching recommended, status: ${response.status} - ${response.statusText}`
        );
      }

      const data = await response.json();

      return data;
    } catch (error) {
      console.error(`Error during fetching recommended: ${error}`);
      throw error;
    }
  };

  const fetchCartProductsDataFromServer = async (
    cart: { _id: string }[]
  ): Promise<Product[]> => {
    try {
      const response = await fetch(
        'https://us-east-1.aws.data.mongodb-api.com/app/healthyshopapi-twcszmi/endpoint/getProductsFromCart',
        {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ cart }),
        }
      );

      if (!response.ok) {
        throw new Error(
          `Error during fetching products data, status: ${response.status} - ${response.statusText}`
        );
      }

      const data = await response.json();
      return data;
    } catch (error) {
      console.error(`Error during fetching products data: ${error}`);
      throw error;
    }
  };

  const addTocart = (_id: string) => {
    setShoppingCart((prev) => {
      const tmp = prev.find((el) => el._id === _id);

      if (tmp) {
        return prev.map((el) =>
          el._id === _id ? { ...el, quantity: el.quantity + 1 } : el
        );
      } else {
        return [...prev, { _id, quantity: 1 }];
      }
    });
  };

  const reduceFromCart = (_id: string) => {
    setShoppingCart((prev) => {
      const tmp = prev.find((el) => el._id === _id);

      if (tmp && tmp.quantity > 1) {
        return prev.map((el) =>
          el._id === _id ? { ...el, quantity: el.quantity - 1 } : el
        );
      } else {
        return prev.filter((el) => el._id !== _id);
      }
    });
  };

  const cleanFromCart = (_id: string) => {
    setShoppingCart((prev) => prev.filter((el) => el._id !== _id));
  };

  const cleanAllFromCart = () => {
    setShoppingCart([]);
  };

  return (
    <ShopContext.Provider
      value={{
        isShoppingCartActive,
        toggleShoppingCart,
        shoppingCart,
        fetchProductsSiteFromServer,
        fetchReccomendedProductsFromServer,
        fetchCartProductsDataFromServer,
        addTocart,
        reduceFromCart,
        cleanFromCart,
        cleanAllFromCart,
      }}
    >
      {children}
    </ShopContext.Provider>
  );
}
