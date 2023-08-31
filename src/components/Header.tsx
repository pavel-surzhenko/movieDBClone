import { useContext, useState } from 'react';
import { Link } from 'react-router-dom';
import { Context } from '../lib/context';
import logoSvg from '../assets/logo.svg';

const Header = () => {
    const { language, setLanguage } = useContext(Context);
    const [isMobileMenuOpen, setMobileMenuOpen] = useState(false);

    const toggleMobileMenu = () => {
        setMobileMenuOpen(!isMobileMenuOpen);
    };
    if (isMobileMenuOpen) {
        document.body.style.overflow = 'hidden';
    } else {
        document.body.style.overflow = '';
    }

    return (
        <div className='bg-darkBlue'>
            <nav className='p-5 flex justify-between items-center text-white'>
                <div className=''>
                    <Link to='/'>
                        <img
                            src={logoSvg}
                            alt=''
                            className='h-5 w-40'
                        />
                    </Link>
                </div>
                <div className='hidden md:flex'>
                    <Link
                        to={'/films'}
                        className={` mr-10`}
                    >
                        {language === 'en-US' ? 'Movies' : 'Фільми'}
                    </Link>
                    <Link
                        to={'/tw-shows'}
                        className={` mr-10`}
                    >
                        {language === 'en-US' ? 'TV Shows' : 'Серіали'}
                    </Link>
                    <Link
                        to={'/people'}
                        className={`mr-10`}
                    >
                        {language === 'en-US' ? 'People' : 'Персони'}
                    </Link>
                    <div className='flex text-white'>
                        <button
                            className={`language-btn mr-2 ${
                                language === 'en-US' ? 'bg-white text-darkBlue ' : ''
                            }`}
                            onClick={() => setLanguage('en-US')}
                        >
                            EN
                        </button>
                        <button
                            className={`language-btn ${
                                language === 'uk-UA' ? 'bg-white text-darkBlue ' : ''
                            }`}
                            onClick={() => setLanguage('uk-UA')}
                        >
                            UA
                        </button>
                    </div>
                </div>
                <div className='md:hidden'>
                    <button
                        className=''
                        onClick={toggleMobileMenu}
                    >
                        <svg
                            className='h-6 w-6'
                            fill='none'
                            stroke='currentColor'
                            viewBox='0 0 24 24'
                            xmlns='http://www.w3.org/2000/svg'
                        >
                            <path
                                strokeLinecap='round'
                                strokeLinejoin='round'
                                strokeWidth={2}
                                d='M4 6h16M4 12h16M4 18h16'
                            />
                        </svg>
                    </button>
                </div>
                {isMobileMenuOpen && (
                    <div className='md:hidden absolute top-0 left-0 w-full h-screen bg-darkBlue z-10'>
                        <button
                            className='m-5 absolute right-0'
                            onClick={toggleMobileMenu}
                        >
                            <svg
                                className='h-6 w-6'
                                fill='none'
                                stroke='currentColor'
                                viewBox='0 0 24 24'
                                xmlns='http://www.w3.org/2000/svg'
                            >
                                <path
                                    strokeLinecap='round'
                                    strokeLinejoin='round'
                                    strokeWidth={2}
                                    d='M6 18L18 6M6 6l12 12'
                                />
                            </svg>
                        </button>
                        <div className='flex flex-col items-center pt-14 text-lg'>
                            <Link
                                to={'/films'}
                                className={`mb-10`}
                                onClick={() => {
                                    toggleMobileMenu();
                                }}
                            >
                                {language === 'en-US' ? 'Movies' : 'Фільми'}
                            </Link>
                            <Link
                                to={'/tw-shows'}
                                className={` mb-10`}
                                onClick={() => {
                                    toggleMobileMenu();
                                }}
                            >
                                {language === 'en-US' ? 'TV Shows' : 'Серіали'}
                            </Link>
                            <Link
                                to={'/people'}
                                className={`mb-10`}
                                onClick={() => {
                                    toggleMobileMenu();
                                }}
                            >
                                {language === 'en-US' ? 'People' : 'Персони'}
                            </Link>
                            <div className='flex text-white'>
                                <button
                                    className={`language-btn mr-5 text-xl ${
                                        language === 'en-US' ? 'bg-white text-darkBlue ' : ''
                                    }`}
                                    onClick={() => {
                                        setLanguage('en-US');
                                        toggleMobileMenu();
                                    }}
                                >
                                    EN
                                </button>
                                <button
                                    className={`language-btn  text-xl ${
                                        language === 'uk-UA' ? 'bg-white text-darkBlue ' : ''
                                    }`}
                                    onClick={() => {
                                        setLanguage('uk-UA');
                                        toggleMobileMenu();
                                    }}
                                >
                                    UA
                                </button>
                            </div>
                        </div>
                    </div>
                )}
            </nav>
        </div>
    );
};

export default Header;
