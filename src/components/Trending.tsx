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
    const { language, setLanguage } = useContext(LanguageContext);
    const handleTabChange = (tabIndex: number, tabLabel: string): void => {
        setOpenTab(tabIndex);
        setTrendingInterval(tabLabel);
    };

    const tabs = ['Today', 'This week'];

    useEffect(() => {
        api.movies
            .getTrendingMovies(trendingInterval)
            .then((data) => {
                setTrendingMovies(data);
            })
            .catch((error) => console.log(error));
    }, [trendingInterval]);

    return (
        <section className='pt-[30px] px-5'>
            <div className='flex'>
                <h3 className='title-black'>Trending</h3>
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
