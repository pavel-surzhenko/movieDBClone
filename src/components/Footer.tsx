import Container from './Container';
import logoSvg from '../assets/logo.svg';
import { Link } from 'react-router-dom';

export const Footer = () => {
    return (
        <footer className='bg-darkBlue'>
            <Container>
                <div className='p-5'>
                    <div className='flex flex-col justify-center items-center'>
                        <Link
                            to='/'
                            className='mb-3'
                        >
                            <img
                                src={logoSvg}
                                alt=''
                                className='h-5 w-40'
                            />
                        </Link>
                        <div className='text-white font-thin'>Created by Pavlo Surzhenko</div>
                    </div>
                </div>
            </Container>
        </footer>
    );
};

export default Footer;
