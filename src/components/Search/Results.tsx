// React
import { Suspense, useContext } from 'react';
import ReactPaginate from 'react-paginate';
// Assets
import { RightArrowLong, LeftArrowLong } from '../../assets';

// Types
import { keywords } from '../../types';
import { movieProps } from '../../types/Movie';
import { peopleProps } from '../../types/People/peopleProps';
import { companyProps } from '../../types/Search';
import { resultsProps } from '../../types/Search/resultsProps';
import { tvProps } from '../../types/TV';

// Components
import LoadingModel from '../LoadingModel';
import MovieCollectionCard from '../MovieCollectionCard';
import KeywordsList from './ KeywordsList';
import CompanyList from './CompanyList';
import PeopleList from './PeopleList';

// Other
import { Context } from '../../lib';

const Results: React.FC<resultsProps> = ({ data, type, pageCount, page, handlePageChange }) => {
    const { language } = useContext(Context);

    return (
        <>
            {data.length !== 0 ? (
                <div className='w-full'>
                    <div className='flex flex-col items-center'>
                        <div className='flex flex-col w-full mb-5'>
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
                                    {type === 'person' && <PeopleList {...(item as peopleProps)} />}
                                    {type === 'collection' && (
                                        <MovieCollectionCard
                                            {...(item as movieProps | tvProps)}
                                            key={item.id}
                                        />
                                    )}
                                    {type === 'company' && (
                                        <CompanyList
                                            {...(item as companyProps)}
                                            key={item.id}
                                        />
                                    )}
                                    {type === 'keyword' && <KeywordsList {...(item as keywords)} />}
                                </Suspense>
                            ))}
                        </div>
                        {pageCount > 1 && (
                            <ReactPaginate
                                breakLabel={`... `}
                                nextLabel={<RightArrowLong />}
                                onPageChange={(e) => {
                                    handlePageChange(e.selected + 1);
                                    window.scrollTo(0, 0);
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
                        )}
                    </div>
                </div>
            ) : (
                <div>
                    {language === 'uk-UA'
                        ? 'Не знайдено елементів, що відповідають вашому запиту.'
                        : 'No items were found that match your query.'}
                </div>
            )}
        </>
    );
};

export default Results;
