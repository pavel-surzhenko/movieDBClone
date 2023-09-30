// §react
import { Suspense, useContext, useEffect, useState } from 'react';
import { Helmet } from 'react-helmet';
import { useParams } from 'react-router-dom';
import ReactPaginate from 'react-paginate';

// Hooks
import { useQuery } from '../hooks';

// Other
import { api } from '../api/api';
import { Context } from '../lib';

// Types
import { movieProps } from '../types/Movie';
import { tvProps } from '../types/TV';

// Components
import SearchBar from '../components/Search/SearchBar';
import Container from '../components/Container';
import Spinner from '../components/Spinner';
import LoadingModel from '../components/LoadingModel';
import MovieCollectionCard from '../components/MovieCollectionCard';

// Assets
import { RightArrowLong, LeftArrowLong } from '../assets';
import { peopleProps } from '../types/People/peopleProps';
import PeopleList from '../components/Search/PeopleList';

export const SearchPage = () => {
    const query = useQuery().get('query');
    const { language } = useContext(Context);
    const [page, setPage] = useState<number>(1);
    const [pageCount, setPageCount] = useState<number>(0);
    const [data, setData] = useState<movieProps[] | tvProps[] | peopleProps[]>([]);
    const [loading, setLoading] = useState(true);
    const { type } = useParams();

    useEffect(() => {
        setLoading(true);
        api.getSearch(type, query, language, page).then((data) => {
            setData(data.results);
            setPageCount(data.total_pages);
            setLoading(false);
        });
    }, [query, language, page, type]);

    return (
        <>
            <Helmet>
                <title>{query} - The Movie Data Base (TMDB)</title>
            </Helmet>
            <Container>
                <div className='flex m-5 relative'>
                    <SearchBar query={query} />
                    {!loading ? (
                        <>
                            {data.length !== 0 ? (
                                <div>
                                    {data.map((item) => (
                                        <Suspense
                                            fallback={
                                                <LoadingModel
                                                    width={150}
                                                    height={150}
                                                />
                                            }
                                            key={item.id}
                                        >
                                            {type === 'movie' && (
                                                <MovieCollectionCard
                                                    {...(item as movieProps)}
                                                    key={item.id}
                                                />
                                            )}
                                            {type === 'tv' && (
                                                <MovieCollectionCard
                                                    {...(item as tvProps)}
                                                    key={item.id}
                                                />
                                            )}
                                            {type === 'person' && (
                                                <PeopleList {...(item as peopleProps)} />
                                            )}
                                        </Suspense>
                                    ))}
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
                            ) : (
                                <div>
                                    {language === 'uk-UA'
                                        ? 'Не знайдено елементів, що відповідають вашому запиту.'
                                        : 'No items were found that match your query.'}
                                </div>
                            )}
                        </>
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
