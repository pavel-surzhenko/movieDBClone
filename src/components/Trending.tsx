import { useState } from 'react';
import Tab from './Tab';
import TabsContainer from './TabsContainer';

export const Trending = () => {
    const [openTab, setOpenTab] = useState(0);

    const handleTabChange = (tabIndex: number): void => {
        setOpenTab(tabIndex);
    };

    const tabs = ['Today', 'This week'];

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
            <TabsContainer openTab={openTab} />
        </section>
    );
};

export default Trending;
