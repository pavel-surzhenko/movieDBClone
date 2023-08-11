import { useEffect, useRef } from 'react';
import { ModalTrailerProps } from '../types/ModalTrailerProps';
import { YOUTUBE_BASE } from '../lib/links';

export const ModalTrailer: React.FC<ModalTrailerProps> = (props) => {
    console.log(props.showTrailerLink);

    return (
        <div>
            <button
                onClick={() => {
                    props.closeModal();
                }}
            >
                close
            </button>
            <iframe
                src={`${YOUTUBE_BASE}embed/${props.showTrailerLink}`}
                allow='accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share'
                aria-controls='false'
            ></iframe>
        </div>
    );
};

export default ModalTrailer;
