import React from 'react';
import { Suspense } from 'react';

import { useOutletContext } from 'react-router-dom';
import { OutletContextType } from '../types/movieDetailProps';

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
            <div>
                <MovieDetailsPageCast {...movieCredits} />
                <MovieDetailsPageRecommendations recommendations={recommendations} />
            </div>
        </Suspense>
    );
};

export default MovieDetails;
