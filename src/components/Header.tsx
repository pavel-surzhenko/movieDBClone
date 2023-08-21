import Navigation from './Navigation';
import logoSvg from '../assets/logo.svg';
import MenuIcon from '../assets/MenuIcon';
import { useContext, useState } from 'react';
import CloseIcon from '../assets/CloseIcon';
import { Link } from 'react-router-dom';
import { Context } from '../lib/context';

const Header = () => {
    const [showMenu, setShowMenu] = useState(false);
    const { language, setLanguage } = useContext(Context);

    return (
        <div className='bg-darkBlue'>
            <header className='py-5 flex items-center justify-between px-5 flex-row-reverse lg:flex-row'>
                <Link to='/'>
                    <img
                        src={logoSvg}
                        alt=''
                        className='h-5 w-40'
                    />
                </Link>
                <div
                    className='block lg:hidden left-5 z-20 text-white'
                    onClick={() => setShowMenu((prev) => !prev)}
                >
                    {showMenu ? <CloseIcon /> : <MenuIcon />}
                </div>
                <div className='items-center hidden lg:flex'>
                    <div className='mr-5'>
                        <Navigation />
                    </div>
                    <div className='flex text-white'>
                        <button
                            className={`language-btn mr-2 ${
                                language === 'en-US'
                                    ? 'bg-white text-darkBlue '
                                    : ''
                            }`}
                            onClick={() => setLanguage('en-US')}
                        >
                            EN
                        </button>
                        <button
                            className={`language-btn ${
                                language === 'uk-UA'
                                    ? 'bg-white text-darkBlue '
                                    : ''
                            }`}
                            onClick={() => setLanguage('uk-UA')}
                        >
                            UA
                        </button>
                    </div>
                </div>
                <div
                    className={`${
                        showMenu ? 'fixed block' : ' static hidden'
                    }  top-0 left-0 right-1/3 bottom-0 bg-darkBlue pl-12 pt-20 text-xl z-10`}
                >
                    <Navigation isMobile />
                    <div className='flex text-white mt-10'>
                        <button
                            className={`language-btn mr-5 ${
                                language === 'en-US'
                                    ? 'bg-white text-darkBlue '
                                    : ''
                            }`}
                            onClick={() => setLanguage('en-US')}
                        >
                            EN
                        </button>
                        <button
                            className={`language-btn ${
                                language === 'uk-UA'
                                    ? 'bg-white text-darkBlue '
                                    : ''
                            }`}
                            onClick={() => setLanguage('uk-UA')}
                        >
                            UA
                        </button>
                    </div>
                </div>
            </header>
        </div>
    );
};
export default Header;
