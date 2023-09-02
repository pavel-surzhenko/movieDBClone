// React & Libraries
import { Suspense, useContext, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getColor } from 'color-thief-react';

// Components
import Container from '../Container';
import MovieCollectionCard from '../MovieCollectionCard';

// Types
import { ArrayRGB } from 'color-thief-react/lib/types';
import { collectionProps } from '../../types/Movie';

// Other
import { api } from '../../api/api';
import { Context, baseUrlImg } from '../../lib';

const MovieCollection = () => {
    const { id } = useParams();
    const { language } = useContext(Context);
    const [collection, setCollection] = useState<collectionProps>();
    const [dominantColor, setDominantColor] = useState<ArrayRGB>([0, 0, 0]);

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
                                <MovieCollectionCard
                                    {...movie}
                                    key={movie.id}
                                />
                            ))}
                        </Suspense>
                    </div>
                </Container>
            </section>
        </>
    );
};

export default MovieCollection;
