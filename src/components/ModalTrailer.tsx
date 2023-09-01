// React & Libraries
import { useRef, useEffect, useState, useContext } from 'react';

// Components
import Spinner from './Spinner';

// Other
import { YOUTUBE_BASE, Context } from '../lib';

// Types
import { modalTrailerProps } from '../types/Trailer';

// Hooks
import { useFetchTrailer } from '../hooks';

const ModalTrailer: React.FC<modalTrailerProps> = (props) => {
    const { language } = useContext(Context);
    const [loading, setLoading] = useState(true);
    const ref = useRef<HTMLDivElement>(null);
    const trailer = useFetchTrailer(props.trailerId, language, props.type);

    useEffect(() => {
        const checkIfClickedOutside = (e: MouseEvent) => {
            e.stopPropagation();
            if (ref.current && !ref.current.contains(e.target as Node)) {
                props.closeModal();
            }
        };

        document.addEventListener('click', checkIfClickedOutside);

        return () => {
            document.removeEventListener('click', checkIfClickedOutside);
        };
    }, [props, language]);

    return (
        <div
            ref={ref}
            className='h-full flex items-center justify-center'
        >
            {loading && <Spinner />}
            <iframe
                src={`${YOUTUBE_BASE}embed/${trailer?.key}`}
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
