import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App.tsx';
import { HashRouter } from 'react-router-dom';
import { ShopContextProvider } from './context/Context.tsx';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <HashRouter>
      <ShopContextProvider>
        <App />
      </ShopContextProvider>
    </HashRouter>
  </StrictMode>
);
