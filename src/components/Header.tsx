// React & Libraries
import { useContext, useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';

// Components
import Container from './Container';
import Form from './Search/Form';

// Other
import { Context } from '../lib';
import { api } from '../api/api';

// Assets
import logoSvg from '../assets/logo.svg';
import logoMobile from '../assets/logoMobile.svg';
import { SearchIconMain } from '../assets/SearchIconMain';
import { CloseIcon } from '../assets';

// Types
import { detailsResponse } from '../types';

const Header = () => {
    const { language, setLanguage, sessionId } = useContext(Context);
    const [isMobileMenuOpen, setMobileMenuOpen] = useState(false);
    const [isSearchOpen, setIsSearchOpen] = useState(false);
    const [accountDetails, setAccountDetails] = useState<detailsResponse | null>(null);

    const searchFormRef = useRef<HTMLDivElement>(null);

    const toggleMobileMenu = () => {
        setMobileMenuOpen(!isMobileMenuOpen);
    };
    if (isMobileMenuOpen) {
        document.body.style.overflow = 'hidden';
    } else {
        document.body.style.overflow = '';
    }

    useEffect(() => {
        const handleOutsideClick = (event: MouseEvent) => {
            if (isSearchOpen && !searchFormRef.current?.contains(event.target as Node)) {
                setIsSearchOpen(false);
            }
        };
        window.addEventListener('click', handleOutsideClick);

        return () => window.removeEventListener('click', handleOutsideClick);
    }, [isSearchOpen]);

    useEffect(() => {
        if (sessionId) {
            api.details(sessionId).then((res) => setAccountDetails(res));
        }
    }, [sessionId]);

    return (
        <div className='bg-darkBlue'>
            <Container>
                <nav className='px-5 py-3 md:p-5 flex justify-between items-center text-white'>
                    <div className='order-2 md:order-1'>
                        {window.innerWidth > 768 ? (
                            <Link to='/'>
                                <img
                                    src={logoSvg}
                                    alt=''
                                    className='h-5 w-40'
                                />
                            </Link>
                        ) : (
                            <Link to='/'>
                                <img
                                    src={logoMobile}
                                    alt=''
                                    className='h-auto w-[55px]'
                                />
                            </Link>
                        )}
                    </div>
                    <div className='hidden md:flex flex-grow justify-start md:order-2 md:ml-10'>
                        <Link
                            to={'/movie'}
                            className={` mr-10 hover:text-lightBlue transition-colors duration-300`}
                        >
                            {language === 'en-US' ? 'Movies' : 'Фільми'}
                        </Link>
                        <Link
                            to={'/tv'}
                            className={` mr-10 hover:text-lightBlue transition-colors duration-300`}
                        >
                            {language === 'en-US' ? 'TV Shows' : 'Серіали'}
                        </Link>
                        <Link
                            to={'/people'}
                            className={`mr-10 hover:text-lightBlue transition-colors duration-300`}
                        >
                            {language === 'en-US' ? 'People' : 'Персони'}
                        </Link>
                    </div>
                    <div className='md:flex text-white md:order-3 hidden'>
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
                    <div className='order-3 flex items-center'>
                        <div
                            className='md:ml-5 w-7 h-7'
                            onClick={(event) => {
                                event.stopPropagation();
                                setIsSearchOpen(!isSearchOpen);
                            }}
                        >
                            {isSearchOpen ? <CloseIcon /> : <SearchIconMain />}
                        </div>
                        <div className='md:ml-5 order-4 hover:text-lightBlue transition-colors duration-300 hidden md:block'>
                            {sessionId ? (
                                accountDetails?.username
                            ) : (
                                <Link to={'/login'}>Login</Link>
                            )}
                        </div>
                    </div>
                    <div className='md:hidden order-1 w-7 h-7'>
                        <button
                            className=''
                            onClick={toggleMobileMenu}
                        >
                            <svg
                                className='h-7 w-7'
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
                                className='m-5 absolute left-0'
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
                            <div className='flex flex-col items-center pt-14 text-xl'>
                                <Link
                                    to={'/movie'}
                                    className={`mb-10`}
                                    onClick={() => {
                                        toggleMobileMenu();
                                    }}
                                >
                                    {language === 'en-US' ? 'Movies' : 'Фільми'}
                                </Link>
                                <Link
                                    to={'/tv'}
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
                                <div className=' hover:text-lightBlue transition-colors duration-300 mb-10'>
                                    {sessionId ? (
                                        accountDetails?.username
                                    ) : (
                                        <Link
                                            onClick={() => toggleMobileMenu()}
                                            to={'/login'}
                                        >
                                            Login
                                        </Link>
                                    )}
                                </div>
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
            </Container>
            <div
                className={`${
                    isSearchOpen ? 'absolute' : 'hidden'
                } right-0 left-0 z-10 bg-white animate-fade-down animate-once animate-duration-300 animate-delay-0 animate-ease-linear`}
                ref={searchFormRef}
            >
                <Form isOpen={isSearchOpen} />
            </div>
        </div>
    );
};

export default Header;
