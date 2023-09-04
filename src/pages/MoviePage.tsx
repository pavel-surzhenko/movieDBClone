// React & Libraries
import { Helmet } from 'react-helmet';
import { Suspense, useContext, useEffect, useState } from 'react';
import ReactPaginate from 'react-paginate';

// Components
import Container from '../components/Container';
import Spinner from '../components/Spinner';
import LoadingModel from '../components/LoadingModel';
import MovieCard from '../components/MovieCard';
import MovieCollectionCard from '../components/MovieCollectionCard';
import Lists from '../components/MoviePage_TVPage/Lists';

// Types
import { genres, movieProps } from '../types/Movie';
import { tvProps } from '../types/TV';
import { typeOfLists } from '../types/listsProps';

// Assets
import { LeftArrowLong, RightArrowLong } from '../assets';

// Other
import { api } from '../api/api';
import { Context } from '../lib';
import GenresLists from '../components/MoviePage_TVPage/GenresLists';

export const MoviePage = () => {
    const [movies, setMovies] = useState<movieProps[] | tvProps[]>();
    const [page, setPage] = useState<number>(1);
    const [pageCount, setPageCount] = useState<number>(0);
    const { language } = useContext(Context);
    const [loading, setLoading] = useState(true);
    const [listsType, setListsType] = useState<typeOfLists>('popular');
    const [genres, setGenres] = useState<genres[]>([]);
    const [selectedGenre, setSelectedGenre] = useState<number>(0);

    const handleChangeList = (newOption: typeOfLists) => {
        setListsType(newOption);
        setPage(1);
    };

    const handleChangeGenre = (newGenre: number) => {
        setSelectedGenre(newGenre);
        setPage(1);
    };

    useEffect(() => {
        api.getGenres('movie', language).then((data) => setGenres(data));
    }, [language]);

    useEffect(() => {
        setLoading(true);
        api.movies.getListsMovie(listsType, language, page, selectedGenre).then((data) => {
            setMovies(data.results);
            setPageCount(data.total_pages);
            setLoading(false);
        });
    }, [page, language, listsType, selectedGenre]);

    return (
        <>
            <Helmet>
                <title>Movie -The Movie Data Base (TMDB)</title>
            </Helmet>
            <Container>
                <div className='flex my-10 mx-3 flex-col md:flex-row'>
                    <aside className='flex-none w-[260px] min-w-[260px] mr-5'>
                        <Lists
                            selectedOption={listsType}
                            onOptionChange={handleChangeList}
                            movieType={'movie'}
                        />
                        <GenresLists
                            genres={genres}
                            selectedGenre={selectedGenre}
                            onGenreChange={handleChangeGenre}
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
                                    pageCount={pageCount > 500 ? 500 : pageCount}
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
