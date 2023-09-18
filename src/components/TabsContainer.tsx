// React & Libraries
import React, { Suspense } from 'react';

// Components
import LoadingModel from './LoadingModel';

// Types
import { movieProps } from '../types/Movie';
import { tvProps } from '../types/TV';
import { tabContainerProps } from '../types/tabProps';

const MovieCard = React.lazy(() => import('./MovieCard'));

const TabsContainer: React.FC<tabContainerProps> = ({ movies }) => {
    // const isMobile = /iPhone/i.test(navigator.userAgent);
    // const trimmedMovies = isMobile ? movies.slice(0, 100) : movies;

    return (
        <>
            <div className='relative flex flex-col break-words w-full py-5 white-shadow '>
                <div className='flex flex-nowrap overflow-x-auto snap-x'>
                    {movies?.map((movie: movieProps | tvProps) => (
                        <Suspense
                            fallback={
                                <LoadingModel
                                    width={150}
                                    height={225}
                                />
                            }
                            key={movie.id}
                        >
                            <MovieCard {...movie} />
                        </Suspense>
                    ))}
                </div>
            </div>
        </>
    );
};

export default TabsContainer;
