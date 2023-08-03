import { useEffect, useState } from 'react';
import { api } from '../api/api';

export const Welcome = () => {
    const [dataMovie, setDataMovie] = useState();

    useEffect(() => {
        api.movies
            .getTrending()
            .then((data) => setDataMovie(data))
            .catch((error) => console.log(error));
    }, []);
    console.log(dataMovie);

    return (
        <section className=''>
            <div className='flex flex-col'>
                <div>
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
                            className='w-full'
                            type='text'
                            placeholder='Search for a movie, tv show, person....'
                        />
                        <button type='submit'>Search</button>
                    </form>
                </div>
            </div>
        </section>
    );
};

export default Welcome;
