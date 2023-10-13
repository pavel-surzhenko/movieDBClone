// React
import { useContext, useEffect, useState } from 'react';
import { Helmet } from 'react-helmet';

// Components
import ProfilePageHeader from '../components/ProfilePage/ProfilePageHeader';
import ProfileMain from '../components/ProfilePage/ProfileMain';

// Other
import { api } from '../api/api';
import { Context } from '../lib';

// Types
import { detailsResponse } from '../types';
import { listsProps } from '../types/Login/listsProps';

export const ProfilePage = () => {
    const { language, sessionId } = useContext(Context);
    const [data, setData] = useState<detailsResponse | null>(null);
    const [lists, setLists] = useState<listsProps | null>(null);
    const [userId, setUserId] = useState<number | null>(null);
    const [page, setPage] = useState<number>(1);

    const handlePageChange = (newPage: number) => {
        setPage(newPage);
    };

    useEffect(() => {
        api.getDetails(sessionId).then((res) => {
            setData(res);
            setUserId(res.id);
        });
        if (userId) {
            api.getLists(userId, sessionId, language, page).then((res) => {
                setLists({
                    'favorite/movies': res['favorite/movies'],
                    'favorite/tv': res['favorite/tv'],
                    'watchlist/movies': res['watchlist/movies'],
                    'watchlist/tv': res['watchlist/tv'],
                });
            });
        }
    }, [userId, language, sessionId, page]);

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
