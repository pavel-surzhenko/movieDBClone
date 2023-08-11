import { ModalTrailerProps } from '../types/ModalTrailerProps';
import { YOUTUBE_BASE } from '../lib/links';
import { useRef, useEffect } from 'react';

export const ModalTrailer: React.FC<ModalTrailerProps> = (props) => {
    const ref = useRef<HTMLDivElement>(null);
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
    }, [props]);

    return (
        <div ref={ref}>
            <iframe
                src={`${YOUTUBE_BASE}embed/${props.showTrailerLink}`}
                allow='accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share'
                aria-controls='false'
                className='absolute top-0 bottom-0 left-0 right-0 w-full h-full'
            ></iframe>
        </div>
    );
};

export default ModalTrailer;
