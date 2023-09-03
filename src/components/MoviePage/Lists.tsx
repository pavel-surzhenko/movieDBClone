// React & Libraries
import { ChangeEvent, useContext } from 'react';

// Types
import { listsProps, typeOfLists } from '../../types/listsProps';
import { Context } from '../../lib';

const Lists: React.FC<listsProps> = ({ selectedOption, onOptionChange, movieType }) => {
    const handleOptionChange = (event: ChangeEvent<HTMLInputElement>) => {
        onOptionChange(event.target.value as typeOfLists);
    };
    const { language } = useContext(Context);

    return (
        <div className='flex flex-col border px-3 py-2 border-[#e3e3e3] rounded-lg shadow-custom'>
            <div className='mb-2 text-lg font-medium'>
                <h3>
                    {language === 'uk-UA'
                        ? `Списки ${movieType === 'movie' ? 'Фільмів' : 'Серіалів'}`
                        : `${movieType === 'movie' ? 'Movie' : 'TV Series'} Lists`}
                </h3>
            </div>
            <label className='flex items-center cursor-pointer'>
                <input
                    type='radio'
                    value='popular'
                    checked={selectedOption === 'popular'}
                    onChange={handleOptionChange}
                    className='mr-2 cursor-pointer input-color'
                />
                {language === 'uk-UA' ? 'Популярні' : 'Popular'}
            </label>

            <label className='flex items-center cursor-pointer '>
                <input
                    type='radio'
                    value={'now_playing'}
                    checked={selectedOption === 'now_playing'}
                    onChange={handleOptionChange}
                    className='mr-2 cursor-pointer input-color '
                />
                {language === 'uk-UA'
                    ? `${movieType === 'movie' ? 'Зараз у кіно' : 'Сьгодні в ефірі'}`
                    : `${movieType === 'movie' ? 'Now Playing' : 'Airing Today'}`}
            </label>

            <label className='flex items-center cursor-pointer '>
                <input
                    type='radio'
                    value='top_rated'
                    checked={selectedOption === 'top_rated'}
                    onChange={handleOptionChange}
                    className='mr-2 cursor-pointer input-color '
                />
                {language === 'uk-UA' ? 'Рейтингові' : 'Top Rated'}
            </label>

            <label className='flex items-center cursor-pointer '>
                <input
                    type='radio'
                    value={'upcoming'}
                    checked={selectedOption === 'upcoming'}
                    onChange={handleOptionChange}
                    className='mr-2 cursor-pointer input-color '
                />
                {language === 'uk-UA'
                    ? `${movieType === 'movie' ? 'Очікувані' : 'Зараз на ТБ'}`
                    : `${movieType === 'movie' ? 'Upcoming' : 'On The Air'}`}
            </label>
        </div>
    );
};

export default Lists;
