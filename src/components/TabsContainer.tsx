import { TabProps } from '../types/tabProps';

const TabsContainer: React.FC<TabProps> = ({ openTab }) => {
    return (
        <>
            <div className='relative flex flex-col min-w-0 break-words w-full py-5'>
                <div className=''>
                    <div className=''>
                        <div className={openTab === 0 ? 'block' : 'hidden'}>
                            <p>
                                Collaboratively administrate empowered markets
                                via plug-and-play networks. Dynamically
                                procrastinate B2C users after installed base
                                benefits.
                                <br />
                                <br /> Dramatically visualize customer directed
                                convergence without revolutionary ROI.
                            </p>
                        </div>
                        <div className={openTab === 1 ? 'block' : 'hidden'}>
                            <p>
                                Completely synergize resource taxing
                                relationships via premier niche markets.
                                Professionally cultivate one-to-one customer
                                service with robust ideas.
                                <br />
                                <br />
                                Dynamically innovate resource-leveling customer
                                service for state of the art customer service.
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};
export default TabsContainer;
