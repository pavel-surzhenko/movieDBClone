// React
import { useContext, useEffect, useState } from 'react';

// Other
import { api } from '../api/api';
import { Context } from '../lib';

// Types
import { detailsResponse, favoriteList } from '../types';
import ProfilePageHeader from '../components/ProfilePage/ProfilePageHeader';

export const ProfilePage = () => {
    const { language, sessionId } = useContext(Context);
    const [data, setData] = useState<detailsResponse | null>(null);
    const [favorite, setFavorite] = useState<favoriteList | null>(null);
    const [userId, setUserId] = useState<number | null>(null);

    useEffect(() => {
        api.getDetails(sessionId).then((res) => {
            setData(res);
            setUserId(res.id);
        });
        if (userId) {
            api.getLists(userId, sessionId, language).then((res) =>
                setFavorite({
                    'favorite/movies': res['favorite/movies'],
                    'favorite/tv': res['favorite/tv'],
                })
            );
        }
    }, [userId]);
    return <>{data && <ProfilePageHeader {...data} />}</>;
};
