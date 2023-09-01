import { Suspense, useContext, useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { api } from '../api/api';
import { Context } from '../lib/context';
import { collectionProps } from '../types/collectionProps';
import { baseUrlImg } from '../lib/links';
import { ArrayRGB } from 'color-thief-react/lib/types';
import { getColor } from 'color-thief-react';
import Container from './Container';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import LoadingModel from './LoadingModel';

const MovieCollection = () => {
    const { id } = useParams();
    const { language } = useContext(Context);
    const [collection, setCollection] = useState<collectionProps>();
    const [dominantColor, setDominantColor] = useState<ArrayRGB>([0, 0, 0]);

    const dateOptions: Intl.DateTimeFormatOptions = {
        day: 'numeric',
        month: 'short',
        year: 'numeric',
    };
    const localLanguage = language.replace(`"`, '').slice(0, 2);

    useEffect(() => {
        api.movies.getCollection(Number(id), language).then((data) => {
            setCollection(data);
        });
        if (collection?.poster_path) {
            getColor(
                `${baseUrlImg}/w1280${collection?.poster_path}?api_key=${
                    import.meta.env.VITE_TMDB_KEY
                }`,
                'rgbArray',
                'anonymous'
            ).then((color) => setDominantColor(color));
        }
    }, [id, language, collection?.poster_path]);

    return (
        <>
            <section className='relative'>
                <div
                    className={`h-[200px] w-full lg:hidden relative`}
                    style={{
                        background: collection?.backdrop_path
                            ? `url(${baseUrlImg}/w1280${collection?.backdrop_path}) calc((((100vw / 2.222) - 20px) / 1.5) /2) top / cover no-repeat `
                            : '',
                    }}
                >
                    <div
                        className='w-full h-full flex items-center'
                        style={{
                            background: `linear-gradient(to right, rgba(${dominantColor}, 1 ) 20%, rgba(${dominantColor}, .1 ) 50%)`,
                        }}
                    >
                        <div className='max-w-[100px] ml-8'>
                            <img
                                className='w-full h-auto object-contain'
                                src={
                                    collection ? `${baseUrlImg}/w400${collection?.poster_path}` : ''
                                }
                                alt='poster'
                            />
                        </div>
                    </div>
                </div>
                <div
                    style={
                        window?.innerWidth >= 1024
                            ? {
                                  background: collection
                                      ? `url(${baseUrlImg}/w1280${collection?.backdrop_path}) left calc((50vw - 170px) - 340px) top / cover no-repeat `
                                      : '',
                              }
                            : {}
                    }
                >
                    <div
                        style={
                            window?.innerWidth >= 1024
                                ? {
                                      background: `linear-gradient(to right, rgba(${dominantColor}, 1 ) calc((50vw - 170px) - 340px), rgba(${dominantColor}, .3 ) 50%, rgba(${dominantColor}, .2 ) 100%)`,
                                  }
                                : {
                                      background: `rgba(${dominantColor}, 1)`,
                                  }
                        }
                    >
                        <Container>
                            <div
                                className={`flex items-center pt-4 lg:pt-[30px] pb-10 lg:pb-[90px] px-8 lg:px-10`}
                            >
                                <div className='max-w-[300px] rounded-md overflow-hidden  min-w-[200px] hidden lg:block'>
                                    <img
                                        src={
                                            collection
                                                ? `${baseUrlImg}/w1280${collection?.poster_path}`
                                                : ''
                                        }
                                        alt={collection?.name}
                                        className='w-full object-contain'
                                    />
                                </div>
                                <div className=' pl-0 lg:pl-10 text-white'>
                                    <h1 className=' font-semibold text-xl lg:text-4xl text-center mb-4 lg:text-left animate-fade-down animate-once animate-duration-500 animate-ease-linear'>
                                        {collection?.name}
                                    </h1>

                                    <div className='mb-5 animate-flip-down animate-once animate-duration-500 animate-delay-500 animate-ease-linear'>
                                        <h3 className='text-xl mb-2'>
                                            {language === 'uk-UA' ? 'Опис' : 'Overview'}
                                        </h3>
                                        <p className='font-light'>
                                            {collection?.overview ||
                                                'Немає опису до фільму українською :('}
                                        </p>
                                    </div>
                                    <div className='mb-5 animate-flip-down animate-once animate-duration-500 animate-delay-500 animate-ease-linear'>
                                        <h3 className='text-xl mb-2'>
                                            {language === 'uk-UA'
                                                ? 'Кількість фільмів: '
                                                : 'Number of movies: '}
                                            <span>{collection?.parts.length}</span>
                                        </h3>
                                    </div>
                                </div>
                            </div>
                        </Container>
                    </div>
                </div>
            </section>
            <section>
                <Container>
                    <div className='px-5 lg:px-10 pt-[30px]'>
                        <Suspense>
                            {collection?.parts.map((movie) => (
                                <div
                                    key={movie.id}
                                    className='mb-5 rounded-md overflow-hidden shadow-custom border border-solid border-[#d7d7d7] flex animate-jump-in animate-once animate-duration-500 animate-delay-100 animate-ease-linear animate-fill-forwards'
                                >
                                    <Link
                                        to={`/movie/${movie.id}`}
                                        onClick={() => window.scrollTo(0, 0)}
                                    >
                                        <div className='max-w-[90px] min-w-[90px] cursor-pointer'>
                                            {movie.poster_path ? (
                                                <LazyLoadImage
                                                    src={`${baseUrlImg}/w200${movie.poster_path}`}
                                                    alt={movie.title}
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
                                                    alt={movie.title}
                                                    className='w-full object-contain h-[150px]'
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
                                            to={`/movie/${movie.id}`}
                                            onClick={() => window.scrollTo(0, 0)}
                                        >
                                            <h2 className='text-base lg:text-lg font-bold cursor-pointer hover:text-lightBlue transition-colors duration-300'>
                                                {movie.title}
                                            </h2>
                                        </Link>
                                        <div className='text-sm opacity-50 mb-2'>
                                            {new Date(movie.release_date).toLocaleDateString(
                                                localLanguage,
                                                dateOptions
                                            )}
                                        </div>
                                        <div className=' text-sm lg:text-base text-ellipsis overflow-hidden line-clamp-3'>
                                            {movie.overview}
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </Suspense>
                    </div>
                </Container>
            </section>
        </>
    );
};

export default MovieCollection;
