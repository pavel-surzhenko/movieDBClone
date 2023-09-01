// React & Libraries
import React from 'react';
import ReactDOM from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';

// Components
import CastAndCrew from './components/MovieDetailPage/CastAndCrew';
import MovieCollection from './components/MovieDetailPage/MovieCollection';
import MovieDetails from './components/MovieDetailPage/MovieDetails';
import RootLayout from './components/RootLayout';
import SeasonDetail from './components/MovieDetailPage/SeasonDetail';
import SeasonsCollection from './components/MovieDetailPage/SeasonsCollection';
import { ContextProvider } from './lib';

// Pages
import { MainPage, MoviePage, MovieDetailPage, NoFindPage, ErrorPage } from './pages';

// CSS
import './index.css';

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
                    {
                        path: ':id-collection',
                        element: <MovieCollection />,
                        errorElement: <ErrorPage />,
                    },
                ],
            },
            {
                path: '/tv',
                element: <MoviePage />,
                errorElement: <ErrorPage />,
            },
            {
                path: '/tv/:movieId',
                element: <MovieDetailPage />,
                errorElement: <ErrorPage />,
                children: [
                    { index: true, element: <MovieDetails />, errorElement: <ErrorPage /> },
                    { path: 'cast', element: <CastAndCrew />, errorElement: <ErrorPage /> },
                    {
                        path: 'seasons',
                        element: <SeasonsCollection />,
                        errorElement: <ErrorPage />,
                    },
                    {
                        path: 'seasons/:seasonId',
                        element: <SeasonDetail />,
                        errorElement: <ErrorPage />,
                    },
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
