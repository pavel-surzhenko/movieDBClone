import Navigation from './Navigation';
import logoSvg from '../assets/logo.svg';

const Header = () => {
    return (
        <header className='max-w-7xl mx-auto py-5 px-4 flex justify-between'>
            <img
                src={logoSvg}
                alt=''
                className='h-5 w-40'
            />
            <Navigation />
        </header>
    );
};
export default Header;
