// React & Libraries
import { Helmet } from 'react-helmet';
import { Suspense, useContext, useEffect, useState } from 'react';
import ReactPaginate from 'react-paginate';
import { useLocation } from 'react-router-dom';

// Components
import Container from '../components/Container';
import Spinner from '../components/Spinner';
import LoadingModel from '../components/LoadingModel';
import MovieCard from '../components/MovieCard';
import MovieCollectionCard from '../components/MovieCollectionCard';
import Lists from '../components/MoviePage/Lists';

// Types
import { movieProps } from '../types/Movie';
import { tvProps } from '../types/TV';
import { typeOfLists } from '../types/listsProps';

// Assets
import { LeftArrowLong, RightArrowLong } from '../assets';

// Other
import { api } from '../api/api';
import { Context } from '../lib';

export const MoviePage = () => {
    const [movies, setMovies] = useState<movieProps[] | tvProps[]>();
    const [page, setPage] = useState<number>(1);
    const { language } = useContext(Context);
    const [loading, setLoading] = useState(true);
    const { pathname } = useLocation();
    const movieType = pathname.split('/')[1] as 'movie' | 'tv';
    const [listsType, setListsType] = useState<typeOfLists>('popular');

    const handleChange = (newOption: 'popular' | 'now_playing' | 'top_rated' | 'upcoming') => {
        setListsType(newOption);
        setPage(1);
    };

    useEffect(() => {
        setLoading(true);
        api.getLists(movieType, listsType, language, page).then((data) => {
            setMovies(data);
            setLoading(false);
        });
    }, [page, language, listsType, movieType]);

    return (
        <>
            <Helmet>
                <title>{movieType === 'movie' ? 'Movie' : 'TV'} -The Movie Data Base (TMDB)</title>
            </Helmet>
            <Container>
                <div className='flex my-10 mx-3 flex-col md:flex-row'>
                    <aside className='flex-none w-[260px] min-w-[260px] mr-5'>
                        <Lists
                            selectedOption={listsType}
                            onOptionChange={handleChange}
                            movieType={movieType}
                        />
                    </aside>
                    {movies && !loading ? (
                        <div>
                            <div className='flex flex-col items-center f'>
                                <div className='grid md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 md:gap-y-4 mb-5'>
                                    {movies?.map((movie) => (
                                        <Suspense
                                            fallback={
                                                <LoadingModel
                                                    width={150}
                                                    height={150}
                                                />
                                            }
                                            key={movie.id}
                                        >
                                            {window.innerWidth >= 767 ? (
                                                <MovieCard
                                                    {...movie}
                                                    key={movie.id}
                                                />
                                            ) : (
                                                <MovieCollectionCard
                                                    {...movie}
                                                    key={movie.id}
                                                />
                                            )}
                                        </Suspense>
                                    ))}
                                </div>
                                <ReactPaginate
                                    breakLabel={`... `}
                                    nextLabel={<RightArrowLong />}
                                    onPageChange={(e) => {
                                        setPage(e.selected + 1);
                                    }}
                                    forcePage={page - 1}
                                    pageRangeDisplayed={2}
                                    marginPagesDisplayed={3}
                                    pageCount={500}
                                    previousLabel={<LeftArrowLong />}
                                    renderOnZeroPageCount={null}
                                    containerClassName='flex text-xl items-center'
                                    pageClassName='mr-3'
                                    breakClassName='mr-3'
                                    activeLinkClassName='text-white font-semibold bg-darkBlue px-2 rounded-lg'
                                    disabledLinkClassName='hidden'
                                    previousClassName='mr-3'
                                />
                            </div>
                        </div>
                    ) : (
                        <div className='absolute top-1/2 right-1/2 translate-x-1/2'>
                            <Spinner />
                        </div>
                    )}
                </div>
            </Container>
        </>
    );
};

export default MoviePage;
