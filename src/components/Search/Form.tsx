// React
import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';

// Assets
import { SearchIcon } from '../../assets/SearchIcon';

// Hooks
import { useQuery } from '../../hooks';

const Form = ({ isOpen }: { isOpen: boolean }) => {
    const query = useQuery().get('query');
    const [value, setValue] = useState(query || '');
    const navigate = useNavigate();
    const inputRef = useRef<HTMLInputElement>(null);

    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        if (value.length) {
            const search = value.split(' ').join('+');
            navigate(`/search/movie?query=${search}`);
        }
    };

    useEffect(() => {
        if (isOpen && inputRef.current) {
            inputRef.current.focus();
        }
    }, [isOpen]);

    useEffect(() => {
        setValue(query || '');
    }, [query]);
    return (
        <form
            className='border-b border-lightGray '
            onSubmit={handleSubmit}
            id='search-form'
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
                    ref={inputRef}
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
