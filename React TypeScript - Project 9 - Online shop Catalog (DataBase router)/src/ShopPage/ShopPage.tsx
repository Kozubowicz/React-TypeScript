import { useEffect, useState } from 'react';
import { Recommended } from '../components/Recommended';
import { useShopContext } from '../context/Context';
import './ShopPage.css';
import { Product } from '../product';
import { Loader } from '../components/Loader';
import { Item } from '../components/Item';
import { Link } from 'react-router-dom';
export function ShopPage() {
  const [currentSiteIndex, setCurrentSiteIndex] = useState<number>(1);
  const [itemsPerPage, setItemsPerPage] = useState<number>(16);
  const [query, setQuery] = useState<string>('');
  const [foundProducts, setFoundProducts] = useState<number>(-1);
  const [currentSiteProducts, setCurrentSiteProducts] = useState<
    Product[] | undefined
  >(undefined);
  const [numOfSites, setNumOfSites] = useState<number[]>([]);

  const { fetchProductsSiteFromServer } = useShopContext();

  const handleSearch = async () => {
    console.log(
      'Items per page: ',
      itemsPerPage,
      ' Query: ',
      query,
      ' PageIndex: ',
      currentSiteIndex
    );

    try {
      const data = await fetchProductsSiteFromServer(
        currentSiteIndex,
        itemsPerPage,
        query
      );
      setCurrentSiteProducts(data.products);
      setFoundProducts(data.numOfproducts);

      const arr = Array.from(
        { length: Math.ceil(data.numOfproducts / itemsPerPage) },
        (_, i) => i + 1
      );
      setNumOfSites(arr);
    } catch (error) {
      console.error(`Error message: ${error}`);
    }
  };

  useEffect(() => {
    const debounce = setTimeout(() => {
      setCurrentSiteProducts(undefined);
      setNumOfSites([]);
      setCurrentSiteIndex(1);
      setFoundProducts(-1);

      handleSearch();
    }, 500);

    return () => clearTimeout(debounce);
  }, [itemsPerPage, query]);

  useEffect(() => {
    setCurrentSiteProducts(undefined);
    setNumOfSites([]);

    handleSearch();
  }, [currentSiteIndex]);

  return (
    <>
      <div className='ShopPage'>
        <Recommended />
        <div className='ShopPage-Path'>
          <Link to='/' style={{ color: 'white' }}>
            <i className='fa-solid fa-home' />
          </Link>
          <i className='fa-solid fa-angle-right' /> Shop
        </div>
        <div className='ShopPage-Title'>Health Supplements</div>
        <div className='ShopPage-NumInf'>
          Number of all products: {` ${foundProducts}`}
        </div>
        <form className='ShopPage-FilterProps'>
          <label className='ShopPage-FilterProps--item'>
            Items per page:
            <select
              value={itemsPerPage}
              onChange={(e) => setItemsPerPage(Number(e.target.value))}
            >
              <option value={8}>8</option>
              <option value={16}>16</option>
              <option value={24}>24</option>
              <option value={32}>32</option>
            </select>
          </label>
          <label className='ShopPage-FilterProps--item'>
            Search product:
            <input
              placeholder='search product...'
              onChange={(e) => setQuery(e.target.value)}
            />
          </label>
          {query.length > 0 && foundProducts >= 0 && (
            <label className='ShopPage-FilterProps--item'>
              Found products: {foundProducts}
            </label>
          )}
        </form>
        <div className='ShopPage-ItemsContainer'>
          {currentSiteProducts ? (
            <>
              {currentSiteProducts.map((product) => (
                <Item item={product} key={product._id} />
              ))}
            </>
          ) : (
            <Loader />
          )}
        </div>

        {numOfSites.length > 1 ? (
          <div className='ShopPage-SiteNavigator'>
            {numOfSites.map((num) => (
              <div
                key={num}
                className={`Button ShopPage-SiteNavigator--item ${
                  num === currentSiteIndex
                    ? 'ShopPage-SiteNavigator--item-current'
                    : ''
                }`}
                onClick={() => setCurrentSiteIndex(num)}
              >
                {num}
              </div>
            ))}
          </div>
        ) : (
          <></>
        )}
      </div>
    </>
  );
}
