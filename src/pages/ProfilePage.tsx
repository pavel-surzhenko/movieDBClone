// React
import { useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import { ToastContainer, Slide } from 'react-toastify';

// Components
import ProfilePageHeader from '../components/ProfilePage/ProfilePageHeader';
import ProfileMain from '../components/ProfilePage/ProfileMain';
import Spinner from '../components/Spinner';

// Other
import { api } from '../api/api';
import { Context } from '../lib';

// Types
import { listsResponse } from '../types';
import { listsProps } from '../types/Login/listsProps';

export const ProfilePage = () => {
    const { language, sessionId, userId } = useContext(Context);
    const [data, setData] = useState<listsResponse | null>(null);
    const [lists, setLists] = useState<listsProps | null>(null);
    const [page, setPage] = useState<number>(1);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();

    const handlePageChange = (newPage: number) => {
        setPage(newPage);
    };

    useEffect(() => {
        setLoading(true);
        if (userId) {
            api.getLists(userId, sessionId, language, page).then((res) => {
                setData(res);
                setLists({
                    'favorite/movies': res['favorite/movies'],
                    'favorite/tv': res['favorite/tv'],
                    'watchlist/movies': res['watchlist/movies'],
                    'watchlist/tv': res['watchlist/tv'],
                });
            });
            setLoading(false);
        } else {
            navigate('/login');
        }
    }, [userId, language, sessionId, page, navigate]);

    return (
        <>
            <Helmet>
                <title>My profile - The Movie Data Base (TMDB)</title>
            </Helmet>
            {!loading ? (
                <>
                    {data && <ProfilePageHeader {...data} />}
                    {lists && (
                        <ProfileMain
                            lists={lists}
                            page={page}
                            pageChange={handlePageChange}
                        />
                    )}
                </>
            ) : (
                <div className='absolute top-1/2 right-1/2 translate-x-1/2'>
                    <Spinner />
                </div>
            )}
        </>
    );
};
