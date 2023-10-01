// React
import { NavLink } from 'react-router-dom';

// Types
import { searchBarProps } from '../../types/Search';

const SearchBar: React.FC<searchBarProps> = ({ query }) => {
    return (
        <aside className='w-screen md:min-w-[250px] md:max-w-[250px] md:mr-5 mb-5 -mr-5 -ml-5'>
            <div className='rounded-md md:rounded-xl overflow-hidden border border-lightGray'>
                <h3 className='text-lg md:text-xl bg-lightBlue text-white p-2 md:p-5'>
                    Search Results
                </h3>
                <ul className='test-sm md:text-lg md:py-2 flex md:flex-col overflow-x-auto whitespace-nowrap'>
                    <li className=''>
                        <NavLink
                            className='px-2 md:px-5 py-2 block'
                            to={`/search/movie?query=${query}`}
                        >
                            Movies
                        </NavLink>
                    </li>
                    <li className=''>
                        <NavLink
                            className='px-2 md:px-5 py-2 block'
                            to={`/search/tv?query=${query}`}
                        >
                            TV Shows
                        </NavLink>
                    </li>
                    <li className=''>
                        <NavLink
                            className='px-2 md:px-5 py-2 block'
                            to={`/search/person?query=${query}`}
                        >
                            People
                        </NavLink>
                    </li>
                    <li className=''>
                        <NavLink
                            className='px-2 md:px-5 py-2 block'
                            to={`/search/collection?query=${query}`}
                        >
                            Collections
                        </NavLink>
                    </li>
                    <li className=''>
                        <NavLink
                            className='px-2 md:px-5 py-2 block'
                            to={`/search/company?query=${query}`}
                        >
                            Companies
                        </NavLink>
                    </li>
                    <li className=''>
                        <NavLink
                            className='px-2 md:px-5 py-2 block'
                            to={`/search/keyword?query=${query}`}
                        >
                            Keywords
                        </NavLink>
                    </li>
                </ul>
            </div>
        </aside>
    );
};

export default SearchBar;
