// React
import { Suspense, useState } from 'react';

// Components
import Container from '../Container';
import LoadingModel from '../LoadingModel';
import MovieCollectionCard from '../MovieCollectionCard';
import MovieCard from '../MovieCard';

// Types
import { favoriteList } from '../../types';

const ProfileMain: React.FC<favoriteList> = (props) => {
    const [movies, setMovies] = useState<'favorite/movies' | 'favorite/tv'>('favorite/movies');

    return (
        <Container>
            <div className=' my-3 border-b border-lightGray'>
                <div className='flex justify-center space-x-5 text-2xl font-medium'>
                    <p
                        className={`hover:text-lightBlue cursor-pointer transition-colors duration-300`}
                    >
                        My favorites
                    </p>
                    <p className='hover:text-lightBlue cursor-pointer transition-colors duration-300'>
                        My watch list
                    </p>
                </div>
                <div className='text-lg font-light space-x-5 pb-2'>
                    <span
                        className={` cursor-pointer ${
                            movies === 'favorite/movies' ? 'border-b-4 border-lightBlue' : ''
                        }`}
                        onClick={() => setMovies('favorite/movies')}
                    >
                        Movies{' '}
                        <span className='text-base text-lightBlue'>
                            {props['favorite/movies'].total_results}
                        </span>
                    </span>
                    <span
                        className={` cursor-pointer ${
                            movies === 'favorite/tv' ? 'border-b-4 border-lightBlue' : ''
                        }`}
                        onClick={() => setMovies('favorite/tv')}
                    >
                        TV{' '}
                        <span className='text-base text-lightBlue'>
                            {props['favorite/tv'].total_results}
                        </span>
                    </span>
                </div>
            </div>
            <div className='grid md:grid-cols-5 lg:grid-cols-4 xl:grid-cols-6 md:gap-y-4 mb-5'>
                {props[movies]?.results.map((movie) => (
                    <Suspense
                        fallback={
                            <LoadingModel
                                width={150}
                                height={150}
                            />
                        }
                        key={movie.id}
                    >
                        {window.innerWidth >= 767 ? (
                            <MovieCard
                                {...movie}
                                key={movie.id}
                            />
                        ) : (
                            <MovieCollectionCard
                                movie={movie}
                                key={movie.id}
                            />
                        )}
                    </Suspense>
                ))}
            </div>
        </Container>
    );
};

export default ProfileMain;
