// React & Libraries
import { Link } from 'react-router-dom';

// Components
import Container from './Container';

// Assets
import logoSvg from '../assets/logo.svg';
import { LinkedIn } from '../assets/Linkedin';
import { GitHub } from '../assets/GitHub';
import { Mail } from '../assets/Mail';

const Footer = () => {
    return (
        <footer className='bg-darkBlue'>
            <Container>
                <div className='p-5 text-white font-thin'>
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
                    </div>
                    <div className='flex flex-col gap-2 items-center justify-around md:flex-row'>
                        <div className=''>Created by Pavlo Surzhenko</div>
                        <div className='flex items-center'>
                            Contact me:
                            <a
                                href='https://www.linkedin.com/in/pavlo-surzhenko/'
                                target='_blank'
                                className='mx-2'
                            >
                                <LinkedIn />
                            </a>
                            <a href='mailto:pavel.surzhenko@icloud.com'>
                                <Mail />
                            </a>
                        </div>
                        <div className='flex items-center '>
                            See my projects:
                            <a
                                href='https://github.com/pavel-surzhenko'
                                target='_blank'
                                className='mx-2'
                            >
                                <GitHub />
                            </a>
                        </div>
                        <div></div>
                    </div>
                </div>
            </Container>
        </footer>
    );
};

export default Footer;
