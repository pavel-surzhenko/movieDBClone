import { useContext } from 'react';
import { Link } from 'react-router-dom';
import { Context } from '../lib/context';

const Navigation = ({ isMobile }: { isMobile?: boolean }) => {
    const { language } = useContext(Context);

    return (
        <nav className={`flex text-white ${isMobile && 'flex-col'}`}>
            <Link
                to={'/films'}
                className={`${isMobile && 'mb-7'} mr-10`}
            >
                {language === 'en-US' ? 'Movies' : 'Фільми'}
            </Link>
            <Link
                to={'/tw-shows'}
                className={`${isMobile && 'mb-7'} mr-10`}
            >
                {language === 'en-US' ? 'TW Shows' : 'Серіали'}
            </Link>
            <Link
                to={'/people'}
                className={`${isMobile && 'mb-7'} mr-10`}
            >
                {language === 'en-US' ? 'People' : 'Персони'}
            </Link>
        </nav>
    );
};
export default Navigation;
