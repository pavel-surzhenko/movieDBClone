import Facebook from '../assets/Facebook';
import IMDB from '../assets/IMDB';
import Instagram from '../assets/Instagram';
import CustomLink from '../assets/CustomLink';
import Twitter from '../assets/Twitter';
import { movieDetailProps } from '../types/movieDetailProps';
import { tvDetailProps } from '../types/tvDetailProps';
import { Link, useLocation } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { api } from '../api/api';
import { tvLinksProps } from '../types/tvLinksProps';

const MovieDetailsPageSideBar: React.FC<movieDetailProps | tvDetailProps> = ({
    status,
    id,
    homepage,
}) => {
    const [links, setLinks] = useState<tvLinksProps>();
    const { pathname } = useLocation();
    const movieType = pathname.split('/')[1] as 'movie' | 'tv';

    console.log(links);

    useEffect(() => {
        if (movieType === 'tv') {
            api.tv
                .getLinks(id)
                .then((data) => setLinks(data))
                .catch();
        } else {
            api.movies
                .getLinks(id)
                .then((data) => setLinks(data))
                .catch();
        }
    }, [id]);
    return (
        <aside>
            <div className='flex mb-3 items-center'>
                {links?.instagram_id && (
                    <Link
                        className='mr-2'
                        to={`https://www.instagram.com/${links.instagram_id}`}
                        target='_blank'
                    >
                        <Instagram />
                    </Link>
                )}
                {links?.twitter_id && (
                    <Link
                        className='mr-2'
                        to={`https://twitter.com/${links.twitter_id}`}
                        target='_blank'
                    >
                        <Twitter />
                    </Link>
                )}
                {links?.facebook_id && (
                    <Link
                        className='mr-2'
                        to={`https://twitter.com/facebook/${links.facebook_id}`}
                        target='_blank'
                    >
                        <Facebook />
                    </Link>
                )}
                {links?.imdb_id && (
                    <Link
                        className='mr-2'
                        to={`https://www.imdb.com/title/${links.imdb_id}`}
                        target='_blank'
                    >
                        <IMDB />
                    </Link>
                )}
                {homepage && (
                    <Link
                        className='mr-2'
                        to={homepage}
                        target='_blank'
                    >
                        <CustomLink />
                    </Link>
                )}
            </div>
            <div>
                <p className='text-lg font-semibold mb-4'>Facts</p>
                <div className=''>
                    <div className='font-semibold'>Status</div>
                    <div className='font-light'>{status}</div>
                </div>
            </div>
        </aside>
    );
};

export default MovieDetailsPageSideBar;
