import { Routes, Route, Navigate } from 'react-router-dom';
import '@fortawesome/fontawesome-free/css/all.min.css';
import { ErrorMessage } from './components/ErrorMessage';
import { Footer } from './components/Footer';
import { Header } from './components/Header';
import { AccessoriesPage } from './pages/AccessoriesPage';
import { CartPage } from './pages/CartPage';
import { FavoritesPage } from './pages/FavoritesPage';
import { HomePage } from './pages/HomePage';
import { PhonesPage } from './pages/PhonesPage';
import { ProductDetailsPage } from './pages/ProductDetailsPage';
import { TabletsPage } from './pages/TabletsPage';
import { useMyContext } from './context/context';

function App() {
  const { error } = useMyContext();

  return (
    <>
      <div className='App'>
        <Header />
        <Routes>
          <Route path='/' element={<HomePage />} />
          <Route path='/home' element={<Navigate to='/' />} />

          <Route path='/phones'>
            <Route index element={<PhonesPage />} />
            <Route path=':productId' element={<ProductDetailsPage />} />
          </Route>

          <Route path='/tablets'>
            <Route index element={<TabletsPage />} />
            <Route path=':productId' element={<ProductDetailsPage />} />
          </Route>

          <Route path='/accessories'>
            <Route index element={<AccessoriesPage />} />
            <Route path=':productId' element={<ProductDetailsPage />} />
          </Route>

          <Route path='/favorites' element={<FavoritesPage />} />
          <Route path='/cart' element={<CartPage />} />
          <Route
            path='/*'
            element={
              <div className='page'>
                <h1 className='page__title h1'>Page not found</h1>
              </div>
            }
          />
        </Routes>

        {error && <ErrorMessage />}

        <Footer />
      </div>
    </>
  );
}

export default App;
