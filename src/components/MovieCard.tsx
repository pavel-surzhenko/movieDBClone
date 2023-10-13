// React & Libraries
import { useContext } from 'react';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import { CircularProgressbar, buildStyles } from 'react-circular-progressbar';
import { Link } from 'react-router-dom';

// Components
import LoadingModel from './LoadingModel';

// Types
import { movieProps } from '../types/Movie';
import { tvProps } from '../types/TV';

// Hooks
import { useGetCircleColor, useGetTrailColor } from '../hooks';

// Other
import { Context, baseUrlImg, dateOptions } from '../lib';

// CSS
import 'react-circular-progressbar/dist/styles.css';
import 'react-lazy-load-image-component/src/effects/blur.css';

const MovieCard: React.FC<movieProps | tvProps> = (props) => {
    const { language } = useContext(Context);

    const release_date = 'release_date' in props ? props.release_date : props.first_air_date;

    const localLanguage = language.replace(`"`, '').slice(0, 2);

    const localDate = new Date(release_date).toLocaleDateString(localLanguage, dateOptions);

    const title = 'title' in props ? props.title : props.name;

    return (
        <div className='min-w-[150px] w-[150px] min-h-[300px] mr-5 '>
            <div className='relative'>
                <div className='overflow-hidden rounded-lg cursor-pointer transform transition-all duration-500 hover:scale-105 hover:rounded-none'>
                    <Link
                        to={`${'title' in props ? `/movie/${props.id}` : `/tv/${props.id}`}`}
                        onClick={() => window.scrollTo(0, 0)}
                    >
                        {props.poster_path ? (
                            <LazyLoadImage
                                src={`${baseUrlImg}/w200${props.poster_path}`}
                                alt={title}
                                className='w-[150px] object-cover h-[225px]'
                                effect='blur'
                                placeholder={
                                    <LoadingModel
                                        width={150}
                                        height={225}
                                    />
                                }
                                threshold={1}
                                delayMethod='debounce'
                                wrapperClassName={'fix-style'}
                            />
                        ) : (
                            <LazyLoadImage
                                src={'/image.svg'}
                                alt={title}
                                className='w-[150px] object-contain h-[225px] bg-lightGray'
                                effect='blur'
                                placeholder={
                                    <LoadingModel
                                        width={150}
                                        height={225}
                                    />
                                }
                                threshold={1}
                                delayMethod='debounce'
                                wrapperClassName={'fix-style'}
                            />
                        )}
                    </Link>
                </div>
                <div className='w-9 h-9 absolute -bottom-4 left-4 font-semibold'>
                    <CircularProgressbar
                        value={props.vote_average}
                        minValue={1}
                        maxValue={10}
                        text={`${Math.round(props.vote_average * 10)}`}
                        background
                        styles={buildStyles({
                            pathColor: `${useGetCircleColor(props.vote_average)}`,
                            textColor: '#fff',
                            trailColor: `${useGetTrailColor(props.vote_average)}`,
                            backgroundColor: '#001C22',
                            textSize: '35px',
                        })}
                    />
                </div>
            </div>
            <div className='pt-6 px-2 '>
                <div>
                    <Link
                        to={`${'title' in props ? `/movie/${props.id}` : `/tv/${props.id}`}`}
                        onClick={() => window.scrollTo(0, 0)}
                    >
                        <h2 className='font-bold hover:text-lightBlue cursor-pointer transition-colors duration-300 line-clamp-3'>
                            {title}
                        </h2>
                    </Link>
                </div>
                <div className='mb-2'>
                    <p className='text-black/60'>{localDate}</p>
                </div>
            </div>
        </div>
    );
};

export default MovieCard;
