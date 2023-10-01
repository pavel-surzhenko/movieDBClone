// §react
import { useContext, useEffect, useState } from 'react';
import { Helmet } from 'react-helmet';
import { useParams } from 'react-router-dom';

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

// Assets
import { peopleProps } from '../types/People/peopleProps';
import { companyProps } from '../types/Search';
import { keywords } from '../types';

import Results from '../components/Search/Results';

export const SearchPage = () => {
    const query = useQuery().get('query');
    const { language } = useContext(Context);
    const [page, setPage] = useState<number>(1);
    const [pageCount, setPageCount] = useState<number>(0);
    const [data, setData] = useState<
        movieProps[] | tvProps[] | peopleProps[] | companyProps[] | keywords[]
    >([]);
    const [loading, setLoading] = useState(true);
    const { type } = useParams();
    const [currentPageType, setCurrentPageType] = useState<string | undefined>(type);

    const handlePageChange = (newPage: number) => {
        setPage(newPage);
    };
    useEffect(() => {
        setLoading(true);
        api.getSearch(currentPageType, type, query, language, page).then((data) => {
            if (currentPageType !== type) {
                setCurrentPageType(type);
            }
            setData(data.results);
            setPageCount(data.total_pages);
            setPage(data.page);
            setLoading(false);
        });
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [query, language, page, type]);

    return (
        <>
            <Helmet>
                <title>{query} - The Movie Data Base (TMDB)</title>
            </Helmet>
            <Container>
                <div className='flex flex-col md:flex-row m-5 md:relative'>
                    <SearchBar query={query} />
                    {!loading ? (
                        <Results
                            data={data}
                            type={type}
                            pageCount={pageCount}
                            handlePageChange={handlePageChange}
                            page={page}
                        />
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
