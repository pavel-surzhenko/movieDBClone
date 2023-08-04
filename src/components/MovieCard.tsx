import { useContext } from 'react';
import { LanguageContext } from '../lib/context';
import { MovieProps } from '../types/MovieProps';
import { baseUrlImg } from '../lib/links';
import { CircularProgressbar, buildStyles } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';
import { TVProps } from '../types/TVProps';

export const MovieCard: React.FC<MovieProps | TVProps> = (props) => {
    const { language } = useContext(LanguageContext);
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
        <div className='min-w-[150px] animate-fade animate-duration-500 animate-ease-linear'>
            <div className='drop-shadow-custom relative'>
                <div className='overflow-hidden rounded-lg'>
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
            </div>
            <div className='pt-6 px-2'>
                <div>
                    <h2 className='movies-title'>{title}</h2>
                </div>
                <div>
                    <p className='text-black/60'>{localDate}</p>
                </div>
            </div>
        </div>
    );
};

export default MovieCard;
