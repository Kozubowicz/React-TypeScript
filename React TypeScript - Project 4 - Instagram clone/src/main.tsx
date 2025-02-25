import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.tsx';
import './app.scss';
import { InstaContextProvider } from './Context/InstaContext.tsx';
import { HashRouter } from 'react-router-dom';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <HashRouter>
      <InstaContextProvider>
        <App />
      </InstaContextProvider>
    </HashRouter>
  </React.StrictMode>
);
