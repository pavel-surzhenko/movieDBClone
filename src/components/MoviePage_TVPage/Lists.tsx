// React & Libraries
import { ChangeEvent, useContext, useState, useEffect } from 'react';

// Components
import { RightArrow } from '../../assets';

// Types
import { listsProps, typeOfLists } from '../../types/listsProps';

// Other
import { Context } from '../../lib';

const Lists: React.FC<listsProps> = ({ selectedOption, onOptionChange, movieType }) => {
    const handleOptionChange = (event: ChangeEvent<HTMLInputElement>) => {
        onOptionChange(event.target.value as typeOfLists);
    };
    const { language } = useContext(Context);
    const now_playing = movieType === 'movie' ? 'now_playing' : 'airing_today';
    const upcoming = movieType === 'movie' ? 'upcoming' : 'on_the_air';

    const [isOpenList, setIsOpenList] = useState(false);
    useEffect(() => {
        setIsOpenList(false);
    }, [selectedOption]);

    return (
        <div className='flex flex-col border px-3 py-2 border-[#e3e3e3] rounded-lg shadow-custom font-light'>
            <div className='text-lg font-medium'>
                <div
                    className='flex justify-between'
                    onClick={() => setIsOpenList(!isOpenList)}
                >
                    <h3>
                        {language === 'uk-UA'
                            ? `Списки ${movieType === 'movie' ? 'Фільмів' : 'Серіалів'}`
                            : `${movieType === 'movie' ? 'Movie' : 'TV Series'} Lists`}
                    </h3>
                    <div
                        className={`lg:hidden ${
                            isOpenList ? 'rotate-90' : ''
                        } transition-transform duration-300 mr-1`}
                    >
                        <RightArrow />
                    </div>
                </div>
            </div>
            <div className={`${isOpenList ? 'block' : 'hidden'} lg:block mt-2`}>
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
                        value={now_playing}
                        checked={
                            movieType === 'movie'
                                ? selectedOption === 'now_playing'
                                : selectedOption === 'airing_today'
                        }
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
                        value={upcoming}
                        checked={
                            movieType === 'movie'
                                ? selectedOption === 'upcoming'
                                : selectedOption === 'on_the_air'
                        }
                        onChange={handleOptionChange}
                        className='mr-2 cursor-pointer input-color '
                    />
                    {language === 'uk-UA'
                        ? `${movieType === 'movie' ? 'Очікувані' : 'Зараз на ТБ'}`
                        : `${movieType === 'movie' ? 'Upcoming' : 'On The Air'}`}
                </label>
            </div>
        </div>
    );
};

export default Lists;
