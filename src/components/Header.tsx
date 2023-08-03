import Navigation from './Navigation';
import logoSvg from '../assets/logo.svg';

const Header = () => {
    return (
        <header className='py-5 flex justify-between'>
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
