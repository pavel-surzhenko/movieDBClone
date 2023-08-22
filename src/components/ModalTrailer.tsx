import { YOUTUBE_BASE } from '../lib/links';
import { useRef, useEffect, useState, useContext } from 'react';
import Spinner from './Spinner';
import { modalTrailerProps } from '../types/modalTrailerProps';
import { api } from '../api/api';
import { Context } from '../lib/context';
import { videoProps } from '../types/videoProps';

export const ModalTrailer: React.FC<modalTrailerProps> = (props) => {
    const { language } = useContext(Context);
    const [loading, setLoading] = useState(true);
    const [videos, setVideos] = useState<videoProps[]>();
    const ref = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const checkIfClickedOutside = (e: MouseEvent) => {
            e.stopPropagation();
            if (ref.current && !ref.current.contains(e.target as Node)) {
                props.closeModal();
            }
        };

        document.addEventListener('click', checkIfClickedOutside);

        api.movies
            .getVideos(Number(props.showTrailerLink), language)
            .then((data) => {
                setVideos(data?.results);
            });

        return () => {
            document.removeEventListener('click', checkIfClickedOutside);
        };
    }, [props, language]);

    const officialTrailer =
        videos?.find(
            (video) =>
                video.name === 'Official Trailer' ||
                video.name === 'Міжнародний трейлер'
        ) ||
        videos?.find(
            (video) =>
                video.name.includes('Official Trailer') ||
                video.name.includes('Міжнародний трейлер') ||
                video.name.includes('трейлер')
        );

    return (
        <div
            ref={ref}
            className='h-full flex items-center justify-center'
        >
            {loading && <Spinner />}
            <iframe
                src={`${YOUTUBE_BASE}embed/${officialTrailer?.key}`}
                allow='accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share'
                aria-controls='false'
                className='absolute top-0 left-0  w-full aspect-video'
                onLoad={() => setLoading(false)}
                allowFullScreen
            ></iframe>
        </div>
    );
};

export default ModalTrailer;
