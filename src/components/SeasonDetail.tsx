import { Link, useOutletContext, useParams } from 'react-router-dom';
import { OutletContextType } from '../types/movieDetailProps';
import { Suspense, useContext, useEffect, useState } from 'react';
import { api } from '../api/api';
import { Context } from '../lib/context';
import { tvSeasonDetailProps } from '../types/tvSeasonDetailProps';
import { getColor } from 'color-thief-react';
import LeftArrow from '../assets/LeftArrow';
import { baseUrlImg } from '../lib/links';
import Container from './Container';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import LoadingModel from './LoadingModel';
import Star from '../assets/Star';
import LeftArrowLong from '../assets/LeftArrowLong';
import RightArrowLong from '../assets/RightArrowLong';

const SeasonDetail = () => {
    const { movieData }: OutletContextType = useOutletContext();
    const { seasonId } = useParams();
    const { language } = useContext(Context);
    const [seasonData, setSeasonData] = useState<tvSeasonDetailProps>();
    const [dominantColor, setDominantColor] = useState<string>();
    const seasonsLength = 'seasons' in movieData ? movieData.seasons.length : 0;

    const dateOptions: Intl.DateTimeFormatOptions = {
        day: 'numeric',
        month: 'short',
        year: 'numeric',
    };
    const localLanguage = language.replace(`"`, '').slice(0, 2);

    useEffect(() => {
        api.tv
            .getSeasonsDetail(movieData.id, Number(seasonId), language)
            .then((data) => setSeasonData(data));
        if (seasonData?.poster_path) {
            getColor(
                `${baseUrlImg}/w1280${seasonData?.poster_path}?api_key=${
                    import.meta.env.VITE_TMDB_KEY
                }`,
                'hex',
                'anonymous'
            ).then((color) => setDominantColor(color));
        }
    }, [movieData.id, language, seasonId, seasonData?.poster_path]);

    return (
        <section>
            <div
                className='p-4'
                style={{ backgroundColor: `${dominantColor}` }}
            >
                <Container>
                    <div className='flex'>
                        <div className='w-14 mr-4'>
                            {seasonData?.poster_path && (
                                <img
                                    src={`${baseUrlImg}/w200${seasonData?.poster_path}`}
                                    alt=''
                                    className='object-contain w-full h-auto'
                                />
                            )}
                        </div>
                        <div className='text-white'>
                            <h2 className='text-lg lg:text-3xl  font-bold'>{seasonData?.name}</h2>
                            <Link
                                to={'..'}
                                relative='path'
                                className='flex hover:underline underline-offset-2 items-center'
                            >
                                {' '}
                                <LeftArrow />
                                {language === 'uk-UA' ? 'назад до списку' : 'back to list'}
                            </Link>
                        </div>
                    </div>
                </Container>
            </div>
            <Container>
                <div className='px-5 lg:px-10 pt-[10px]'>
                    <div className='flex justify-between mb-4 border-b border-[#7d7d7d]'>
                        <div className='flex cursor-pointer'>
                            {Number(seasonId) > 0 && (
                                <Link
                                    className='inline-flex'
                                    to={`/tv/${movieData.id}/seasons/${Number(seasonId) - 1}`}
                                >
                                    <LeftArrowLong />
                                    <span className='ml-2'>
                                        {language === 'uk-UA' ? 'Попередній' : 'Previous'}
                                    </span>
                                </Link>
                            )}
                        </div>
                        <div className='flex cursor-pointer'>
                            {Number(seasonId) + 1 !== seasonsLength && (
                                <Link
                                    to={`/tv/${movieData.id}/seasons/${Number(seasonId) + 1}`}
                                    className='inline-flex'
                                >
                                    <span className='mr-2'>
                                        {language === 'uk-UA' ? 'Наступний' : 'Next'}
                                    </span>
                                    <RightArrowLong />
                                </Link>
                            )}
                        </div>
                    </div>
                    <div className='text-lg font-semibold mb-5'>
                        {language === 'uk-UA' ? 'Епізоди' : 'Episodes'}{' '}
                        <span className='opacity-50'>{seasonData?.episodes.length}</span>
                    </div>
                    <Suspense>
                        {seasonData?.episodes.map((episode) => (
                            <div
                                key={episode.id}
                                className='mb-3 lg:mb-5 rounded-md overflow-hidden shadow-custom border border-solid border-[#d7d7d7] flex animate-jump-in animate-once animate-duration-500 animate-delay-100 animate-ease-linear animate-fill-forwards'
                            >
                                <div className='max-w-[100px] min-w-[100px] lg:max-w-[250px] lg:min-w-[250px]'>
                                    {episode.still_path ? (
                                        <LazyLoadImage
                                            src={`${baseUrlImg}/w200${episode.still_path}`}
                                            alt={episode.name}
                                            className='w-full object-cover h-[125px] lg:h-[150px] '
                                            effect='blur'
                                            placeholder={
                                                <LoadingModel
                                                    width={150}
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
                                            alt={episode.name}
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

                                <div className='flex flex-col grow mx-4 my-1 lg:my-2'>
                                    <h2 className='text-sm lg:text-lg font-semibold lg:font-bold mb-1 lg:mb-0 line-clamp-2 lg:line-clamp-none text-ellipsis overflow-hidden'>
                                        {episode.name}
                                    </h2>
                                    <div className='flex grow-0 items-center mb-2'>
                                        {episode.vote_average > 0 && (
                                            <div className='px-2 bg-black text-white rounded-lg font-normal flex items-center text-sm mr-2'>
                                                <Star />
                                                <span className='ml-1 font-light'>
                                                    {episode.vote_average.toFixed(1)}
                                                </span>
                                            </div>
                                        )}
                                        <div className='text-sm lg:text-base font-normal opacity-70'>
                                            {new Date(episode.air_date).toLocaleDateString(
                                                localLanguage,
                                                dateOptions
                                            )}
                                        </div>
                                    </div>
                                    <div className=' text-sm lg:text-base font-thin text-ellipsis overflow-hidden line-clamp-2 lg:line-clamp-3'>
                                        {episode.overview}
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

export default SeasonDetail;
