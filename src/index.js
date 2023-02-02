import React from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import GlobalContextProvider from './contexts/GlobalContextProvider';
import App from './App';
import './app.css'



const container = document.getElementById('root');
const root = createRoot(container);
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <GlobalContextProvider>
        <App tab="home" />
      </GlobalContextProvider>
    </BrowserRouter>
  </React.StrictMode>
);

