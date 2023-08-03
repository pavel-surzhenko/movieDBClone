import { useEffect, useState } from 'react';
import { api } from '../api/api';
import { MovieProps } from '../types/MovieProps';
import { baseUrlImg } from '../lib/const';

export const Welcome = () => {
    const [dataMovie, setDataMovie] = useState<MovieProps[]>([]);
    const [image, setImage] = useState<string>('');

    const getRandomImg = () => {
        const randomIndex = Math.floor(Math.random() * dataMovie.length);
        setImage(dataMovie[randomIndex].backdrop_path);
    };

    useEffect(() => {
        api.movies
            .getTrending()
            .then((data) => {
                setDataMovie(data);
            })
            .catch((error) => console.log(error));
    }, []);

    useEffect(() => {
        if (dataMovie.length > 0) {
            getRandomImg();
        }
    }, [dataMovie]);

    return (
        <section
            className='min-h-[300px] max-h-[350px] flex flex-col justify-center'
            style={{
                background: ` center / cover no-repeat linear-gradient(to right, rgba(3, 37, 65, 0.8) 0%, rgba(3, 37, 65, 0.5) 100%), url(${baseUrlImg}w1280${image}) center / cover no-repeat`,
            }}
        >
            <div className='flex flex-col px-5 justify-center h-full'>
                <div className='flex-grow  mb-5'>
                    <h2 className='text-5xl font-bold '>Welcome</h2>
                    <h3 className='text-[32px] font-semibold'>
                        Millions of movies, TV shows and people to discover.
                        Explore now.
                    </h3>
                </div>
                <div>
                    <form
                        action=''
                        className='flex'
                    >
                        <input
                            className='w-full rounded-[30px] px-[20px] py-[10px] text-lg text-black/50 outline-none'
                            type='text'
                            placeholder='Search for a movie, tv show, person....'
                        />
                        <button
                            className='px-[26px] py-[10px] bg-gradient-to-r from-lightGreen to-lightBlue rounded-[30px] -translate-x-1/2'
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
