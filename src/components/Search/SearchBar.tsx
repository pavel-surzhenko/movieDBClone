// React
import { NavLink } from 'react-router-dom';

// Types
import { searchBarProps } from '../../types/Search';

const SearchBar: React.FC<searchBarProps> = ({ query }) => {
    return (
        <aside className='min-w-[250px] mr-5 '>
            <div className='rounded-xl overflow-hidden border border-lightGray'>
                <h3 className='text-xl bg-lightBlue text-white p-5'>Search Results</h3>
                <ul className=' text-lg py-2'>
                    <li className=''>
                        <NavLink
                            className='px-5 py-2 block'
                            to={`/search/movie?query=${query}`}
                        >
                            Movies
                        </NavLink>
                    </li>
                    <li className=''>
                        <NavLink
                            className='px-5 py-2 block'
                            to={`/search/tv?query=${query}`}
                        >
                            TV Shows
                        </NavLink>
                    </li>
                    <li className=''>
                        <NavLink
                            className='px-5 py-2 block'
                            to={`/search/person?query=${query}`}
                        >
                            People
                        </NavLink>
                    </li>
                    <li className=''>
                        <NavLink
                            className='px-5 py-2 block'
                            to={`/search/collection?query=${query}`}
                        >
                            Collections
                        </NavLink>
                    </li>
                    <li className=''>
                        <NavLink
                            className='px-5 py-2 block'
                            to={`/search/company?query=${query}`}
                        >
                            Companies
                        </NavLink>
                    </li>
                    <li className=''>
                        <NavLink
                            className='px-5 py-2 block'
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
