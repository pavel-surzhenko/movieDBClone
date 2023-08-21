import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import { ContextProvider } from './lib/context';

const MovieDetailPage = React.lazy(() => import('./pages/MovieDetailPage'));
const MainPage = React.lazy(() => import('./pages/MainPage'));

const router = createBrowserRouter([
    { path: '/', element: <MainPage /> },
    { path: 'movie/:movieId', element: <MovieDetailPage /> },
]);

ReactDOM.createRoot(document.getElementById('root')!).render(
    <React.StrictMode>
        <ContextProvider>
            <RouterProvider router={router}></RouterProvider>
        </ContextProvider>
    </React.StrictMode>
);
