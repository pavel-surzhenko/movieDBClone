import { LazyLoadImage } from 'react-lazy-load-image-component';
import { baseUrlImg } from '../lib/links';
import { cast, crew } from '../types/movieCreditsProps';
import LoadingModel from './LoadingModel';

export const PersonCard: React.FC<cast | crew> = (props) => {
    const person_role = 'character' in props ? props.character : props.job;

    return (
        <div
            key={props.id}
            className='min-w-[150px] min-h-[225px] animate-fade animate-duration-500 animate-ease-linear mr-5'
        >
            <div className='drop-shadow-custom relative'>
                <div className='overflow-hidden rounded-lg cursor-pointer '>
                    <div>
                        {props.profile_path ? (
                            <LazyLoadImage
                                src={`${baseUrlImg}/w200${props.profile_path}`}
                                alt={props.name}
                                className='w-full h-auto object-contain '
                                effect='blur'
                                placeholder={
                                    <LoadingModel
                                        width='150'
                                        height='225'
                                    />
                                }
                            />
                        ) : (
                            <img
                                src='/user.svg'
                                alt={props.name}
                                className='w-full h-[225px] object-contain '
                            />
                        )}
                    </div>
                </div>
            </div>
            <div className='pt-6 px-2'>
                <div>
                    <div>
                        <h2 className='movies-title hover:text-lightBlue cursor-pointer transition-colors duration-300'>
                            {props.name}
                        </h2>
                    </div>
                </div>
                <div>
                    <p className='text-black/60'>{person_role}</p>
                </div>
            </div>
        </div>
    );
};

export default PersonCard;
