import { useParams } from 'react-router-dom';
import Container from '../components/Container';
import Header from '../components/Header';
import { useContext, useEffect, useState } from 'react';
import { movieDetailProps } from '../types/movieDetailProps';
import { api } from '../api/api';
import { Context } from '../lib/context';
import { baseUrlImg } from '../lib/links';
import { CircularProgressbar, buildStyles } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';
import { getCircleColor } from '../hooks/useGetCircleColor';
import { getTrailColor } from '../hooks/useGettrailColor';
import { movieCreditsProps } from '../types/movieCreditsProps';
import { movieProvidersProps } from '../types/movieProvidersProps';
import Spinner from '../components/Spinner';

export const MovieDetailPage = () => {
    const { movieId } = useParams();
    const { language } = useContext(Context);
    const [movieData, setMovieData] = useState<movieDetailProps | null>(null);
    const [movieProviders, setMovieProviders] =
        useState<movieProvidersProps | null>(null);
    const [movieCredits, setMovieCredits] = useState<movieCreditsProps | null>(
        null
    );

    const director = movieCredits?.crew.find(
        (person) => person.job === 'Director'
    );

    useEffect(() => {
        api.movies
            .getDetails(Number(movieId), language)
            .then((data) => setMovieData(data))
            .catch((error) => {
                console.log(error);
            });
        api.movies
            .getCredits(Number(movieId), language)
            .then((data) => setMovieCredits(data))
            .catch((error) => {
                console.log(error);
            });
        api.movies
            .getProvider(Number(movieId))
            .then((data) => setMovieProviders(data))
            .catch((error) => {
                console.log(error);
            });
    }, [language, movieId]);

    return (
        <>
            <Header />

            {movieData ? (
                <>
                    <div
                        className={` h-[200px] w-full lg:hidden relative`}
                        style={{
                            background: movieData
                                ? `url(${baseUrlImg}/w1280${movieData?.backdrop_path}) calc((((100vw / 2.222) - 20px) / 1.5) /2) top / cover no-repeat `
                                : '',
                        }}
                    >
                        <div
                            className='w-full h-full flex items-center'
                            style={{
                                background: `linear-gradient(to right, rgba(0, 0, 0, 1) 20%, rgba(0, 0, 0, 0) 50%)`,
                            }}
                        >
                            <div className='max-w-[100px] ml-8'>
                                <img
                                    className='w-full h-auto object-contain'
                                    src={
                                        movieData
                                            ? `${baseUrlImg}/w400${movieData?.poster_path}`
                                            : ''
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
                                      background: movieData
                                          ? `url(${baseUrlImg}/w1280${movieData?.backdrop_path}) left calc((50vw - 170px) - 340px) top / cover no-repeat `
                                          : '',
                                  }
                                : {}
                        }
                    >
                        <div
                            style={{
                                background: `linear-gradient(to right, rgba(0, 0, 0, 1) calc((50vw - 170px) - 340px), rgba(0, 0, 0, 0.84) 50%, rgba(0, 0, 0, 0.84) 100%)`,
                            }}
                        >
                            <Container>
                                <div
                                    className={`flex items-center pt-4 lg:pt-[30px] pb-10 lg:pb-[90px] px-8 lg:px-10`}
                                >
                                    <div className='max-w-[300px] rounded-md overflow-hidden  min-w-[200px] hidden lg:block'>
                                        <img
                                            src={
                                                movieData
                                                    ? `${baseUrlImg}/w1280${movieData?.poster_path}`
                                                    : ''
                                            }
                                            alt={movieData?.title}
                                            className='w-full object-contain'
                                        />
                                    </div>
                                    <div className=' pl-0 lg:pl-10 text-white'>
                                        <h1 className=' font-semibold text-xl lg:text-4xl text-center mb-4 lg:mb-0 lg:text-left'>
                                            {movieData?.title + ' '}
                                            <span className='opacity-60 font-normal'>
                                                (
                                                {movieData?.release_date.substring(
                                                    0,
                                                    4
                                                )}
                                                )
                                            </span>
                                        </h1>
                                        <div className='lg:opacity-60 mb-6 text-center lg:text-left bg-lightBlack lg:bg-lightBlack/0 -mx-8 lg:mx-0 px-8 lg:px-0 py-2 lg:py-0'>
                                            <span>
                                                {movieData?.release_date +
                                                    ' • '}
                                            </span>
                                            <span>
                                                {movieData?.genres.map(
                                                    (genre) => (
                                                        <span key={genre.id}>
                                                            {genre.name + ' '}
                                                        </span>
                                                    )
                                                )}
                                            </span>
                                            <span>
                                                {' • ' +
                                                    movieData?.runtime +
                                                    `${
                                                        language === 'uk-UA'
                                                            ? ' хв'
                                                            : ' m'
                                                    }`}
                                            </span>
                                        </div>
                                        <div className='w-10 h-10 lg:w-[60px] lg:h-[60px] mb-5'>
                                            <CircularProgressbar
                                                value={
                                                    movieData?.vote_average || 0
                                                }
                                                minValue={1}
                                                maxValue={10}
                                                text={`${Math.round(
                                                    movieData
                                                        ? movieData?.vote_average *
                                                              10
                                                        : 0
                                                )}`}
                                                background
                                                styles={buildStyles({
                                                    pathColor: `${getCircleColor(
                                                        movieData?.vote_average ||
                                                            0
                                                    )}`,
                                                    textColor: '#fff',
                                                    trailColor: `${getTrailColor(
                                                        movieData?.vote_average ||
                                                            0
                                                    )}`,
                                                    backgroundColor: '#001C22',
                                                    textSize: '35px',
                                                })}
                                            />
                                        </div>
                                        <div className='mb-5'>
                                            <h3 className='text-xl mb-2'>
                                                {language === 'uk-UA'
                                                    ? 'Опис'
                                                    : 'Overview'}
                                            </h3>
                                            <p className='font-light'>
                                                {movieData?.overview}
                                            </p>
                                        </div>
                                        <div className='flex justify-between items-center'>
                                            <div>
                                                <h4>{director?.name}</h4>
                                                <span className='font-light text-sm'>
                                                    {language === 'uk-UA'
                                                        ? 'Режисер'
                                                        : 'Director'}
                                                </span>
                                            </div>
                                            {movieProviders?.results?.US
                                                ?.flatrate && (
                                                <div className='w-12 h-12'>
                                                    <img
                                                        src={`${baseUrlImg}/original${movieProviders?.results.US.flatrate[0].logo_path}`}
                                                        alt={
                                                            movieProviders
                                                                ?.results.US
                                                                .flatrate[0]
                                                                .provider_name
                                                        }
                                                        className='w-full object-contain'
                                                    />
                                                </div>
                                            )}
                                        </div>
                                    </div>
                                </div>
                            </Container>
                        </div>
                    </div>
                </>
            ) : (
                <div className='absolute top-1/2 right-1/2 translate-x-1/2'>
                    <Spinner />
                </div>
            )}
        </>
    );
};

export default MovieDetailPage;
