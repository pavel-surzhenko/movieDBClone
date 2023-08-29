import { Suspense, useContext } from 'react';
import { movieCreditsProps } from '../types/movieCreditsProps';
import { Context } from '../lib/context';
import Container from './Container';
import { Link } from 'react-router-dom';
import LoadingModel from './LoadingModel';
import React from 'react';
import { tvCreditsProps } from '../types/tvCreditsProps';

const PersonCard = React.lazy(() => import('./PersonCard'));

const MovieDetailsPageCast: React.FC<movieCreditsProps | tvCreditsProps> = ({ cast }) => {
    const { language } = useContext(Context);
    return (
        <section>
            <Container>
                <div className='pt-4 lg:py-[30px] pl-8 lg:pl-[40px] white-shadow relative'>
                    <h2 className='text-xl font-semibold mb-5'>
                        {language === 'uk-UA' ? 'Головні актори' : 'Main Cast'}
                    </h2>
                    <div className='flex flex-nowrap overflow-x-auto snap-x '>
                        {cast.slice(0, 10).map((person) => (
                            <Suspense
                                key={person.id}
                                fallback={
                                    <LoadingModel
                                        width={150}
                                        height={225}
                                    />
                                }
                            >
                                <PersonCard {...person} />
                            </Suspense>
                        ))}
                    </div>
                </div>
                <div className='text-lg font-semibold cursor-pointer hover:underline pl-8 lg:pl-[40px] py-4 lg:py-[20px]'>
                    <Link
                        to='cast'
                        onClick={() => window?.scrollTo(0, 0)}
                    >
                        {language === 'uk-UA' ? 'Всі актори та команда' : 'Full cast & crew'}
                    </Link>
                </div>
            </Container>
        </section>
    );
};

export default MovieDetailsPageCast;
