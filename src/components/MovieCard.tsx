import { useContext } from 'react';
import { LanguageContext } from '../lib/context';
import { MovieProps } from '../types/MovieProps';
import { baseUrlImg } from '../lib/links';
import { CircularProgressbar, buildStyles } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';

export const MovieCard: React.FC<MovieProps> = ({
    title,
    release_date,
    poster_path,
    vote_average,
}) => {
    const { language } = useContext(LanguageContext);
    const dateOptions: Intl.DateTimeFormatOptions = {
        day: 'numeric',
        month: 'short',
        year: 'numeric',
    };
    const localDate = new Date(release_date).toLocaleDateString(
        language,
        dateOptions
    );

    const circleColor =
        vote_average < 5 ? '#db2360' : vote_average < 7 ? '#d2d531' : '#21d07a';
    const trailColor =
        vote_average < 5 ? '#571435' : vote_average < 7 ? '#423d0f' : '#204529';

    return (
        <div className='min-w-[150px]'>
            <div className='drop-shadow-custom relative'>
                <div className='overflow-hidden rounded-lg'>
                    <img
                        src={`${baseUrlImg}/w500${poster_path}`}
                        alt={title}
                        className='w-full h-auto object-contain '
                    />
                </div>
                <div className='w-9 h-9 absolute -bottom-4 left-4 font-semibold'>
                    <CircularProgressbar
                        value={vote_average}
                        minValue={1}
                        maxValue={10}
                        text={`${Math.round(vote_average * 10)}`}
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
