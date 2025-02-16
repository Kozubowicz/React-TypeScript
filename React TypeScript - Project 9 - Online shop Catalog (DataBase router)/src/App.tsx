import './App.css';
import '@fortawesome/fontawesome-free/css/all.min.css';

import { HomePage } from './HomePage/HomePage';
import { ShopPage } from './ShopPage/ShopPage';
import { Navigate, Route, Routes, useLocation } from 'react-router-dom';
import { NavBar } from './components/NavBar';
import { Error404 } from './404/Error404';
import { SiencePage } from './SiencePage/SiencePage';
import { LearnPage } from './LearnPage/LearnPage';
import { Cart } from './components/Cart';
import { useEffect } from 'react';
import { AboutUsPage } from './AboutUsPage/AboutUsPage';

function App() {
  const location = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location]);

  return (
    <>
      <Cart />
      <NavBar />
      <Routes>
        <Route path='/' element={<HomePage />} />
        <Route path='/home' element={<Navigate to='/' replace />} />
        <Route path='/shop' element={<ShopPage />} />
        <Route path='/sience' element={<SiencePage />} />
        <Route path='/learn' element={<LearnPage />} />
        <Route path='/aboutus' element={<AboutUsPage />} />
        <Route path='/*' element={<Error404 />} />
      </Routes>
    </>
  );
}

export default App;
