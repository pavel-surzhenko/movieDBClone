// React & Libraries
import { LazyLoadImage } from 'react-lazy-load-image-component';
import { Link } from 'react-router-dom';
import { useContext } from 'react';

// Components
import LoadingModel from './LoadingModel';

// Other
import { Context, baseUrlImg, dateOptions } from '../lib';

// Types
import { movieProps } from '../types/Movie';
import { tvProps } from '../types/TV';

const MovieCollectionCard: React.FC<movieProps | tvProps> = (movie) => {
    const { language } = useContext(Context);
    const localLanguage = language.replace(`"`, '').slice(0, 2);
    const title = 'title' in movie ? movie.title : movie.name;
    const release_date = 'release_date' in movie ? movie.release_date : movie.first_air_date;

    return (
        <div
            key={movie.id}
            className='mb-5 rounded-md overflow-hidden shadow-custom border border-solid border-[#d7d7d7] flex animate-jump-in animate-once animate-duration-500 animate-delay-100 animate-ease-linear animate-fill-forwards'
        >
            <Link
                to={`${'title' in movie ? `/movie/${movie.id}` : `/tv/${movie.id}`}`}
                onClick={() => window.scrollTo(0, 0)}
            >
                <div className='max-w-[90px] min-w-[90px] cursor-pointer'>
                    {movie.poster_path ? (
                        <LazyLoadImage
                            src={`${baseUrlImg}/w200${movie.poster_path}`}
                            alt={title}
                            className='w-full object-cover h-[150px] '
                            effect='blur'
                            placeholder={
                                <LoadingModel
                                    width={90}
                                    height={150}
                                />
                            }
                            threshold={1}
                            delayMethod='debounce'
                            wrapperClassName={'fix-style'}
                        />
                    ) : (
                        <LazyLoadImage
                            src={'/image.svg'}
                            alt={title}
                            className='w-full object-contain h-[150px] bg-lightGray'
                            effect='blur'
                            placeholder={
                                <LoadingModel
                                    width={90}
                                    height={150}
                                />
                            }
                            threshold={1}
                            delayMethod='debounce'
                            wrapperClassName={'fix-style'}
                        />
                    )}
                </div>
            </Link>
            <div className='px-4 pt-2'>
                <Link
                    to={`${'title' in movie ? `/movie/${movie.id}` : `/tv/${movie.id}`}`}
                    onClick={() => window.scrollTo(0, 0)}
                >
                    <h2 className='text-base lg:text-lg font-bold cursor-pointer hover:text-lightBlue transition-colors duration-300'>
                        {title}
                    </h2>
                </Link>
                <div className='text-sm opacity-50 mb-2'>
                    {new Date(release_date).toLocaleDateString(localLanguage, dateOptions)}
                </div>
                <div className=' text-sm lg:text-base text-ellipsis overflow-hidden line-clamp-3'>
                    {movie.overview}
                </div>
            </div>
        </div>
    );
};

export default MovieCollectionCard;
