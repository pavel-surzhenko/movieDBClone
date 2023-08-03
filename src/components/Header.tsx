import Navigation from './Navigation';
import logoSvg from '../assets/logo.svg';
import MenuIcon from '../assets/MenuIcon';
import { useState } from 'react';
import CloseIcon from '../assets/CloseIcon';
import { Link } from 'react-router-dom';

const Header = () => {
    const [showMenu, setShowMenu] = useState(false);

    return (
        <div className='bg-darkBlue'>
            <header className='py-5 flex justify-between px-5 flex-row-reverse lg:flex-row'>
                <Link to='/'>
                    <img
                        src={logoSvg}
                        alt=''
                        className='h-5 w-40'
                    />
                </Link>
                <div
                    className='block lg:hidden relative z-20 text-white'
                    onClick={() => setShowMenu((prev) => !prev)}
                >
                    {showMenu ? <CloseIcon /> : <MenuIcon />}
                </div>
                <div className='hidden lg:block'>
                    <Navigation />
                </div>
                <div
                    className={`${
                        showMenu ? 'fixed block' : ' static hidden'
                    }  top-0 left-0 right-1/3 bottom-0 bg-darkBlue pl-12 pt-20 text-xl z-10`}
                >
                    <Navigation isMobile />
                </div>
            </header>
        </div>
    );
};
export default Header;
