// React & Libraries
import React from 'react';
import { Suspense } from 'react';
import { useOutletContext } from 'react-router-dom';

// Types
import { OutletContextType } from '../../types/OutletContextType';

// Components
import MovieDetailsPageSideBar from './MovieDetailsPageSideBar';
import Container from '../Container';
import MovieDetailsPageCollections from './MovieDetailsPageCollections';
import MovieDetailsPageSeasons from './MovieDetailsPageSeasons';

// Lazy
const MovieDetailsPageHeader = React.lazy(() => import('./MovieDetailsPageHeader'));
const MovieDetailsPageCast = React.lazy(() => import('./MovieDetailsPageCast'));
const MovieDetailsPageRecommendations = React.lazy(
    () => import('./MovieDetailsPageRecommendations')
);

const MovieDetails = () => {
    const { movieCredits, movieData, recommendations }: OutletContextType = useOutletContext();
    const collections =
        'belongs_to_collection' in movieData ? movieData.belongs_to_collection : null;
    const seasons = 'seasons' in movieData ? movieData.seasons : null;

    return (
        <Suspense>
            <MovieDetailsPageHeader
                movieDetails={movieData}
                movieCredits={movieCredits}
            />
            <Container>
                <div className='flex flex-col lg:flex-row'>
                    <div className='overflow-x-auto lg:pr-5'>
                        <MovieDetailsPageCast {...movieCredits} />
                        {collections && <MovieDetailsPageCollections {...collections} />}
                        {seasons && <MovieDetailsPageSeasons seasons={seasons} />}
                        <MovieDetailsPageRecommendations recommendations={recommendations} />
                    </div>
                    <div className='flex-none lg:w-[260px] pt-[30px] ml-8 lg:ml-0 mb-5 lg:mb-0'>
                        <MovieDetailsPageSideBar {...movieData} />
                    </div>
                </div>
            </Container>
        </Suspense>
    );
};

export default MovieDetails;
