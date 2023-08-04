import { useContext, useEffect, useState } from 'react';
import Tab from './Tab';
import TabsContainer from './TabsContainer';
import { api } from '../api/api';
import { MovieProps } from '../types/MovieProps';
import { LanguageContext } from '../lib/context';

export const Trending = () => {
    const [openTab, setOpenTab] = useState(0);
    const [trendingMovies, setTrendingMovies] = useState<MovieProps[]>([]);
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
            .getTrendingMovies(trendingInterval, language)
            .then((data) => {
                setTrendingMovies(data);
            })
            .catch((error) => console.log(error));
    }, [trendingInterval, language]);

    return (
        <section className='pt-[30px] px-5'>
            <div className='flex'>
                <h3 className='title-black'>
                    {language === 'en-US' ? 'Trending' : 'Популярні'}
                </h3>
                <div>
                    <Tab
                        openTab={openTab}
                        onTabChange={handleTabChange}
                        tabs={tabs}
                    />
                </div>
            </div>
            <TabsContainer trendingMovies={trendingMovies} />
        </section>
    );
};

export default Trending;
