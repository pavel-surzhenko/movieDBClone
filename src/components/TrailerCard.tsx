import { LazyLoadImage } from 'react-lazy-load-image-component';
import { baseUrlImg } from '../lib/links';
import { trailerProps } from '../types/Trailer/trailerProps';
import 'react-lazy-load-image-component/src/effects/blur.css';

const TrailerCard: React.FC<trailerProps> = ({ movieDetails, handleHover, handleClick }) => {
    return (
        <div className='mr-5 min-w-[300px] animate-fade animate-duration-500 animate-ease-linear cursor-pointer relative '>
            <div className='shadow-custom relative mb-2'>
                <div
                    className={`overflow-hidden rounded-lg min-h-[168px] relative  transition-transform duration-300`}
                    onMouseEnter={() => {
                        handleHover(movieDetails!.backdrop_path);
                    }}
                    onClick={(e) => {
                        handleClick(String(movieDetails.id));
                        e.stopPropagation();
                    }}
                >
                    <LazyLoadImage
                        src={`${baseUrlImg}/w300${movieDetails?.backdrop_path}`}
                        alt={movieDetails?.title}
                        className={`w-full h-full object-cover`}
                        effect='blur'
                        threshold={1}
                        delayMethod='debounce'
                        wrapperClassName={'fix-style'}
                    />
                    <div className='absolute inset-0 flex items-center justify-center'>
                        <div className='w-16 h-16 flex items-center justify-center '>
                            <img
                                src='/playIcon.svg'
                                className='invert hover:scale-125 transition-all duration-300'
                            />
                        </div>
                    </div>
                </div>
            </div>
            <div>
                <h2 className='text-white text-lg pb-5 text-center'>{movieDetails?.title}</h2>
            </div>
        </div>
    );
};

export default TrailerCard;
