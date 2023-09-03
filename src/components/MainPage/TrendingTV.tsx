// React & Libraries
import { useContext, useEffect, useState } from 'react';

// Components
import Tab from '../Tab';
import TabsContainer from '../TabsContainer';

// Other
import { Context } from '../../lib';
import { api } from '../../api/api';

// Types
import { tvProps } from '../../types/TV';

const TrendingTV = () => {
    const [openTab, setOpenTab] = useState(0);
    const [trendingTV, setTrendingTV] = useState<tvProps[]>([]);
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
        api.tv
            .getTrendingTV(trendingInterval, language)
            .then((data) => {
                setTrendingTV(data);
            })
            .catch();
    }, [trendingInterval, language]);

    return (
        <section className={`pt-[30px] pl-5 relative bg-trending-bg bg-no-repeat bg-[50%_200px]`}>
            <div className='flex items-center'>
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
            <TabsContainer movies={trendingTV} />
        </section>
    );
};

export default TrendingTV;
