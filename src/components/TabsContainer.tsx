import { movieProps } from '../types/movieProps1';
import { tvProps } from '../types/tvProps1';
import { tabContainerProps } from '../types/tabProps1';
import MovieCard from './MovieCard';

const TabsContainer: React.FC<tabContainerProps> = ({ movies }) => {
    return (
        <>
            <div className='relative flex flex-col min-w-0 break-words w-full py-5 white-shadow'>
                <div className='flex flex-nowrap overflow-x-auto gap-5 snap-x'>
                    {movies?.map((movie: movieProps | tvProps) => (
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
