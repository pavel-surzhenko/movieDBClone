import Facebook from '../assets/Facebook';
import IMDB from '../assets/IMDB';
import Instagram from '../assets/Instagram';
import CustomLink from '../assets/CustomLink';
import Twitter from '../assets/Twitter';
import { movieDetailProps } from '../types/movieDetailProps';
import { tvDetailProps } from '../types/tvDetailProps';
import { Link, useLocation } from 'react-router-dom';
import { useContext, useEffect, useState } from 'react';
import { api } from '../api/api';
import { tvLinksProps } from '../types/tvLinksProps';
import { keyWordsProps } from '../types/keyWordsProps';
import { Context } from '../lib/context';

const MovieDetailsPageSideBar: React.FC<movieDetailProps | tvDetailProps> = (props) => {
    const [links, setLinks] = useState<tvLinksProps>();
    const [words, setWords] = useState<keyWordsProps>();
    const { pathname } = useLocation();
    const movieType = pathname.split('/')[1] as 'movie' | 'tv';
    const { language } = useContext(Context);

    useEffect(() => {
        if (movieType === 'tv') {
            api.tv
                .getLinks(props.id)
                .then((data) => setLinks(data))
                .catch();
            api.tv
                .getKeyWords(props.id)
                .then((data) => setWords(data))
                .catch();
        } else {
            api.movies
                .getLinks(props.id)
                .then((data) => setLinks(data))
                .catch();
            api.movies
                .getKeyWords(props.id)
                .then((data) => setWords(data))
                .catch();
        }
    }, [props.id, movieType]);
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
                {props.homepage && (
                    <Link
                        className='mr-2'
                        to={props.homepage}
                        target='_blank'
                    >
                        <CustomLink />
                    </Link>
                )}
            </div>
            <div>
                <p className='text-lg font-semibold mb-4'>
                    {language === 'uk-UA' ? 'Факти' : 'Facts'}
                </p>
                <div className='mb-3'>
                    <div className='font-semibold'>
                        {language === 'uk-UA' ? 'Статус' : 'Status'}
                    </div>
                    <div className='font-light'>{props.status}</div>
                </div>
                {'number_of_episodes' in props && (
                    <div className='mb-3'>
                        <div className='font-semibold'>
                            {language === 'uk-UA' ? 'Кількість серій' : 'Number of episodes'}
                        </div>
                        <div className='font-light'>{props.number_of_episodes}</div>
                    </div>
                )}
                {'number_of_seasons' in props && (
                    <div className='mb-3'>
                        <div className='font-semibold'>
                            {language === 'uk-UA' ? 'Кількість сезонів' : 'Number of seasons'}
                        </div>
                        <div className='font-light'>{props.number_of_seasons}</div>
                    </div>
                )}
                {'budget' in props && (
                    <div className='mb-3'>
                        <div className='font-semibold'>
                            {language === 'uk-UA' ? 'Бюджет' : 'Budget'}
                        </div>
                        <div className='font-light'>{props.budget}$</div>
                    </div>
                )}
                {'networks' in props && (
                    <div className='mb-3'>
                        <div className='font-semibold'>
                            {language === 'uk-UA' ? 'Мережа' : 'Networks'}
                        </div>
                        {props.networks.map((network) => (
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
                    <div className='font-light'>{props.original_language}</div>
                </div>
                {words && words.keywords?.length > 0 && (
                    <div className='mb-3'>
                        <div className='font-semibold mb-1'>
                            {language === 'uk-UA' ? 'Ключові слова' : 'Keywords'}
                        </div>
                        {words?.keywords.map((word) => (
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
