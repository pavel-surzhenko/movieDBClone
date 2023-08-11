import { baseUrlImg } from '../lib/links';
import { trailerProps } from '../types/trailerProps';

export const TrailerCard: React.FC<trailerProps> = ({
    link,
    movieDetails,
    handleHover,
    handleClick,
}) => {
    return (
        <div className='min-w-[300px] animate-fade animate-duration-500 animate-ease-linear cursor-pointer relative'>
            <div className='drop-shadow-custom relative mb-2'>
                <div
                    className={`overflow-hidden rounded-lg min-h-[168px] relative hover:scale-105 transition-transform duration-300`}
                    onMouseEnter={() => {
                        handleHover(movieDetails!.backdrop_path);
                    }}
                    onClick={(e) => {
                        handleClick(link);
                        e.stopPropagation();
                    }}
                >
                    <img
                        src={`${baseUrlImg}/w500${movieDetails?.backdrop_path}`}
                        alt={movieDetails?.title}
                        className={`w-full h-auto object-contain`}
                    />
                    <div className='absolute inset-0 flex items-center justify-center'>
                        <div className='w-16 h-16 flex items-center justify-center '>
                            <img
                                src='/playIcon.svg'
                                className='invert'
                            />
                        </div>
                    </div>
                </div>
            </div>
            <div>
                <h2 className='text-white text-lg pb-5'>
                    {movieDetails?.title}
                </h2>
            </div>
        </div>
    );
};

export default TrailerCard;
