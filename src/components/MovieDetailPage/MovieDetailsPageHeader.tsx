// React & Libraries
import Modal from 'react-modal';
import { useContext, useEffect, useState } from 'react';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import { getColor } from 'color-thief-react';
import { CircularProgressbar, buildStyles } from 'react-circular-progressbar';

// Components
import ModalTrailer from '../Trailer/ModalTrailer';
import Container from '../Container';

// Hooks
import { useGetCircleColor, useGetTrailColor } from '../../hooks';

// Other
import { baseUrlImg, Context } from '../../lib';
import { Favorite, Saved } from '../../assets';

// Types
import { movieDetailsHeaderProps } from '../../types/Movie';
import { ArrayRGB } from 'color-thief-react/lib/types';
import { api } from '../../api/api';

const MovieDetailsPageHeader: React.FC<movieDetailsHeaderProps> = ({
    movieDetails,
    movieCredits,
    watchProviders,
}) => {
    const { movieId } = useParams();
    const { language, userId, sessionId } = useContext(Context);
    const navigate = useNavigate();
    const [showModal, setShowModal] = useState<boolean>(false);
    const [dominantColor, setDominantColor] = useState<ArrayRGB>([0, 0, 0]);
    const director = movieCredits?.crew.find((person) => person.job === 'Director');
    const createdBy = 'created_by' in movieDetails ? movieDetails.created_by : [];

    const { pathname } = useLocation();
    const movieType = pathname.split('/')[1] as 'movie' | 'tv';

    const [isFavorite, setIsFavorite] = useState<boolean>(movieDetails.account_states.favorite);
    const [isWatchlist, setIsWatchlist] = useState<boolean>(movieDetails.account_states.watchlist);

    const toggleFavorite = () => {
        if (movieId && userId && sessionId) {
            api.toggleFavorite(userId, sessionId, movieType, movieId, isFavorite)
                .then((res) => res.success && setIsFavorite(!isFavorite))
                .catch((error) => {
                    throw new Error(`Error to add favorite: ${error}`);
                });
        } else {
            navigate('/login');
        }
    };

    const toggleSaved = () => {
        if (movieId && userId && sessionId) {
            api.toggleSaved(userId, sessionId, movieType, movieId, isWatchlist)
                .then((res) => res.success && setIsWatchlist(!isWatchlist))
                .catch((error) => {
                    throw new Error(`Error to add favorite: ${error}`);
                });
        } else {
            navigate('/login');
        }
    };

    useEffect(() => {
        getColor(
            `${baseUrlImg}/w1280${movieDetails?.poster_path}?api_key=${
                import.meta.env.VITE_TMDB_KEY
            }`,
            'rgbArray',
            'anonymous'
        ).then((color) => setDominantColor(color));
    }, [language, movieId, movieDetails.poster_path, movieType]);

    const handleClickClose = () => {
        setShowModal(false);
    };

    const title = movieDetails && 'title' in movieDetails ? movieDetails.title : movieDetails?.name;

    const release_date =
        'release_date' in movieDetails ? movieDetails.release_date : movieDetails.first_air_date;

    return (
        <section className='relative'>
            <div
                className={`h-[200px] w-full lg:hidden relative`}
                style={{
                    background: movieDetails
                        ? `url(${baseUrlImg}/w1280${movieDetails?.backdrop_path}) calc((((100vw / 2.222) - 20px) / 1.5) /2) top / cover no-repeat `
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
                                movieDetails ? `${baseUrlImg}/w400${movieDetails?.poster_path}` : ''
                            }
                            alt='poster'
                        />
                    </div>
                </div>
            </div>
            <div
                className='bg-blend-darken'
                style={
                    window?.innerWidth >= 1024
                        ? {
                              background: movieDetails.backdrop_path
                                  ? `url(${baseUrlImg}/w1280${movieDetails?.backdrop_path}) left calc((50vw - 170px) - 340px) top / cover no-repeat `
                                  : 'center / cover no-repeat linear-gradient(to right, rgba(3, 37, 65, 0.8) 0%, rgba(3, 37, 65, 0.5) 100%)',
                          }
                        : {}
                }
            >
                <div
                    className='bg-blend-darken'
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
                                        movieDetails
                                            ? `${baseUrlImg}/w1280${movieDetails?.poster_path}`
                                            : ''
                                    }
                                    alt={title}
                                    className='w-full object-contain'
                                />
                            </div>
                            <div className=' pl-0 lg:pl-10 text-white w-full'>
                                <h1 className=' font-semibold text-xl lg:text-4xl text-center mb-4 lg:mb-0 lg:text-left animate-fade-down animate-once animate-duration-500 animate-ease-linear'>
                                    {title + ' '}
                                    <span className='opacity-60 font-normal'>
                                        ({release_date.substring(0, 4)})
                                    </span>
                                </h1>
                                <div className='lg:opacity-60 mb-6 text-center lg:text-left bg-lightBlack lg:bg-lightBlack/0 -mx-8 lg:mx-0 px-8 lg:px-0 py-2 lg:py-0 animate-fade-down animate-once animate-duration-500 animate-delay-100 animate-ease-linear'>
                                    <span>{release_date + ' • '}</span>
                                    <span>
                                        {movieDetails?.genres.map((genre) => (
                                            <span key={genre.id}>{genre.name + ' • '}</span>
                                        ))}
                                    </span>
                                    {'runtime' in movieDetails && (
                                        <span>
                                            {movieDetails?.runtime +
                                                `${language === 'uk-UA' ? ' хв' : ' m'}`}
                                        </span>
                                    )}
                                </div>
                                <div className='flex items-center  mb-5'>
                                    <div className='w-10 h-10 lg:w-[60px] lg:h-[60px]'>
                                        <CircularProgressbar
                                            value={movieDetails?.vote_average || 0}
                                            minValue={1}
                                            maxValue={10}
                                            text={`${Math.round(
                                                movieDetails ? movieDetails?.vote_average * 10 : 0
                                            )}`}
                                            background
                                            styles={buildStyles({
                                                pathColor: `${useGetCircleColor(
                                                    movieDetails?.vote_average || 0
                                                )}`,
                                                textColor: '#fff',
                                                trailColor: `${useGetTrailColor(
                                                    movieDetails?.vote_average || 0
                                                )}`,
                                                backgroundColor: '#001C22',
                                                textSize: '35px',
                                            })}
                                        />
                                    </div>
                                    <div
                                        className='flex items-center ml-5 cursor-pointer'
                                        onClick={(e) => {
                                            setShowModal(true);
                                            e.stopPropagation();
                                        }}
                                    >
                                        <img
                                            className='invert hover:scale-125 transition-all duration-300 w-5 h-5'
                                            src='/playIcon.svg'
                                            alt='play'
                                        />
                                        <p className='ml-1'>
                                            {language === 'uk-UA'
                                                ? 'Дивитись трейлер'
                                                : 'Play Trailer'}
                                        </p>
                                    </div>
                                    <div className='group w-10 md:w-12 h-10 md:h-12 bg-darkBlue rounded-full flex justify-center items-center ml-5 cursor-pointer relative'>
                                        <div
                                            className={` w-4 md:w-5 h-4 md:h-5 ${
                                                isFavorite ? 'text-pink' : ''
                                            }`}
                                            onClick={toggleFavorite}
                                        >
                                            <Favorite />
                                            <span className='group-hover:block bg-darkBlue p-2 text-sm rounded-md absolute left-0 hidden mt-4 text-white whitespace-nowrap'>
                                                {language === 'uk-UA'
                                                    ? 'додати до улюбленого'
                                                    : 'add to favorite'}
                                            </span>
                                        </div>
                                    </div>
                                    <div className='group w-10 md:w-12 h-10 md:h-12 bg-darkBlue rounded-full flex justify-center items-center ml-5 cursor-pointer relative'>
                                        <div
                                            className={`w-4 md:w-5 h-4 md:h-5 ${
                                                isWatchlist ? 'text-red' : ''
                                            }`}
                                            onClick={toggleSaved}
                                        >
                                            <Saved />
                                            <span className='group-hover:block bg-darkBlue p-2 text-sm rounded-md absolute left-0 hidden mt-4 text-white whitespace-nowrap'>
                                                {language === 'uk-UA' ? 'зберегти' : 'add to saved'}
                                            </span>
                                        </div>
                                    </div>
                                </div>
                                <div className='italic text-lg mb-2'>{movieDetails?.tagline}</div>
                                <div className='mb-5 animate-flip-down animate-once animate-duration-500 animate-delay-500 animate-ease-linear'>
                                    <h3 className='text-xl mb-2'>
                                        {language === 'uk-UA' ? 'Опис' : 'Overview'}
                                    </h3>
                                    <p className='font-light'>
                                        {movieDetails?.overview
                                            ? movieDetails.overview
                                            : language === 'uk-UA'
                                            ? 'Немає опису до фільму українською :('
                                            : 'There is no description for the movie'}
                                    </p>
                                </div>
                                <div className='flex justify-between items-center animate-flip-down animate-once animate-duration-700 animate-delay-500 animate-ease-linear'>
                                    {director && (
                                        <div>
                                            <h4>{director?.name}</h4>
                                            <span className='font-light text-sm'>
                                                {language === 'uk-UA' ? 'Режисер' : 'Director'}
                                            </span>
                                        </div>
                                    )}
                                    {createdBy?.length > 0 && (
                                        <div>
                                            <span className='font-light text-sm'>
                                                {language === 'uk-UA' ? 'Створений' : 'Created by'}
                                            </span>
                                            <div className='flex'>
                                                {createdBy.map((person) => (
                                                    <h4
                                                        key={person.id}
                                                        className='mr-2'
                                                    >
                                                        {person?.name}
                                                    </h4>
                                                ))}
                                            </div>
                                        </div>
                                    )}
                                    {watchProviders?.results?.US?.flatrate && (
                                        <div className='w-12 h-12'>
                                            <img
                                                src={`${baseUrlImg}/original${watchProviders?.results.US.flatrate[0].logo_path}`}
                                                alt={
                                                    watchProviders?.results.US.flatrate[0]
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
            <Modal
                isOpen={showModal}
                ariaHideApp={false}
                style={{
                    overlay: {
                        backgroundColor: 'rgba(0,0,0, 0.5)',
                    },
                    content: {
                        background: '#0d253f',
                        position: 'absolute',
                        top: '10%',
                        left: '10%',
                        right: '10%',
                        bottom: '10%',
                        border: 'transparent',
                        padding: '0px',
                        aspectRatio: 16 / 9,
                    },
                }}
            >
                <ModalTrailer
                    trailerId={movieId!}
                    closeModal={handleClickClose}
                    type={movieType}
                />
            </Modal>
        </section>
    );
};

export default MovieDetailsPageHeader;
