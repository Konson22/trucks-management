import React from 'react';
import {Routes, Route} from 'react-router-dom'
import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import GlobalContextProvider from './contexts/GlobalContextProvider';
import App from './App';
import './app.css'
import RecordsContextProvider from './contexts/RecordsContextProvider';

const container = document.getElementById('root');
const root = createRoot(container);
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <GlobalContextProvider>
      <RecordsContextProvider>
        <Routes>
          <Route path='/*' element={<App tab="home" />} />
        </Routes>
      </RecordsContextProvider>
      </GlobalContextProvider>
    </BrowserRouter>
  </React.StrictMode>
);

