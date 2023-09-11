// React & Libraries
import { Helmet } from 'react-helmet';
import { Suspense, useContext, useEffect, useState } from 'react';
import ReactPaginate from 'react-paginate';

// Components
import Container from '../components/Container';
import Spinner from '../components/Spinner';
import LoadingModel from '../components/LoadingModel';

// Other
import { api } from '../api/api';
import { Context } from '../lib';

// Types
import { peopleProps } from '../types/People/peopleProps';

// Assets
import { LeftArrowLong, RightArrowLong } from '../assets';
import PeopleCard from '../components/PeoplePage/PeopleCard';

export const PeoplePage = () => {
    const [people, setPeople] = useState<peopleProps[]>([]);
    const [page, setPage] = useState<number>(1);
    const [pageCount, setPageCount] = useState<number>(0);
    const [loading, setLoading] = useState(true);
    const { language } = useContext(Context);

    useEffect(() => {
        setLoading(true);
        api.people.getPopular(language, page).then((data) => {
            setPeople(data.results);
            setPageCount(data.total_pages);
            setLoading(false);
        });
    }, [language, page]);
    return (
        <>
            <Helmet>
                <title>People - The Movie Data Base (TMDB)</title>
            </Helmet>
            <Container>
                <div className='my-5 lg:my-10 mx-3'>
                    {people && !loading ? (
                        <div className='flex flex-col items-center f'>
                            <div className='grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-x-4 gap-y-2 md:gap-y-4'>
                                {people.map((person) => (
                                    <Suspense
                                        fallback={
                                            <LoadingModel
                                                width={150}
                                                height={150}
                                            />
                                        }
                                        key={person.id}
                                    >
                                        <PeopleCard {...person} />
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
