import { useState } from 'react';
import Tab from './Tab';
import TabsContainer from './TabsContainer';

export const Trending = () => {
    const [openTab, setOpenTab] = useState(1);

    const handleTabChange = (tabIndex: number): void => {
        setOpenTab(tabIndex);
    };
    return (
        <section className='pt-[30px] px-5'>
            <div className='flex'>
                <h3 className='title-black'>Trending</h3>
                <div>
                    <Tab
                        openTab={openTab}
                        onTabChange={handleTabChange}
                    />
                </div>
            </div>
            <TabsContainer openTab={openTab} />
        </section>
    );
};

export default Trending;
