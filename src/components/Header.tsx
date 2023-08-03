import Navigation from './Navigation';
import logoSvg from '../assets/logo.svg';

const Header = () => {
    return (
        <div className='bg-darkBlue'>
            <header className='py-5 flex justify-between px-5'>
                <img
                    src={logoSvg}
                    alt=''
                    className='h-5 w-40'
                />
                <Navigation />
            </header>
        </div>
    );
};
export default Header;
