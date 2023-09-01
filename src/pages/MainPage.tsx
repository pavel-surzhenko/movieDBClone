// React & Libraries
import React, { Suspense } from 'react';
import { Helmet } from 'react-helmet';

// Components
import Container from '../components/Container';
import Welcome from '../components/Main/Welcome';
import Spinner from '../components/Spinner';

const TrendingTV = React.lazy(() => import('../components/Main/TrendingTV'));
const TrendingMovies = React.lazy(() => import('../components/Main/TrendingMovies'));
const PopularTrailers = React.lazy(() => import('../components/Main/PopularTrailers'));

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
