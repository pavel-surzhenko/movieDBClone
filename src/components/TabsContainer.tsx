import { TabContainerProps } from '../types/TabProps';

const TabsContainer: React.FC<TabContainerProps> = ({ trendingMovies }) => {
    return (
        <>
            <div className='relative flex flex-col min-w-0 break-words w-full py-5'>
                <div className=''>
                    {trendingMovies?.map((movie) => (
                        <p key={movie.id}>{movie.title}</p>
                    ))}
                </div>
            </div>
        </>
    );
};
export default TabsContainer;
