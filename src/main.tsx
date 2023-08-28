import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import { ContextProvider } from './lib/context';
import MainPage from './pages/MainPage';
import MovieDetailPage from './pages/MovieDetailPage';
import RootLayout from './components/RootLayout';
import NoFindPage from './pages/NoFindPage';
import MoviePage from './pages/MoviePage';
import ErrorPage from './pages/ErrorPage';
import CastAndCrew from './components/CastAndCrew';
import MovieDetails from './components/MovieDetails';

const router = createBrowserRouter([
    {
        path: '/',
        element: <RootLayout />,
        children: [
            { index: true, element: <MainPage />, errorElement: <ErrorPage /> },
            {
                path: '/movie',
                element: <MoviePage />,
                errorElement: <ErrorPage />,
            },
            {
                path: '/movie/:movieId',
                element: <MovieDetailPage />,
                errorElement: <ErrorPage />,
                children: [
                    { index: true, element: <MovieDetails />, errorElement: <ErrorPage /> },
                    { path: 'cast', element: <CastAndCrew />, errorElement: <ErrorPage /> },
                ],
            },
            {
                path: '*',
                element: <NoFindPage />,
            },
        ],
    },
]);

ReactDOM.createRoot(document.getElementById('root')!).render(
    <React.StrictMode>
        <ContextProvider>
            <RouterProvider router={router}></RouterProvider>
        </ContextProvider>
    </React.StrictMode>
);
