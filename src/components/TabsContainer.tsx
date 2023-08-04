import { TabContainerProps } from '../types/TabProps';
import MovieCard from './MovieCard';

const TabsContainer: React.FC<TabContainerProps> = ({ trendingMovies }) => {
    return (
        <>
            <div className='relative flex flex-col min-w-0 break-words w-full py-5 white-shadow'>
                <div className='flex flex-nowrap overflow-x-auto gap-5 snap-x'>
                    {trendingMovies?.map((movie) => (
                        <MovieCard
                            key={movie.id}
                            {...movie}
                        ></MovieCard>
                    ))}
                </div>
            </div>
        </>
    );
};
export default TabsContainer;
