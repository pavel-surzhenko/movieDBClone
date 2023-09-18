// React & Libraries
import { LazyLoadImage } from 'react-lazy-load-image-component';

// Component
import LoadingModel from './LoadingModel';

// Types
import { cast, crew } from '../types/Movie';

// Other
import { baseUrlImg } from '../lib';
import { Link } from 'react-router-dom';

const PersonCard: React.FC<cast | crew> = (props) => {
    const person_role = 'character' in props ? props.character : props.job;

    return (
        <div
            key={props.id}
            className='max-w-[150px] min-w-[150px] min-h-[225px] animate-fade animate-duration-500 animate-ease-linear mr-5'
        >
            <div className='relative'>
                <div className='overflow-hidden rounded-lg cursor-pointer '>
                    <Link to={`/people/${props.id}`}>
                        {props.profile_path ? (
                            <LazyLoadImage
                                src={`${baseUrlImg}/w200${props.profile_path}`}
                                alt={props.name}
                                className='w-[150px] object-cover h-[225px]'
                                effect='blur'
                                placeholder={
                                    <LoadingModel
                                        width={150}
                                        height={225}
                                    />
                                }
                                wrapperClassName={'fix-style'}
                            />
                        ) : (
                            <LazyLoadImage
                                src={'/user.svg'}
                                alt={props.name}
                                className='w-[150px] object-contain h-[225px] '
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
            </div>
            <div className='pt-3 px-2'>
                <div>
                    <div>
                        <Link to={`/people/${props.id}`}>
                            <h2 className='font-bold hover:text-lightBlue transition-colors duration-300'>
                                {props.name}
                            </h2>
                        </Link>
                    </div>
                </div>
                <div className='pb-2'>
                    <p className='text-black/60'>{person_role}</p>
                </div>
            </div>
        </div>
    );
};

export default PersonCard;
