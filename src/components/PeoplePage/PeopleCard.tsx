// React & Libraries
import { LazyLoadImage } from 'react-lazy-load-image-component';

// Component
import LoadingModel from '../LoadingModel';

// Types
import { peopleProps } from '../../types/People/peopleProps';

// Other
import { baseUrlImg } from '../../lib';
import { Link } from 'react-router-dom';

const PersonCard: React.FC<peopleProps> = (props) => {
    const known_for = props.known_for.map((film) =>
        'title' in film ? (
            <span
                className='mr-1'
                key={film.id}
            >
                {film.title}
            </span>
        ) : (
            <span
                key={film.id}
                className='mr-1'
            >
                {film.name}
            </span>
        )
    );

    return (
        <div
            key={props.id}
            className='max-w-[160px] min-w-[160px] min-h-[200px] md:max-w-[235px] md:min-w-[235px] md:min-h-[300px] animate-fade animate-duration-500 animate-ease-linear'
        >
            <div className='relative'>
                <div className='overflow-hidden rounded-lg cursor-pointer '>
                    <div>
                        <Link
                            to={`/people/${props.id}`}
                            onClick={() => window.scrollTo(0, 0)}
                        >
                            {props.profile_path ? (
                                <LazyLoadImage
                                    src={`${baseUrlImg}/w300${props.profile_path}`}
                                    alt={props.name}
                                    className='w-[160px] h-[160px] md:w-[235px] object-cover md:h-[235px] object-[0px_-20px]'
                                    effect='blur'
                                    placeholder={
                                        <LoadingModel
                                            width={160}
                                            height={225}
                                        />
                                    }
                                    wrapperClassName={'fix-style flex items-top'}
                                />
                            ) : (
                                <LazyLoadImage
                                    src={'/user.svg'}
                                    alt={props.name}
                                    className='w-[160px] h-[160px md:w-[235px] object-contain md:h-[235px] '
                                    effect='blur'
                                    placeholder={
                                        <LoadingModel
                                            width={160}
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
                </div>
            </div>
            <div className='pt-1 md:pt-3 px-2'>
                <div>
                    <div>
                        <Link
                            to={`/people/${props.id}`}
                            onClick={() => window.scrollTo(0, 0)}
                        >
                            <h2 className='font-bold hover:text-lightBlue cursor-pointer transition-colors duration-300'>
                                {props.name}
                            </h2>
                        </Link>
                    </div>
                </div>
                <div className='pb-2 text-sm'>
                    <p className='text-black/60 text-ellipsis overflow-hidden line-clamp-1 '>
                        {known_for}
                    </p>
                </div>
            </div>
        </div>
    );
};

export default PersonCard;
