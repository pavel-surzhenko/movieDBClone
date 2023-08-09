import { useContext } from 'react';
import { Context } from '../lib/context';
import { useFetchVideos } from '../hooks/useFetchTrailers';

// import TabsContainer from './TabsContainer';

export const PopularTrailers = () => {
    const { language, movies } = useContext(Context);
    const trailerLinks = useFetchVideos(movies);
    console.log(trailerLinks);

    return (
        <section
            className={`pt-[30px] pl-5 relative bg-trending-bg bg-no-repeat bg-[50%_200px]`}
        >
            <div className='flex'>
                <h3 className='title-black'>
                    {language === 'en-US'
                        ? 'Popular trailers'
                        : 'Популярні трейлери'}
                </h3>
            </div>
            {/* <TabsContainer movies={trendingMovies} /> */}
        </section>
    );
};

export default PopularTrailers;
