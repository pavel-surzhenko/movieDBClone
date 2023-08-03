import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import MainPage from './pages/MainPage';
import { LanguageProvider } from './lib/context';

const router = createBrowserRouter([{ path: '/', element: <MainPage /> }]);

ReactDOM.createRoot(document.getElementById('root')!).render(
    <React.StrictMode>
        <LanguageProvider>
            <RouterProvider router={router}></RouterProvider>
        </LanguageProvider>
    </React.StrictMode>
);
