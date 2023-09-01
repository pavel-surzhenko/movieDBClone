// React & Libraries
import { Link } from 'react-router-dom';
import { useContext } from 'react';

// Types
import { movieCollection } from '../../types/Movie';

// Other
import { baseUrlImg, Context } from '../../lib';

const MovieDetailsPageCollections: React.FC<movieCollection> = (props) => {
    const { language } = useContext(Context);

    return (
        <section>
            <div
                className='mt-4 lg:my-[20px] lg:ml-10 min-h-[240px] rounded-md relative'
                style={{
                    background: props.backdrop_path
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
                        <h2 className='text-3xl font-semibold pr-4'>
                            {language === 'uk-UA' ? `${props?.name}` : `Part of the ${props?.name}`}
                        </h2>
                        <Link
                            className='text-lg underline underline-offset-2'
                            to={`${props.id}-collection`}
                        >
                            {language === 'uk-UA'
                                ? `Дивитись повний список`
                                : `VIEW THE COLLECTION`}
                        </Link>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default MovieDetailsPageCollections;
