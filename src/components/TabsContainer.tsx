import { movieProps } from '../types/Movie/movieProps';
import { tvProps } from '../types/TV/tvProps';
import { tabContainerProps } from '../types/tabProps';
import React, { Suspense } from 'react';
import LoadingModel from './LoadingModel';

const MovieCard = React.lazy(() => import('./MovieCard'));

const TabsContainer: React.FC<tabContainerProps> = ({ movies }) => {
    const isMobile = /iPhone/i.test(navigator.userAgent);
    const trimmedMovies = isMobile ? movies.slice(0, 10) : movies;

    return (
        <>
            <div className='relative flex flex-col break-words w-full py-5 white-shadow '>
                <div className='flex flex-nowrap overflow-x-auto snap-x'>
                    {trimmedMovies?.map((movie: movieProps | tvProps) => (
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
