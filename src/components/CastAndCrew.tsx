import { Link, useOutletContext } from 'react-router-dom';
import { OutletContextType } from '../types/movieDetailProps';
import Container from './Container';
import { getColor } from 'color-thief-react';
import { useState, useEffect } from 'react';
import { baseUrlImg } from '../lib/links';
import LeftArrow from '../assets/leftArrow';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import LoadingModel from './LoadingModel';

import 'react-lazy-load-image-component/src/effects/blur.css';

export const CastAndCrew = () => {
    const { movieCredits, movieData }: OutletContextType = useOutletContext();
    const [dominantColor, setDominantColor] = useState<string>();

    useEffect(() => {
        getColor(
            `${baseUrlImg}/w1280${movieData?.poster_path}?api_key=${import.meta.env.VITE_TMDB_KEY}`,
            'hex',
            'anonymous'
        ).then((color) => setDominantColor(color));
    }, [movieData.poster_path]);

    return (
        <>
            <div
                className='py-4'
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
                            <h2 className='text-3xl  font-bold'>{movieData.title}</h2>
                            <Link
                                to='..'
                                className='flex hover:underline underline-offset-2 items-center'
                            >
                                {' '}
                                <LeftArrow />
                                back to main
                            </Link>
                        </div>
                    </div>
                </Container>
            </div>
            <Container>
                <div className='py-8 flex justify-between'>
                    <div className='basis-1/2'>
                        <div className='text-xl mb-5 font-medium basis-1/2'>
                            Cast <span className='opacity-50'>{movieCredits.cast.length}</span>
                        </div>
                        {movieCredits.cast.map((person) => (
                            <div
                                key={person.id}
                                className='flex pb-4'
                            >
                                <div className='w-16 h-[70px] mr-5 rounded-md overflow-hidden  cursor-pointer'>
                                    {person.profile_path ? (
                                        <LazyLoadImage
                                            src={`${baseUrlImg}/w200${person.profile_path}`}
                                            alt={person.name}
                                            className='w-full h-auto object-contain '
                                            effect='blur'
                                            placeholder={
                                                <LoadingModel
                                                    width='64'
                                                    height='70'
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
                                    <h3 className='text-sm'>{person.character}</h3>
                                </div>
                            </div>
                        ))}
                    </div>
                    <div className='basis-1/2'>
                        <div className='text-xl mb-5 font-medium '>
                            Crew <span className='opacity-50'>{movieCredits.crew.length}</span>
                        </div>
                        {movieCredits.crew.map((person) => (
                            <div
                                key={person.id}
                                className='flex pb-4'
                            >
                                <div className='w-16 h-[70px] mr-5 rounded-md overflow-hidden  cursor-pointer'>
                                    {person.profile_path ? (
                                        <LazyLoadImage
                                            src={`${baseUrlImg}/w200${person.profile_path}`}
                                            alt={person.name}
                                            className='w-full h-auto object-contain '
                                            effect='blur'
                                            placeholder={
                                                <LoadingModel
                                                    width='64'
                                                    height='70'
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
