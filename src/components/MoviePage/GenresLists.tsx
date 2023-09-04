// React & Libraries
import { useContext } from 'react';

// Types
import { genreListProps } from '../../types/genreListProps';

// Other
import { Context } from '../../lib';

const GenresLists: React.FC<genreListProps> = ({ genres, selectedGenre, onGenreChange }) => {
    const { language } = useContext(Context);

    return (
        <div className='border mt-5 px-3 py-2 border-[#e3e3e3] rounded-lg shadow-custom'>
            <h3 className='mb-2 text-lg font-medium'>
                {language === 'uk-UA' ? 'Жанри' : 'Genres'}
            </h3>
            <ul className='flex flex-wrap'>
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
