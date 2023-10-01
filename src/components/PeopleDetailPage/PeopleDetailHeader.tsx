// React & Libraries
import { useState, useContext } from 'react';

// Other
import { Context, baseUrlImg, genders } from '../../lib';

// Types
import { peopleDetailsProps } from '../../types/People/peopleDetailsProps';
import { Link } from 'react-router-dom';
import { CustomLink } from '../../assets';
import TabsContainer from '../TabsContainer';

const PeopleDetailHeader: React.FC<{ personData: peopleDetailsProps | null }> = ({
    personData,
}) => {
    const [showAllParagraphs, setShowAllParagraphs] = useState(false);
    const { language } = useContext(Context);

    const age =
        personData?.birthday &&
        new Date().getFullYear() - new Date(personData.birthday).getFullYear();

    const MAX_PARAGRAPHS_TO_SHOW = 2;
    const paragraphs = personData?.biography
        .split('\n')
        .filter((paragraph) => paragraph.trim() !== '');
    const displayedParagraphs = showAllParagraphs
        ? paragraphs
        : paragraphs?.slice(0, MAX_PARAGRAPHS_TO_SHOW);

    return (
        <section className='my-5 flex flex-col md:flex-row px-5 relative'>
            <div className='w-full md:w-[300px] md:mr-10'>
                <div className='mx-auto min-w-[180px] w-[180px] md:min-w-[300px] md:w-[300px] rounded-md overflow-hidden'>
                    <img
                        src={
                            personData?.profile_path
                                ? `${baseUrlImg}/w1280${personData?.profile_path}`
                                : `/user.svg`
                        }
                        alt={personData?.name}
                        className='w-full object-contain'
                    />
                </div>
                <div className='my-3'>
                    {personData?.homepage && (
                        <div className='mb-1 md:mb-2'>
                            <Link
                                to={personData?.homepage}
                                target='_blank'
                            >
                                <CustomLink />
                            </Link>
                        </div>
                    )}
                    <h3 className='mb-2 text-xl font-semibold'>Personal info</h3>
                    {personData?.known_for_department && (
                        <div className='mb-1 md:mb-2'>
                            <span className='font-semibold'>Known For: </span>
                            <span>{personData?.known_for_department}</span>
                        </div>
                    )}
                    {personData?.gender !== 0 && (
                        <div className='mb-1 md:mb-2'>
                            <span className='font-semibold'>Gender: </span>
                            <span>
                                {personData?.gender && genders[language][personData?.gender]}
                            </span>
                        </div>
                    )}
                    {personData?.birthday && (
                        <div className='mb-1 md:mb-2'>
                            <span className='font-semibold'>Birthday: </span>
                            <span>
                                {personData?.birthday} ({age} years old)
                            </span>
                        </div>
                    )}
                    {personData?.place_of_birth && (
                        <div className='mb-1 md:mb-2'>
                            <span className='font-semibold'>Place of Birth: </span>
                            <span>{personData?.place_of_birth}</span>
                        </div>
                    )}
                    {personData?.also_known_as.length !== 0 && (
                        <div className='mb-1 md:mb-2 hidden md:block'>
                            <span className='font-semibold'>Also Known As: </span>
                            <span>
                                {personData?.also_known_as.map((name, index) => (
                                    <p key={index}>{name}</p>
                                ))}
                            </span>
                        </div>
                    )}
                </div>
            </div>
            <div className='overflow-x-auto'>
                <h1 className='text-2xl md:text-3xl font-bold mb-3 md:mb-5 text-center md:text-left animate-fade-down animate-once animate-duration-500 animate-ease-linear'>
                    {personData?.name}
                </h1>
                <div>
                    <h3 className='text-xl font-semibold mb-2 animate-fade-down animate-once animate-duration-500 animate-delay-100 animate-ease-linear'>
                        {language === 'uk-UA' ? 'Біографія' : 'Biography'}
                    </h3>
                    <div className='mb-5'>
                        {displayedParagraphs?.map((paragraph, index) => (
                            <p
                                className={`mb-5 animate-fade-down animate-once animate-duration-500 animate-delay-300 animate-ease-linear ${
                                    index === displayedParagraphs.length - 1 ? 'mb-0' : ''
                                }`}
                                key={index}
                            >
                                {paragraph}
                            </p>
                        ))}
                        {paragraphs && paragraphs?.length > MAX_PARAGRAPHS_TO_SHOW && (
                            <button
                                onClick={() => setShowAllParagraphs(!showAllParagraphs)}
                                className='text-lightBlue'
                            >
                                {!showAllParagraphs &&
                                    (language === 'uk-UA' ? 'Читати більше' : 'Read more')}
                            </button>
                        )}
                        {personData?.biography.length === 0 && (
                            <p>
                                {language === 'uk-UA'
                                    ? 'На жаль немає достатньо інформації'
                                    : 'Unfortunately, there is not enough information'}
                            </p>
                        )}
                    </div>
                </div>
                {personData?.combined_credits.cast &&
                    personData?.combined_credits.cast.length > 0 && (
                        <>
                            <h3 className='text-xl font-semibold'>
                                Movie Cast ({personData?.combined_credits.cast.length})
                            </h3>
                            <TabsContainer
                                movies={personData?.combined_credits.cast.sort(
                                    (a, b) => b.vote_average - a.vote_average
                                )}
                            />
                        </>
                    )}
                {personData?.combined_credits.crew &&
                    personData?.combined_credits.crew.length > 0 && (
                        <>
                            <h3 className='text-xl font-semibold'>
                                Crew Cast ({personData?.combined_credits.crew.length})
                            </h3>
                            <TabsContainer
                                movies={personData?.combined_credits.crew.sort(
                                    (a, b) => b.vote_average - a.vote_average
                                )}
                            />
                        </>
                    )}
            </div>
        </section>
    );
};

export default PeopleDetailHeader;
