// React
import { NavLink } from 'react-router-dom';
import { useContext } from 'react';

// Types
import { searchBarProps } from '../../types/Search';

// Other
import { Context } from '../../lib';

const SearchBar: React.FC<searchBarProps> = ({ query }) => {
    const { language } = useContext(Context);
    return (
        <aside className='w-screen md:min-w-[250px] md:max-w-[250px] md:mr-5 mb-5 -mr-5 -ml-5'>
            <div className='rounded-md md:rounded-xl overflow-hidden border border-lightGray'>
                <h3 className='text-lg md:text-xl bg-lightBlue text-white p-2 md:p-5'>
                    {language === 'en-US' ? 'Search Results' : 'Результати пошуку'}
                </h3>
                <ul className='test-sm md:text-lg md:py-2 flex md:flex-col overflow-x-auto whitespace-nowrap'>
                    <li className=''>
                        <NavLink
                            className='px-2 md:px-5 py-2 block'
                            to={`/search/movie?query=${query}`}
                        >
                            {language === 'en-US' ? 'Movies' : 'Фільми'}
                        </NavLink>
                    </li>
                    <li className=''>
                        <NavLink
                            className='px-2 md:px-5 py-2 block'
                            to={`/search/tv?query=${query}`}
                        >
                            {language === 'en-US' ? 'TV Shows' : 'Серіали'}
                        </NavLink>
                    </li>
                    <li className=''>
                        <NavLink
                            className='px-2 md:px-5 py-2 block'
                            to={`/search/person?query=${query}`}
                        >
                            {language === 'en-US' ? 'People' : 'Персони'}
                        </NavLink>
                    </li>
                    <li className=''>
                        <NavLink
                            className='px-2 md:px-5 py-2 block'
                            to={`/search/collection?query=${query}`}
                        >
                            {language === 'en-US' ? 'Collections' : 'Колекції'}
                        </NavLink>
                    </li>
                    <li className=''>
                        <NavLink
                            className='px-2 md:px-5 py-2 block'
                            to={`/search/company?query=${query}`}
                        >
                            {language === 'en-US' ? 'Companies' : 'Компанії'}
                        </NavLink>
                    </li>
                    <li className=''>
                        <NavLink
                            className='px-2 md:px-5 py-2 block'
                            to={`/search/keyword?query=${query}`}
                        >
                            {language === 'en-US' ? 'Keywords' : 'Ключові слова'}
                        </NavLink>
                    </li>
                </ul>
            </div>
        </aside>
    );
};

export default SearchBar;
