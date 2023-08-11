import { YOUTUBE_BASE, baseUrlImg } from '../lib/links';
import { TrailerProps } from '../types/TrailerProps';

export const TrailerCard: React.FC<TrailerProps> = ({
    id,
    link,
    movieDetails,
    handleHover,
}) => {
    return (
        <div className='min-w-[300px] animate-fade animate-duration-500 animate-ease-linear cursor-pointer relative'>
            <div className='drop-shadow-custom relative mb-2'>
                <div
                    className='overflow-hidden rounded-lg min-h-[168px] relative'
                    onMouseEnter={() =>
                        handleHover(movieDetails!.backdrop_path)
                    }
                >
                    {/* <iframe
                        src={`${YOUTUBE_BASE}embed/${props.link}`}
                        allow='accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share'
                        aria-controls='false'
                    ></iframe> */}
                    <img
                        src={`${baseUrlImg}/w500${movieDetails?.backdrop_path}`}
                        alt={movieDetails?.title}
                        className='w-full h-auto object-contain '
                    />
                    <div className='absolute inset-0 flex items-center justify-center'>
                        <div className='w-16 h-16 flex items-center justify-center '>
                            {/* Ваш плей айкон */}
                            <img
                                src='/playIcon.svg'
                                className='invert'
                            />
                        </div>
                    </div>
                </div>
            </div>
            <div>
                <h2 className='text-white text-lg'>{movieDetails?.title}</h2>
            </div>
        </div>
    );
};

export default TrailerCard;
