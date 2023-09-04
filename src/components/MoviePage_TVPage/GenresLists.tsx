// React & Libraries
import { useContext, useEffect, useState } from 'react';

// Types
import { genreListProps } from '../../types';

// Assets
import { RightArrow } from '../../assets';

// Other
import { Context } from '../../lib';

const GenresLists: React.FC<genreListProps> = ({ genres, selectedGenre, onGenreChange }) => {
    const { language } = useContext(Context);
    const [isOpenList, setIsOpenList] = useState(false);
    useEffect(() => {
        setIsOpenList(false);
    }, [selectedGenre]);

    return (
        <div className='border mt-2 mb-5 lg:my-5 px-3 py-2 border-[#e3e3e3] rounded-lg shadow-custom'>
            <div
                className='flex justify-between'
                onClick={() => setIsOpenList(!isOpenList)}
            >
                <h3 className='text-lg font-medium'>{language === 'uk-UA' ? 'Жанри' : 'Genres'}</h3>
                <div
                    className={`lg:hidden ${
                        isOpenList ? 'rotate-90' : ''
                    } transition-transform duration-300 mr-1`}
                >
                    <RightArrow />
                </div>
            </div>
            <ul className={`${isOpenList ? 'flex' : 'hidden'} lg:flex mt-2  flex-wrap`}>
                {genres.map((genre) => (
                    <li
                        className={`border border-[#9e9e9e] rounded-xl px-2 mb-2 mr-2 cursor-pointer font-light ${
                            selectedGenre === genre.id && 'bg-lightBlue text-white border-lightBlue'
                        }`}
                        key={genre.id}
                        onClick={() => onGenreChange(genre.id)}
                    >
                        {genre.name}
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default GenresLists;
