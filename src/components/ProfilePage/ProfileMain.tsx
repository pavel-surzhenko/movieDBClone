// React
import { Suspense } from 'react';

// Components
import Container from '../Container';
import LoadingModel from '../LoadingModel';
import MovieCollectionCard from '../MovieCollectionCard';

// Types
import { listsProps } from '../../types/Login/listsProps';
import { useSearchParams, Link } from 'react-router-dom';

const ProfileMain: React.FC<listsProps> = (props) => {
    const [params] = useSearchParams();
    const selectedList = (params.get('list') as 'favorite' | 'watchlist') || 'favorite';
    const selectedType = (params.get('type') as 'movies' | 'tv') || 'movies';

    return (
        <Container>
            <div className='mx-5'>
                <div className=' my-3 border-b border-lightGray'>
                    <div className='flex justify-center space-x-5 text-2xl font-medium'>
                        <Link
                            to={`?list=favorite&type=${selectedType}`}
                            className={` cursor-pointer ${
                                selectedList === 'favorite' ? 'border-b-4 border-darkBlue' : ''
                            }`}
                        >
                            My favorites
                        </Link>
                        <Link
                            to={`?list=watchlist&type=${selectedType}`}
                            className={` cursor-pointer ${
                                selectedList === 'watchlist' ? 'border-b-4 border-darkBlue' : ''
                            }`}
                        >
                            My watch list
                        </Link>
                    </div>
                    <div className='text-lg font-light space-x-5 pb-2'>
                        <Link
                            to={`?list=${selectedList}&type=movies`}
                            className={` cursor-pointer ${
                                selectedType === 'movies' ? 'border-b-4 border-darkBlue' : ''
                            }`}
                        >
                            Movies{' '}
                            <span className='text-base text-lightBlue'>
                                {props[`${selectedList}/movies`].total_results}
                            </span>
                        </Link>
                        <Link
                            to={`?list=${selectedList}&type=tv`}
                            className={` cursor-pointer ${
                                selectedType === 'tv' ? 'border-b-4 border-darkBlue' : ''
                            }`}
                        >
                            TV{' '}
                            <span className='text-base text-lightBlue'>
                                {props[`${selectedList}/tv`].total_results}
                            </span>
                        </Link>
                    </div>
                </div>
                <div className='mb-5'>
                    {props[`${selectedList}/${selectedType}`]?.results.map((movie) => (
                        <Suspense
                            fallback={
                                <LoadingModel
                                    width={150}
                                    height={150}
                                />
                            }
                            key={movie.id}
                        >
                            <MovieCollectionCard
                                movie={movie}
                                key={movie.id}
                            />
                        </Suspense>
                    ))}
                </div>
            </div>
        </Container>
    );
};

export default ProfileMain;
