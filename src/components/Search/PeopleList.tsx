// React
import { LazyLoadImage } from 'react-lazy-load-image-component';

// Types
import { baseUrlImg } from '../../lib';
import { peopleProps } from '../../types/People/peopleProps';

// Components
import LoadingModel from '../LoadingModel';
import { Link } from 'react-router-dom';

const PeopleList: React.FC<peopleProps> = (props) => {
    return (
        <div
            key={props.id}
            className='flex pb-4'
        >
            <div className='w-16 h-[70px] mr-5 rounded-md overflow-hidden  cursor-pointer'>
                {props.profile_path ? (
                    <LazyLoadImage
                        src={`${baseUrlImg}/w200${props.profile_path}`}
                        alt={props.name}
                        className='w-full h-auto object-contain '
                        effect='blur'
                        height={70}
                        width={64}
                        placeholder={
                            <LoadingModel
                                width={64}
                                height={70}
                            />
                        }
                    />
                ) : (
                    <img
                        src='/user.svg'
                        alt={props.name}
                        className='w-full h-[70px] object-contain '
                    />
                )}
            </div>
            <div className=''>
                <h2 className='text-lg font-semibold  cursor-pointer hover:text-lightBlue transition-colors duration-300'>
                    <Link to={`/people/${props.id}`}>{props.name}</Link>
                </h2>
                <span className='text-sm'>{props.known_for_department} |</span>
                {props.known_for?.map((movie) => (
                    <Link
                        className='text-sm font-light hover:text-lightBlue transition-colors duration-300'
                        key={movie.id}
                        to={`${'title' in movie ? `/movie/${movie.id}` : `/tv/${movie.id}`}`}
                    >
                        {' '}
                        {'title' in movie ? movie.title : movie.name}{' '}
                    </Link>
                ))}
            </div>
        </div>
    );
};

export default PeopleList;
