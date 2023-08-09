import { useContext, useEffect, useState } from 'react';
import { Context } from '../lib/context';
import { useFetchVideos } from '../hooks/useFetchTrailers';
import TrailerCard from './TrailerCard';
import { baseUrlImg } from '../lib/links';

// import TabsContainer from './TabsContainer';

export const PopularTrailers = () => {
    const { language, movies } = useContext(Context);
    const [backImg, setBackImg] = useState<string>('');
    const trailers = useFetchVideos(movies);

    const handleHover = (id: string) => {
        setBackImg(id);
    };

    useEffect(() => {
        if (movies.length > 0) {
            setBackImg(movies[0]?.backdrop_path);
        }
    }, [movies]);

    console.log(backImg);

    return (
        <section
            className={`pt-[30px] pl-5 relative`}
            style={{
                background: backImg
                    ? `center / cover no-repeat linear-gradient(to right, rgba(3, 37, 65, 0.8) 0%, rgba(3, 37, 65, 0.5) 100%), url(${baseUrlImg}/w1280${backImg}) center / cover  no-repeat `
                    : `center / cover no-repeat linear-gradient(to right, rgba(3, 37, 65, 0.8) 0%, rgba(3, 37, 65, 0.5) 100%)`,
            }}
        >
            <div className='flex'>
                <h3 className='title-black'>
                    {language === 'en-US'
                        ? 'Popular trailers'
                        : 'Популярні трейлери'}
                </h3>
            </div>
            <div className='relative flex flex-col min-w-0 break-words w-full pt-5 mb-5 white-shadow'>
                <div className='flex flex-nowrap overflow-x-auto gap-5 snap-x'>
                    {trailers.map((trailer) => (
                        <TrailerCard
                            key={trailer.id}
                            {...trailer}
                            movieDetails={movies.find(
                                (movie) => movie.id === trailer.id
                            )}
                            handleHover={handleHover}
                        />
                    ))}
                </div>
            </div>
        </section>
    );
};

export default PopularTrailers;
