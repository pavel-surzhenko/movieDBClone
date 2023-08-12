import { useContext } from 'react';
import { Context } from '../lib/context';
import { baseUrlImg } from '../lib/links';
import { CircularProgressbar, buildStyles } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';
import { movieProps } from '../types/movieProps';
import { tvProps } from '../types/tvProps';
import MoreInfoIcon from '../assets/MoreInfoIcon';

export const MovieCard: React.FC<movieProps | tvProps> = (props) => {
    const { language } = useContext(Context);
    const dateOptions: Intl.DateTimeFormatOptions = {
        day: 'numeric',
        month: 'short',
        year: 'numeric',
    };

    const release_date =
        'release_date' in props ? props.release_date : props.first_air_date;

    const localDate = new Date(release_date).toLocaleDateString(
        language,
        dateOptions
    );

    const title = 'title' in props ? props.title : props.name;

    const circleColor =
        props.vote_average < 5
            ? '#db2360'
            : props.vote_average < 7
            ? '#d2d531'
            : '#21d07a';
    const trailColor =
        props.vote_average < 5
            ? '#571435'
            : props.vote_average < 7
            ? '#423d0f'
            : '#204529';

    return (
        <div className='min-w-[150px] animate-fade animate-duration-500 animate-ease-linear mr-5'>
            <div className='drop-shadow-custom relative'>
                <div className='overflow-hidden rounded-lg cursor-pointer'>
                    <img
                        src={`${baseUrlImg}/w500${props.poster_path}`}
                        alt={title}
                        className='w-full h-auto object-contain '
                    />
                </div>
                <div className='w-9 h-9 absolute -bottom-4 left-4 font-semibold'>
                    <CircularProgressbar
                        value={props.vote_average}
                        minValue={1}
                        maxValue={10}
                        text={`${Math.round(props.vote_average * 10)}`}
                        background
                        styles={buildStyles({
                            pathColor: `${circleColor}`,
                            textColor: '#fff',
                            trailColor: `${trailColor}`,
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
                    <h2 className='movies-title hover:text-lightBlue cursor-pointer transition-colors duration-300'>
                        {title}
                    </h2>
                </div>
                <div>
                    <p className='text-black/60'>{localDate}</p>
                </div>
            </div>
        </div>
    );
};

export default MovieCard;
