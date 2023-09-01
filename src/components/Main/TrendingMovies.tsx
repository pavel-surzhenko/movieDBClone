// React & Libraries
import { useContext, useEffect, useState } from 'react';

// Components
import Tab from '../Tab';
import TabsContainer from '../TabsContainer';

// Types
import { movieProps } from '../../types/Movie';

// Other
import { api } from '../../api/api';
import { Context } from '../../lib';

const TrendingMovies = () => {
    const [openTab, setOpenTab] = useState(0);
    const [trendingMovies, setTrendingMovies] = useState<movieProps[]>([]);
    const [trendingInterval, setTrendingInterval] = useState<string>('day');
    const { language } = useContext(Context);

    const handleTabChange = (tabIndex: number, tabLabel: string): void => {
        setOpenTab(tabIndex);
        setTrendingInterval(tabLabel);
    };

    const tabs = [
        { key: 'day', labelEN: 'Today', labelUA: 'Сьогодні' },
        { key: 'week', labelEN: 'This week', labelUA: 'Цього тижня' },
    ];

    useEffect(() => {
        api.movies
            .getTrendingMovies(trendingInterval, language)
            .then((data) => {
                setTrendingMovies(data);
            })
            .catch();
    }, [trendingInterval, language]);

    return (
        <section className={`pt-[30px] pl-5 relative bg-trending-bg bg-no-repeat bg-[50%_200px]`}>
            <div className='flex items-center'>
                <h3 className='title-black'>
                    {language === 'en-US' ? 'Trending Movies' : 'Фільми у тренді'}
                </h3>
                <div>
                    <Tab
                        openTab={openTab}
                        onTabChange={handleTabChange}
                        tabs={tabs}
                    />
                </div>
            </div>
            <TabsContainer movies={trendingMovies} />
        </section>
    );
};

export default TrendingMovies;
