// React & Libraries
import { useContext, useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';

// Components
import Container from './Container';

// Other
import { Context } from '../lib';

// Assets
import logoSvg from '../assets/logo.svg';
import { SearchIconMain } from '../assets/SearchIconMain';
import Form from './Search/Form';
import { CloseIcon } from '../assets';

const Header = () => {
    const { language, setLanguage } = useContext(Context);
    const [isMobileMenuOpen, setMobileMenuOpen] = useState(false);
    const [isSearchOpen, setIsSearchOpen] = useState(false);
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

    return (
        <div className='bg-darkBlue'>
            <Container>
                <nav className='p-5 flex justify-between items-center text-white'>
                    <div className='order-2 md:order-1'>
                        <Link to='/'>
                            <img
                                src={logoSvg}
                                alt=''
                                className='h-5 w-40'
                            />
                        </Link>
                    </div>
                    <div className='hidden md:flex flex-grow justify-end md:order-2'>
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
                    <div
                        className='ml-5 w-7 h-7 order-3'
                        onClick={(event) => {
                            event.stopPropagation();
                            setIsSearchOpen(!isSearchOpen);
                        }}
                    >
                        {isSearchOpen ? <CloseIcon /> : <SearchIconMain />}
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
