import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App.tsx';
import { MyContextProvider } from './context/context.tsx';
import { BrowserRouter } from 'react-router-dom';
import './App.scss';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <MyContextProvider>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </MyContextProvider>
  </StrictMode>
);
