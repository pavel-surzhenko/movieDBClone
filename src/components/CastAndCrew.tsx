import { Link, useOutletContext } from 'react-router-dom';
import { OutletContextType } from '../types/movieDetailProps';
import Container from './Container';
import { getColor } from 'color-thief-react';
import { useState, useEffect, useContext } from 'react';
import { baseUrlImg } from '../lib/links';
import LeftArrow from '../assets/LeftArrow_old';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import LoadingModel from './LoadingModel';
import 'react-lazy-load-image-component/src/effects/blur.css';
import { Context } from '../lib/context';

const CastAndCrew = () => {
    const { movieCredits, movieData }: OutletContextType = useOutletContext();
    const [dominantColor, setDominantColor] = useState<string>();
    const { language } = useContext(Context);

    useEffect(() => {
        getColor(
            `${baseUrlImg}/w1280${movieData?.poster_path}?api_key=${import.meta.env.VITE_TMDB_KEY}`,
            'hex',
            'anonymous'
        ).then((color) => setDominantColor(color));
    }, [movieData.poster_path]);

    const title = movieData && 'title' in movieData ? movieData.title : movieData?.name;

    return (
        <>
            <div
                className='py-4 px-4 lg:px-0'
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
                            <h2 className='text-lg lg:text-3xl  font-bold'>{title}</h2>
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
                <div className='py-8 px-4 lg:px-0 flex justify-between flex-col lg:flex-row'>
                    <div className='lg:basis-1/2 shrink-0 '>
                        <div className='text-xl mb-5 font-medium'>
                            {language === 'uk-UA' ? 'Актори' : 'Cast'}{' '}
                            <span className='opacity-50'>{movieCredits.cast.length}</span>
                        </div>
                        {movieCredits.cast.map((person, index) => (
                            <div
                                key={person.id + index}
                                className='flex pb-4'
                            >
                                <div className='w-16 h-[70px] mr-5 rounded-md overflow-hidden cursor-pointer'>
                                    {person.profile_path ? (
                                        <LazyLoadImage
                                            src={`${baseUrlImg}/w200${person.profile_path}`}
                                            alt={person.name}
                                            effect='blur'
                                            height={70}
                                            width={64}
                                            placeholder={
                                                <LoadingModel
                                                    width={64}
                                                    height={70}
                                                />
                                            }
                                        />
                                    ) : (
                                        <img
                                            src='/user.svg'
                                            alt={person.name}
                                            className='w-full h-[70px] object-contain '
                                        />
                                    )}
                                </div>
                                <div className=''>
                                    <h2 className='text-lg font-semibold cursor-pointer'>
                                        {person.name}
                                    </h2>
                                    <h3 className='text-sm'>{person.character}</h3>
                                </div>
                            </div>
                        ))}
                    </div>
                    <div className='basis-1/2 shrink-0'>
                        <div className='text-xl mb-5 font-medium '>
                            {language === 'uk-UA' ? 'Команда' : 'Crew'}{' '}
                            <span className='opacity-50'>{movieCredits.crew.length}</span>
                        </div>
                        {movieCredits.crew.map((person, index) => (
                            <div
                                key={person.id + index}
                                className='flex pb-4'
                            >
                                <div className='w-16 h-[70px] mr-5 rounded-md overflow-hidden  cursor-pointer'>
                                    {person.profile_path ? (
                                        <LazyLoadImage
                                            src={`${baseUrlImg}/w200${person.profile_path}`}
                                            alt={person.name}
                                            className='w-full h-auto object-contain '
                                            effect='blur'
                                            height={70}
                                            width={64}
                                            placeholder={
                                                <LoadingModel
                                                    width={64}
                                                    height={70}
                                                />
                                            }
                                        />
                                    ) : (
                                        <img
                                            src='/user.svg'
                                            alt={person.name}
                                            className='w-full h-[70px] object-contain '
                                        />
                                    )}
                                </div>
                                <div className=''>
                                    <h2 className='text-lg font-semibold  cursor-pointer'>
                                        {person.name}
                                    </h2>
                                    <h3 className='text-sm'>{person.job}</h3>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </Container>
        </>
    );
};

export default CastAndCrew;
