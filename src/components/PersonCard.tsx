import { baseUrlImg } from '../lib/links';
import { cast, crew, movieCreditsProps } from '../types/movieCreditsProps';

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
                        <img
                            src={`${baseUrlImg}/w500${props.profile_path}`}
                            alt={props.name}
                            className='w-full h-auto object-contain '
                        />
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
