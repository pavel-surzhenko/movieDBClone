import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import MainPage from './pages/MainPage';
import { ContextProvider } from './lib/context';
import MovieDetailPage from './pages/MovieDetailPage';

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
