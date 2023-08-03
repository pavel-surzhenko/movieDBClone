import { useEffect, useState } from 'react';
import { api } from '../api/api';
import { MovieProps } from '../types/MovieProps';
import { baseUrlImg } from '../lib/links';

export const Welcome = () => {
    const [dataMovie, setDataMovie] = useState<MovieProps[]>([]);
    const [image, setImage] = useState<string>('');

    const getRandomImg = () => {
        const randomIndex: number = Math.floor(
            Math.random() * dataMovie.length
        );
        setImage(dataMovie[randomIndex].backdrop_path);
    };

    useEffect(() => {
        api.movies
            .getTrendingAll()
            .then((data) => {
                setDataMovie(data);
            })
            .catch((error) => console.log(error));
    }, []);

    useEffect(() => {
        if (dataMovie.length > 0) {
            getRandomImg();
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [dataMovie]);

    return (
        <section
            className='min-h-[300px] lg:min-h-[400px] flex flex-col justify-center h-full'
            style={{
                background: image
                    ? `center / cover no-repeat linear-gradient(to right, rgba(3, 37, 65, 0.8) 0%, rgba(3, 37, 65, 0.5) 100%), url(${baseUrlImg}w1280${image}) center / cover  no-repeat `
                    : `center / cover no-repeat linear-gradient(to right, rgba(3, 37, 65, 0.8) 0%, rgba(3, 37, 65, 0.5) 100%)`,
            }}
        >
            <div className='flex flex-col px-5 justify-center h-full'>
                <div className='flex-grow  mb-5 text-white'>
                    <h2 className='text-2xl lg:text-5xl font-bold pb-4 md:pb-0'>
                        Welcome
                    </h2>
                    <h3 className='text-lg lg:text-[32px] font-semibold'>
                        Millions of movies, TV shows and people to discover.
                        Explore now.
                    </h3>
                </div>
                <div>
                    <form
                        action=''
                        className='flex relative z-0'
                    >
                        <input
                            className='w-full rounded-[30px] px-[20px] py-[10px] text-lg text-black/50 outline-none'
                            type='text'
                            placeholder={`${
                                window?.innerWidth >= 1024
                                    ? 'Search for a movie, tv show, person....'
                                    : 'Search'
                            }`}
                        />
                        <button
                            className='px-[26px] py-[12px] bg-gradient-to-r from-lightGreen to-lightBlue rounded-[30px] absolute right-0'
                            type='submit'
                        >
                            Search
                        </button>
                    </form>
                </div>
            </div>
        </section>
    );
};

export default Welcome;
