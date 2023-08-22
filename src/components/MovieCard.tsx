import { useContext } from 'react';
import { Context } from '../lib/context';
import { baseUrlImg } from '../lib/links';
import { CircularProgressbar, buildStyles } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';
import { movieProps } from '../types/movieProps';
import { tvProps } from '../types/tvProps';
import MoreInfoIcon from '../assets/MoreInfoIcon';
import { Link } from 'react-router-dom';
import { getCircleColor } from '../hooks/useGetCircleColor';
import { getTrailColor } from '../hooks/useGetTrailColor';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import 'react-lazy-load-image-component/src/effects/blur.css';
import LoadingModel from './LoadingModel';

export const MovieCard: React.FC<movieProps | tvProps> = (props) => {
    const { language } = useContext(Context);

    const dateOptions: Intl.DateTimeFormatOptions = {
        day: 'numeric',
        month: 'short',
        year: 'numeric',
    };

    const release_date =
        'release_date' in props ? props.release_date : props.first_air_date;

    const localLanguage = language.replace(`"`, '').slice(0, 2);

    const localDate = new Date(release_date).toLocaleDateString(
        localLanguage,
        dateOptions
    );

    const title = 'title' in props ? props.title : props.name;

    return (
        <div className='min-w-[150px] min-h-[225px]  mr-5 '>
            <div className='drop-shadow-custom relative '>
                <div className='overflow-hidden rounded-lg cursor-pointer'>
                    <Link
                        to={`${
                            'title' in props
                                ? `movie/${props.id}`
                                : `tv/${props.id}`
                        }`}
                    >
                        <LazyLoadImage
                            src={`${baseUrlImg}/w200${props.poster_path}`}
                            alt={title}
                            className='w-full object-cover h-[225px] '
                            effect='blur'
                            placeholder={
                                <LoadingModel
                                    width='150'
                                    height='225'
                                />
                            }
                            threshold={1}
                            delayMethod='debounce'
                            wrapperClassName={'fix-style'}
                        />
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
                            pathColor: `${getCircleColor(props.vote_average)}`,
                            textColor: '#fff',
                            trailColor: `${getTrailColor(props.vote_average)}`,
                            backgroundColor: '#001C22',
                            textSize: '35px',
                        })}
                    />
                </div>
                <div className='absolute w-6 h-6 top-2 right-2 cursor-pointer opacity-50 hover:opacity-100 transition-opacity duration-300'>
                    <MoreInfoIcon />
                </div>
            </div>
            <div className='pt-6 px-2'>
                <div>
                    <Link
                        to={`${
                            'title' in props
                                ? `movie/${props.id}`
                                : `tv/${props.id}`
                        }`}
                    >
                        <h2 className='movies-title hover:text-lightBlue cursor-pointer transition-colors duration-300'>
                            {title}
                        </h2>
                    </Link>
                </div>
                <div>
                    <p className='text-black/60'>{localDate}</p>
                </div>
            </div>
        </div>
    );
};

export default MovieCard;
