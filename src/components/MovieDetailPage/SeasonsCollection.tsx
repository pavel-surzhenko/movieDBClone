// React & Libraries
import { Link, useOutletContext } from 'react-router-dom';
import { useState, useContext, useEffect, Suspense } from 'react';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import { getColor } from 'color-thief-react';

// Components
import Container from '../Container';
import LoadingModel from '../LoadingModel';

// Assets
import { LeftArrow, Star } from '../../assets';

// Types
import { OutletContextType } from '../../types/OutletContextType';

// Other
import { Context, baseUrlImg } from '../../lib';

const SeasonsCollection = () => {
    const { movieData }: OutletContextType = useOutletContext();
    const seasons = movieData && 'seasons' in movieData ? movieData.seasons : null;
    const { language } = useContext(Context);
    const [dominantColor, setDominantColor] = useState<string>();
    const name = movieData && 'name' in movieData ? movieData.name : null;
    const dateOptions: Intl.DateTimeFormatOptions = {
        day: 'numeric',
        month: 'short',
        year: 'numeric',
    };
    const localLanguage = language.replace(`"`, '').slice(0, 2);

    useEffect(() => {
        getColor(
            `${baseUrlImg}/w1280${movieData?.poster_path}?api_key=${import.meta.env.VITE_TMDB_KEY}`,
            'hex',
            'anonymous'
        ).then((color) => setDominantColor(color));
    }, [movieData.poster_path]);

    return (
        <section>
            <div
                className='p-4'
                style={{ backgroundColor: `${dominantColor}` }}
            >
                <Container>
                    <div className='flex'>
                        <div className='w-14 mr-4'>
                            <img
                                src={`${baseUrlImg}/w200${movieData?.poster_path}`}
                                alt=''
                                className='object-contain w-full h-auto'
                            />
                        </div>
                        <div className='text-white'>
                            <h2 className='text-lg lg:text-3xl  font-bold'>{name}</h2>
                            <Link
                                to='..'
                                className='flex hover:underline underline-offset-2 items-center'
                            >
                                {' '}
                                <LeftArrow />
                                {language === 'uk-UA' ? 'назад на головну' : 'back to main'}
                            </Link>
                        </div>
                    </div>
                </Container>
            </div>
            <Container>
                <div className='px-5 lg:px-10 pt-[30px]'>
                    <Suspense>
                        {seasons?.map((season, index) => (
                            <div
                                key={season.id}
                                className='mb-5 rounded-md overflow-hidden shadow-custom border border-solid border-[#d7d7d7] flex animate-jump-in animate-once animate-duration-500 animate-delay-100 animate-ease-linear animate-fill-forwards'
                            >
                                <Link
                                    to={`/tv/${movieData.id}/seasons/${index}`}
                                    onClick={() => window.scrollTo(0, 0)}
                                >
                                    <div className='max-w-[100px] min-w-[100px] cursor-pointer'>
                                        {season.poster_path ? (
                                            <LazyLoadImage
                                                src={`${baseUrlImg}/w200${season.poster_path}`}
                                                alt={season.name}
                                                className='w-full object-cover h-[150px] '
                                                effect='blur'
                                                placeholder={
                                                    <LoadingModel
                                                        width={100}
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
                                                alt={season.name}
                                                className='w-full object-contain h-[150px]'
                                                effect='blur'
                                                placeholder={
                                                    <LoadingModel
                                                        width={100}
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
                                <div className='px-4 pt-2 font-semibold'>
                                    <Link
                                        to={`/tv/${movieData.id}/seasons/${index}`}
                                        onClick={() => window.scrollTo(0, 0)}
                                    >
                                        <h2 className='text-base lg:text-lg font-bold cursor-pointer hover:text-lightBlue transition-colors duration-300'>
                                            {season.name}
                                        </h2>
                                    </Link>

                                    {season.vote_average > 0 && (
                                        <div className='flex'>
                                            <div className='px-2 bg-black text-white rounded-lg font-normal flex items-center text-sm mr-2'>
                                                <Star />
                                                <span className='ml-1'>
                                                    {season.vote_average.toFixed(1)}
                                                </span>
                                            </div>
                                        </div>
                                    )}
                                    <div className='text-sm lg:text-base font-normal opacity-70'>
                                        {new Date(season.air_date).toLocaleDateString(
                                            localLanguage,
                                            dateOptions
                                        )}
                                    </div>
                                    <div className='mr-2'>
                                        {language === 'uk-UA'
                                            ? `Епізодів: ${season.episode_count}`
                                            : `Episodes: ${season.episode_count}`}
                                    </div>
                                </div>
                            </div>
                        ))}
                    </Suspense>
                </div>
            </Container>
        </section>
    );
};

export default SeasonsCollection;
