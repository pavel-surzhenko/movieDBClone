import { Link } from 'react-router-dom';
import { baseUrlImg } from '../lib/links';
import { collection } from '../types/movieDetailProps';

const MovieDetailsPageCollections: React.FC<collection> = (props) => {
    return (
        <section>
            <div
                className='mt-4 lg:my-[20px] lg:ml-10 min-h-[240px] rounded-md relative'
                style={{
                    background: props
                        ? `center / cover no-repeat linear-gradient(to right, rgba(3, 37, 65, 0.8) 0%, rgba(3, 37, 65, 0.5) 100%), url(${baseUrlImg}/w1280${props.backdrop_path}) center / cover  no-repeat `
                        : `center / cover no-repeat linear-gradient(to right, rgba(3, 37, 65, 0.8) 0%, rgba(3, 37, 65, 0.5) 100%)`,
                }}
            >
                <div
                    className='h-full'
                    style={{
                        background: `center / cover no-repeat linear-gradient(to right, rgba(3, 37, 65, 0.8) 0%, rgba(3, 37, 65, 0.5) 100%)`,
                    }}
                >
                    <div className='text-white absolute top-1/2 left-5 -translate-y-1/2'>
                        <h2 className='text-3xl font-semibold pr-4'>Part of the {props?.name}</h2>
                        <Link
                            className='text-lg underline underline-offset-2'
                            to={`${props.id}-collection`}
                        >
                            VIEW THE COLLECTION
                        </Link>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default MovieDetailsPageCollections;
