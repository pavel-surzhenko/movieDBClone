// React & Libraries
import { useContext, useEffect, useState } from 'react';

// Other
import { baseUrlImg, Context } from '../../lib';
import { useNavigate } from 'react-router-dom';

const Welcome = () => {
    const [image, setImage] = useState<string | null>(null);
    const [search, setSearch] = useState<string>('');

    const { language, movies } = useContext(Context);
    const navigate = useNavigate();

    const getRandomImg = () => {
        const randomIndex: number = Math.floor(Math.random() * movies.length);
        setImage(movies[randomIndex].backdrop_path);
    };

    const handlerSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        if (search.length) {
            const query = search.split(' ').join('+');
            navigate(`/search/movie?query=${query}`);
        }
    };

    useEffect(() => {
        if (movies.length > 0) {
            getRandomImg();
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [movies]);

    return (
        <section
            className='min-h-[300px] lg:min-h-[450px] flex flex-col justify-center h-full bg-blend-multiply'
            style={{
                background: image
                    ? `center / cover no-repeat linear-gradient(to right, rgba(3, 37, 65, 0.8) 0%, rgba(3, 37, 65, 0.5) 100%), url(${baseUrlImg}/w1280${image}) center / cover  no-repeat `
                    : `center / cover no-repeat linear-gradient(to right, rgba(3, 37, 65, 0.8) 0%, rgba(3, 37, 65, 0.5) 100%)`,
            }}
        >
            <div className='flex flex-col px-5 justify-center h-full'>
                <div className='flex-grow  mb-5 text-white animate-fade-right animate-once animate-duration-500'>
                    <h2 className='text-2xl lg:text-5xl font-bold pb-4 md:pb-0'>
                        {language === 'en-US' ? 'Welcome.' : 'Ласкаво просимо.'}
                    </h2>
                    <h3 className='text-lg lg:text-[32px] font-semibold'>
                        {language === 'en-US'
                            ? 'Millions of movies, TV shows and people to discover. Explore now.'
                            : 'Мільйони фільмів, серіалів і персон. Досліджуйте зараз.'}
                    </h3>
                </div>
                <div>
                    <form
                        action=''
                        className='flex relative z-0 items-center'
                        onSubmit={handlerSubmit}
                    >
                        <input
                            className='w-full rounded-[30px] px-[20px] py-[10px] text-lg text-black/50 outline-none'
                            type='text'
                            placeholder={`${
                                window?.innerWidth >= 1024
                                    ? language === 'en-US'
                                        ? 'Search for a movie, tv show, person....'
                                        : 'Пошук фільму, серіалу, персони....'
                                    : language === 'en-US'
                                    ? 'Search'
                                    : 'Пошук'
                            }`}
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                        />
                        <button
                            className='px-[26px] py-[12px] bg-gradient-to-r from-lightGreen to-lightBlue rounded-[30px] absolute right-0 disabled:cursor-not-allowed disabled:opacity-60'
                            type='submit'
                            disabled={!search.length}
                        >
                            {language === 'en-US' ? 'Search' : 'Пошук'}
                        </button>
                    </form>
                </div>
            </div>
        </section>
    );
};

export default Welcome;
