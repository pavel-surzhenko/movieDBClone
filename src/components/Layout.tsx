import { Outlet } from 'react-router-dom';
import Header from './Header';
import Footer from './Footer';

export const Layout = () => {
    return (
        <>
            <Header />
            <div className='min-h-full flex-1'>
                <Outlet />
            </div>
            <Footer />
        </>
    );
};

export default Layout;
