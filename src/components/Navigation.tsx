import { Link } from 'react-router-dom';

const Navigation = () => {
    return (
        <nav className='flex gap-10 '>
            <Link to={'/films'}>Movies</Link>
            <Link to={'/tw-shows'}>TW Shows</Link>
            <Link to={'/people'}>People</Link>
        </nav>
    );
};
export default Navigation;
