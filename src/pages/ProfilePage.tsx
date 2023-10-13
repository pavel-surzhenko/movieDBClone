// React
import { useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Helmet } from 'react-helmet';

// Components
import ProfilePageHeader from '../components/ProfilePage/ProfilePageHeader';
import ProfileMain from '../components/ProfilePage/ProfileMain';

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
    const navigate = useNavigate();

    const handlePageChange = (newPage: number) => {
        setPage(newPage);
    };

    useEffect(() => {
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
        } else {
            navigate('/login');
        }
    }, [userId, language, sessionId, page, navigate]);

    return (
        <>
            <Helmet>
                <title>My profile - The Movie Data Base (TMDB)</title>
            </Helmet>
            {data && <ProfilePageHeader {...data} />}
            {lists && (
                <ProfileMain
                    lists={lists}
                    page={page}
                    pageChange={handlePageChange}
                />
            )}
        </>
    );
};
