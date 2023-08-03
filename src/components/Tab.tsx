import { TabProps } from '../types/tabProps';

export const Tab: React.FC<TabProps> = ({ openTab, onTabChange }) => {
    return (
        <ul className='flex'>
            <div className='flex border rounded-[30px]'>
                <li className=''>
                    <a
                        className={
                            'px-5 py-1 block leading-normal rounded-[30px] ' +
                            (openTab === 1
                                ? 'text-lightGreen bg-darkBlue'
                                : ' bg-white ')
                        }
                        onClick={(e) => {
                            e.preventDefault();
                            onTabChange(1);
                        }}
                        data-toggle='tab'
                    >
                        Today
                    </a>
                </li>
                <li className=''>
                    <a
                        className={
                            'px-5 py-1  block leading-normal  rounded-[30px] ' +
                            (openTab === 2
                                ? 'text-lightGreen bg-darkBlue'
                                : ' bg-white')
                        }
                        onClick={(e) => {
                            e.preventDefault();
                            onTabChange(2);
                        }}
                        data-toggle='tab'
                    >
                        This week
                    </a>
                </li>
            </div>
        </ul>
    );
};

export default Tab;
