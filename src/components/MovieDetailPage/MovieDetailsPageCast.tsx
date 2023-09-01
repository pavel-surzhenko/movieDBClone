// React & Libraries
import React from 'react';
import { Suspense, useContext } from 'react';
import { Link } from 'react-router-dom';

// Components
import LoadingModel from '../LoadingModel';

// Types
import { movieCreditsProps } from '../../types/Movie';
import { tvCreditsProps } from '../../types/TV';

// Other
import { Context } from '../../lib';

const PersonCard = React.lazy(() => import('../PersonCard'));

const MovieDetailsPageCast: React.FC<movieCreditsProps | tvCreditsProps> = ({ cast }) => {
    const { language } = useContext(Context);
    return (
        <section>
            <div className='pt-4 lg:py-[30px] pl-8 lg:pl-[40px] white-shadow relative'>
                <h2 className='text-xl font-semibold mb-5 animate-fade-right animate-once animate-duration-500'>
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
            <div className='text-lg font-semibold cursor-pointer underline underline-offset-2 pl-8 lg:pl-[40px] py-4 lg:py-[20px] animate-fade-right animate-once animate-duration-500'>
                <Link
                    to='cast'
                    onClick={() => window?.scrollTo(0, 0)}
                >
                    {language === 'uk-UA' ? 'Всі актори та команда' : 'Full cast & crew'}
                </Link>
            </div>
        </section>
    );
};

export default MovieDetailsPageCast;
