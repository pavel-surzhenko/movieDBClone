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

    // console.log(movieData);
    // console.log(director);
    // console.log(movieProviders);

    return (
        <>
            <Header />
            <div
                style={{
                    background: movieData
                        ? `url(${baseUrlImg}/w1280${movieData?.backdrop_path}) left calc((50vw - 170px) - 340px) top / cover no-repeat `
                        : '',
                }}
            >
                <div
                    style={{
                        background: `linear-gradient(to right, rgba(0, 0, 0, 1) calc((50vw - 170px) - 340px), rgba(0, 0, 0, 0.84) 50%, rgba(0, 0, 0, 0.84) 100%)`,
                    }}
                >
                    <Container>
                        <div
                            className={`flex items-center pt-[30px] pb-[90px] px-10`}
                        >
                            <div className='max-w-[300px] rounded-md overflow-hidden'>
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
                            <div className='pl-10 text-white'>
                                <h1 className=' font-semibold text-4xl'>
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
                                <div className='opacity-60 mb-6'>
                                    <span>
                                        {movieData?.release_date + ' • '}
                                    </span>
                                    <span>
                                        {movieData?.genres.map((genre) => (
                                            <span key={genre.id}>
                                                {genre.name + ' '}
                                            </span>
                                        ))}
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
                                <div className='w-[60px] h-[60px] mb-5'>
                                    <CircularProgressbar
                                        value={movieData?.vote_average || 0}
                                        minValue={1}
                                        maxValue={10}
                                        text={`${Math.round(
                                            movieData
                                                ? movieData?.vote_average * 10
                                                : 0
                                        )}`}
                                        background
                                        styles={buildStyles({
                                            pathColor: `${getCircleColor(
                                                movieData?.vote_average || 0
                                            )}`,
                                            textColor: '#fff',
                                            trailColor: `${getTrailColor(
                                                movieData?.vote_average || 0
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
                                    {movieProviders?.results?.US?.flatrate && (
                                        <div className='w-12 h-12'>
                                            <img
                                                src={`${baseUrlImg}/original${movieProviders?.results.US.flatrate[0].logo_path}`}
                                                alt={
                                                    movieProviders?.results.US
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
    );
};

export default MovieDetailPage;
