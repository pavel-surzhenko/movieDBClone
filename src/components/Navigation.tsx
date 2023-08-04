import { useContext } from 'react';
import { Link } from 'react-router-dom';
import { LanguageContext } from '../lib/context';

const Navigation = ({ isMobile }: { isMobile?: boolean }) => {
    const { language } = useContext(LanguageContext);

    return (
        <nav className={`gap-10 flex text-white ${isMobile && 'flex-col'}`}>
            <Link to={'/films'}>
                {language === 'en-US' ? 'Movies' : 'Фільми'}
            </Link>
            <Link to={'/tw-shows'}>
                {language === 'en-US' ? 'TW Shows' : 'Серіали'}
            </Link>
            <Link to={'/people'}>
                {language === 'en-US' ? 'People' : 'Персони'}
            </Link>
        </nav>
    );
};
export default Navigation;
