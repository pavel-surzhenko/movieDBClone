// React & Libraries
import { useContext } from 'react';
import { Link } from 'react-router-dom';

// Other
import { baseUrlImg, Context } from '../lib';

// Types
import { tvSeasonsProps } from '../types/TV';

const MovieDetailsPageSeasons: React.FC<{ seasons: tvSeasonsProps[] }> = ({ seasons }) => {
    const { language } = useContext(Context);
    return (
        <section>
            <div
                className='mt-4 lg:my-[20px] lg:ml-10 min-h-[240px] rounded-md relative'
                style={{
                    background: seasons
                        ? `center / cover no-repeat linear-gradient(to right, rgba(3, 37, 65, 0.8) 0%, rgba(3, 37, 65, 0.5) 100%), url(${baseUrlImg}/w1280${seasons[0].poster_path}) center / cover  no-repeat `
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
                            {language === 'uk-UA'
                                ? `Кількість сезонів ${seasons.length}`
                                : `Number of seasons ${seasons.length}`}
                        </h2>
                        <Link
                            className='text-lg underline underline-offset-2'
                            to={`seasons`}
                            onClick={() => window.scrollTo(0, 0)}
                        >
                            {language === 'uk-UA' ? `Подивитись всі сезони` : `VIEW ALL SEASONS`}
                        </Link>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default MovieDetailsPageSeasons;
