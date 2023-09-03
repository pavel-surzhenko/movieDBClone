// React & Libraries
import React, { Suspense } from 'react';
import { Helmet } from 'react-helmet';

// Components
import Container from '../components/Container';
import Welcome from '../components/MainPage/Welcome';
import Spinner from '../components/Spinner';

const TrendingTV = React.lazy(() => import('../components/MainPage/TrendingTV'));
const TrendingMovies = React.lazy(() => import('../components/MainPage/TrendingMovies'));
const PopularTrailers = React.lazy(() => import('../components/MainPage/PopularTrailers'));

export const MainPage = () => {
    return (
        <>
            <Helmet>
                <title>The Movie Data Base (TMDB)</title>
            </Helmet>
            <Container>
                <Welcome />
                <Suspense
                    fallback={
                        <div className='mt-5'>
                            <Spinner />
                        </div>
                    }
                >
                    <TrendingMovies />
                    <PopularTrailers />
                    <TrendingTV />
                </Suspense>
            </Container>
        </>
    );
};

export default MainPage;
