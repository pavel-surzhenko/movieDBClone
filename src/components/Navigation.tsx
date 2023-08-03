import { Link } from 'react-router-dom';

const Navigation = ({ isMobile }: { isMobile?: boolean }) => {
    return (
        <nav className={`gap-10 flex text-white ${isMobile && 'flex-col'}`}>
            <Link to={'/films'}>Movies</Link>
            <Link to={'/tw-shows'}>TW Shows</Link>
            <Link to={'/people'}>People</Link>
        </nav>
    );
};
export default Navigation;
