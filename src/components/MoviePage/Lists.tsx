// React & Libraries
import { ChangeEvent } from 'react';

// Types
import { listsProps, typeOfLists } from '../../types/listsProps';

const Lists: React.FC<listsProps> = ({ selectedOption, onOptionChange, movieType }) => {
    const handleOptionChange = (event: ChangeEvent<HTMLInputElement>) => {
        onOptionChange(event.target.value as typeOfLists);
    };

    return (
        <div className='flex flex-col border px-3 py-2 border-[#e3e3e3] rounded-lg shadow-custom'>
            <div className='mb-2 text-lg font-medium'>
                <h3>Movie Lists</h3>
            </div>
            <label className='flex items-center cursor-pointer'>
                <input
                    type='radio'
                    value='popular'
                    checked={selectedOption === 'popular'}
                    onChange={handleOptionChange}
                    className='mr-2 cursor-pointer input-color'
                />
                Popular
            </label>

            <label className='flex items-center cursor-pointer '>
                <input
                    type='radio'
                    value={'now_playing'}
                    checked={selectedOption === 'now_playing'}
                    onChange={handleOptionChange}
                    className='mr-2 cursor-pointer input-color '
                />
                {movieType === 'movie' ? 'Now Playing' : 'Airing Today'}
            </label>

            <label className='flex items-center cursor-pointer '>
                <input
                    type='radio'
                    value='top_rated'
                    checked={selectedOption === 'top_rated'}
                    onChange={handleOptionChange}
                    className='mr-2 cursor-pointer input-color '
                />
                Top Rated
            </label>

            <label className='flex items-center cursor-pointer '>
                <input
                    type='radio'
                    value={'upcoming'}
                    checked={selectedOption === 'upcoming'}
                    onChange={handleOptionChange}
                    className='mr-2 cursor-pointer input-color '
                />
                {movieType === 'movie' ? 'Upcoming' : 'On The Air'}
            </label>
        </div>
    );
};

export default Lists;
