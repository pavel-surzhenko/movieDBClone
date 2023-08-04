import { useContext, useEffect, useState } from 'react';
import { LanguageContext } from '../lib/context';
import Tab from './Tab';
import TabsContainer from './TabsContainer';
import { MovieProps } from '../types/MovieProps';
import { api } from '../api/api';

export const TrendingTV = () => {
    const [openTab, setOpenTab] = useState(0);
    const [trendingTV, setTrendingTV] = useState<MovieProps[]>([]);
    const [trendingInterval, setTrendingInterval] = useState<string>('day');
    const { language } = useContext(LanguageContext);

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
            .getTrendingTV(trendingInterval, language)
            .then((data) => {
                setTrendingTV(data);
            })
            .catch((error) => console.log(error));
    }, [trendingInterval, language]);

    return (
        <section
            className={`pt-[30px] pl-5 relative bg-trending-bg bg-no-repeat bg-[50%_200px]`}
        >
            <div className='flex'>
                <h3 className='title-black'>
                    {language === 'en-US' ? 'Trending TV' : 'Серіали у тренді'}
                </h3>
                <div>
                    <Tab
                        openTab={openTab}
                        onTabChange={handleTabChange}
                        tabs={tabs}
                    />
                </div>
            </div>
            <TabsContainer trendingMovies={trendingTV} />
        </section>
    );
};

export default TrendingTV;
