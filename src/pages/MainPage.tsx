import React, { Suspense } from 'react';
import Container from '../components/Container';
import { Helmet } from 'react-helmet';

import Welcome from '../components/Welcome';
import Spinner from '../components/Spinner';

const TrendingTV = React.lazy(() => import('../components/TrendingTV'));
const TrendingMovies = React.lazy(() => import('../components/TrendingMovies'));
const PopularTrailers = React.lazy(() => import('../components/PopularTrailers'));

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
