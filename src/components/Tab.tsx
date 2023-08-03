import { TabProps } from '../types/tabProps';

export const Tab: React.FC<TabProps> = ({ openTab, onTabChange, tabs }) => {
    return (
        <ul className='flex'>
            <div className='flex border rounded-[30px]'>
                {tabs?.map((label, index) => (
                    <li key={index}>
                        <a
                            className={`px-5 py-1 block leading-normal rounded-[30px] ${
                                openTab === index
                                    ? 'text-lightGreen bg-darkBlue'
                                    : 'bg-white'
                            }`}
                            onClick={(e) => {
                                e.preventDefault();
                                onTabChange(index);
                            }}
                            data-toggle='tab'
                        >
                            {label}
                        </a>
                    </li>
                ))}
            </div>
        </ul>
    );
};

export default Tab;
