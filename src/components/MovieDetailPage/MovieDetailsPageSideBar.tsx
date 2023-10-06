// React & Libraries
import { Link } from 'react-router-dom';
import { useContext } from 'react';

// Assets
import { Instagram, Twitter, Facebook, IMDB, CustomLink } from '../../assets';

// Types
import { movieDetailProps } from '../../types/Movie';
import { tvDetailProps } from '../../types/TV';
import { keywordsProps } from '../../types/keywordsProps';

// Other
import { Context } from '../../lib';
import { linksProps } from '../../types';

const MovieDetailsPageSideBar = ({
    movieData,
    keywords,
    links,
}: {
    movieData: movieDetailProps | tvDetailProps;
    keywords: keywordsProps;
    links: linksProps;
}) => {
    const { language } = useContext(Context);

    return (
        <aside>
            <div className='flex mb-3 items-center'>
                {links?.instagram_id && (
                    <Link
                        className='mr-4'
                        to={`https://www.instagram.com/${links.instagram_id}`}
                        target='_blank'
                    >
                        <Instagram />
                    </Link>
                )}
                {links?.twitter_id && (
                    <Link
                        className='mr-4'
                        to={`https://twitter.com/${links.twitter_id}`}
                        target='_blank'
                    >
                        <Twitter />
                    </Link>
                )}
                {links?.facebook_id && (
                    <Link
                        className='mr-4'
                        to={`https://twitter.com/facebook/${links.facebook_id}`}
                        target='_blank'
                    >
                        <Facebook />
                    </Link>
                )}
                {links?.imdb_id && (
                    <Link
                        className='mr-4'
                        to={`https://www.imdb.com/title/${links.imdb_id}`}
                        target='_blank'
                    >
                        <IMDB />
                    </Link>
                )}
                {movieData.homepage && (
                    <Link
                        className='mr-2'
                        to={movieData.homepage}
                        target='_blank'
                    >
                        <CustomLink />
                    </Link>
                )}
            </div>
            <div>
                <div className='mb-3'>
                    <div className='font-semibold'>
                        {language === 'uk-UA' ? 'Статус' : 'Status'}
                    </div>
                    <div className='font-light'>{movieData.status}</div>
                </div>
                {'number_of_episodes' in movieData && (
                    <div className='mb-3'>
                        <div className='font-semibold'>
                            {language === 'uk-UA' ? 'Кількість серій' : 'Number of episodes'}
                        </div>
                        <div className='font-light'>{movieData.number_of_episodes}</div>
                    </div>
                )}
                {'number_of_seasons' in movieData && (
                    <div className='mb-3'>
                        <div className='font-semibold'>
                            {language === 'uk-UA' ? 'Кількість сезонів' : 'Number of seasons'}
                        </div>
                        <div className='font-light'>{movieData.number_of_seasons}</div>
                    </div>
                )}
                {'budget' in movieData && (
                    <div className='mb-3'>
                        <div className='font-semibold'>
                            {language === 'uk-UA' ? 'Бюджет' : 'Budget'}
                        </div>
                        <div className='font-light'>{movieData.budget}$</div>
                    </div>
                )}
                {'networks' in movieData && (
                    <div className='mb-3'>
                        <div className='font-semibold'>
                            {language === 'uk-UA' ? 'Мережа' : 'Networks'}
                        </div>
                        {movieData.networks.map((network) => (
                            <div
                                key={network.id}
                                className='font-light'
                            >
                                {network.name}
                            </div>
                        ))}
                    </div>
                )}
                <div className='mb-3'>
                    <div className='font-semibold'>
                        {language === 'uk-UA' ? 'Мова оригінала' : 'Original Language'}
                    </div>
                    <div className='font-light'>
                        {movieData.original_language.charAt(0).toUpperCase() +
                            movieData.original_language.substring(1)}
                    </div>
                </div>
                {keywords.results && keywords?.results?.length > 0 && (
                    <div className='mb-3'>
                        <div className='font-semibold mb-1'>
                            {language === 'uk-UA' ? 'Ключові слова' : 'Keywords'}
                        </div>
                        {keywords?.results?.map((word) => (
                            <span
                                key={word.id}
                                className='text-sm inline-block px-1 mr-2 mb-2 font-light bg-black bg-opacity-10 border border-solid border-[#d7d7d7]'
                            >
                                {word.name}
                            </span>
                        ))}
                    </div>
                )}
                {keywords.keywords && keywords?.keywords?.length > 0 && (
                    <div className='mb-3'>
                        <div className='font-semibold mb-1'>
                            {language === 'uk-UA' ? 'Ключові слова' : 'Keywords'}
                        </div>
                        {keywords?.keywords?.map((word) => (
                            <span
                                key={word.id}
                                className='text-sm inline-block px-1 mr-2 mb-2 font-light bg-black bg-opacity-10 border border-solid border-[#d7d7d7]'
                            >
                                {word.name}
                            </span>
                        ))}
                    </div>
                )}
            </div>
        </aside>
    );
};

export default MovieDetailsPageSideBar;
