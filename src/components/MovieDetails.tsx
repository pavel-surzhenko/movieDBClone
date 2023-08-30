import React from 'react';
import { Suspense } from 'react';

import { useOutletContext } from 'react-router-dom';
import { OutletContextType } from '../types/movieDetailProps';
import MovieDetailsPageSideBar from './MovieDetailsPageSideBar';
import Container from './Container';

const MovieDetailsPageHeader = React.lazy(() => import('../components/MovieDetailsPageHeader'));
const MovieDetailsPageCast = React.lazy(() => import('../components/MovieDetailsPageCast'));
const MovieDetailsPageRecommendations = React.lazy(
    () => import('../components/MovieDetailsPageRecommendations')
);

const MovieDetails = () => {
    const { movieCredits, movieData, recommendations }: OutletContextType = useOutletContext();

    return (
        <Suspense>
            <MovieDetailsPageHeader
                movieDetails={movieData}
                movieCredits={movieCredits}
            />
            <Container>
                <div className='flex'>
                    <div className='overflow-x-auto pr-5'>
                        <MovieDetailsPageCast {...movieCredits} />
                        <MovieDetailsPageRecommendations recommendations={recommendations} />
                    </div>
                    <div className='flex-none w-[260px] pt-[30px]'>
                        <MovieDetailsPageSideBar {...movieData} />
                    </div>
                </div>
            </Container>
        </Suspense>
    );
};

export default MovieDetails;
