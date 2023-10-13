// React
import { Suspense, useContext, useEffect } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import ReactPaginate from 'react-paginate';

// Components
import Container from '../Container';
import LoadingModel from '../LoadingModel';
import MovieCollectionCard from '../MovieCollectionCard';

// Types
import { listsProps } from '../../types/Login/listsProps';

// Other
import { RightArrowLong, LeftArrowLong } from '../../assets';
import { Context } from '../../lib';

const ProfileMain: React.FC<{
    lists: listsProps;
    page: number;
    pageChange: (newPage: number) => void;
}> = ({ lists, page, pageChange }) => {
    const { language } = useContext(Context);
    const [params] = useSearchParams();
    const selectedList = (params.get('list') as 'favorite' | 'watchlist') || 'favorite';
    const selectedType = (params.get('type') as 'movies' | 'tv') || 'movies';

    useEffect(() => {
        pageChange(1);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [selectedList, selectedType]);

    return (
        <Container>
            <div className='mx-5 flex flex-col mb-5'>
                <div className=' my-3 border-b border-lightGray'>
                    <div className='flex justify-center space-x-5 text-lg md:text-2xl font-medium mb-3'>
                        <Link
                            to={`?list=favorite&type=${selectedType}`}
                            className={` cursor-pointer ${
                                selectedList === 'favorite'
                                    ? 'border-b-2 md:border-b-4 border-darkBlue'
                                    : ''
                            }`}
                        >
                            {language === 'en-US' ? 'My favorites' : 'Улюблене'}
                        </Link>
                        <Link
                            to={`?list=watchlist&type=${selectedType}`}
                            className={` cursor-pointer ${
                                selectedList === 'watchlist'
                                    ? 'border-b-2 md:border-b-4 border-darkBlue'
                                    : ''
                            }`}
                        >
                            {language === 'en-US' ? 'My saved' : 'Збережене'}
                        </Link>
                    </div>
                    <div className='md:text-lg font-light space-x-5 pb-2'>
                        <Link
                            to={`?list=${selectedList}&type=movies`}
                            className={` cursor-pointer ${
                                selectedType === 'movies'
                                    ? 'border-b-2 md:border-b-4 border-darkBlue'
                                    : ''
                            }`}
                        >
                            {language === 'en-US' ? 'Movies ' : 'Фільми '}
                            <span className='text-base text-lightBlue'>
                                {lists[`${selectedList}/movies`].total_results}
                            </span>
                        </Link>
                        <Link
                            to={`?list=${selectedList}&type=tv`}
                            className={` cursor-pointer ${
                                selectedType === 'tv' ? 'border-b-4 border-darkBlue' : ''
                            }`}
                        >
                            {language === 'en-US' ? 'TV ' : 'Серіали '}
                            <span className='text-base text-lightBlue'>
                                {lists[`${selectedList}/tv`].total_results}
                            </span>
                        </Link>
                    </div>
                </div>
                <div className='mb-5'>
                    {lists[`${selectedList}/${selectedType}`]?.results.map((movie) => (
                        <Suspense
                            fallback={
                                <LoadingModel
                                    width={150}
                                    height={150}
                                />
                            }
                            key={movie.id}
                        >
                            <MovieCollectionCard
                                movie={movie}
                                key={movie.id}
                            />
                        </Suspense>
                    ))}
                </div>
                <div className='self-center'>
                    {lists[`${selectedList}/${selectedType}`].total_pages > 1 && (
                        <ReactPaginate
                            breakLabel={`... `}
                            nextLabel={<RightArrowLong />}
                            onPageChange={(e) => {
                                pageChange(e.selected + 1);
                                window.scrollTo(0, 0);
                            }}
                            forcePage={page - 1}
                            pageRangeDisplayed={2}
                            marginPagesDisplayed={3}
                            pageCount={lists[`${selectedList}/${selectedType}`].total_pages}
                            previousLabel={<LeftArrowLong />}
                            renderOnZeroPageCount={null}
                            containerClassName='flex text-xl items-center'
                            pageClassName='mr-3'
                            breakClassName='mr-3'
                            activeLinkClassName='text-white font-semibold bg-darkBlue px-2 rounded-lg'
                            disabledLinkClassName='hidden'
                            previousClassName='mr-3'
                        />
                    )}
                </div>
            </div>
        </Container>
    );
};

export default ProfileMain;
