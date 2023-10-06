// React
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

// Assets
import { SearchIcon } from '../../assets/SearchIcon';

// Types
import { formProps } from '../../types/Search';

const Form: React.FC<formProps> = ({ search }) => {
    const [value, setValue] = useState(search || '');
    const navigate = useNavigate();

    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        if (value.length) {
            navigate(`/search/movie?query=${value}`);
        }
    };

    return (
        <form
            className='border-b'
            onSubmit={handleSubmit}
        >
            <div className='relative'>
                <div className='absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none'>
                    <SearchIcon />
                </div>
                <input
                    type='search'
                    id='default-search'
                    className='block w-full p-2 md:p-4 pl-10 md:pl-10 text-lg text-lightBlack outline-none'
                    placeholder='Search...'
                    value={value}
                    onChange={(e) => setValue(e.target.value)}
                    required
                />
                <button
                    type='submit'
                    className='absolute right-2 md:right-5 bottom-1 md:bottom-2.5 bg-lightBlue md:font-medium rounded-lg px-2 py-1 md:px-4 md:py-2 text-lg text-white disabled:opacity-60'
                    disabled={!value.length}
                >
                    Search
                </button>
            </div>
        </form>
    );
};

export default Form;
