import { useContext } from 'react';
import { Context } from '../lib/context';
import { tabProps, tabObj } from 'types/tabProps';

export const Tab: React.FC<tabProps> = ({ openTab, onTabChange, tabs }) => {
    const { language } = useContext(Context);

    return (
        <ul className='flex'>
            <div className='flex border rounded-[30px]'>
                {tabs?.map((obj: tabObj, index: number) => (
                    <li
                        key={index}
                        className='animate-fade-right animate-once animate-duration-500 cursor-pointer'
                    >
                        <a
                            className={`px-3 lg:px-5 py-1 block leading-normal rounded-[30px] ${
                                openTab === index
                                    ? 'text-lightGreen bg-darkBlue'
                                    : 'bg-white'
                            } transition-colors duration-300 ease-out`}
                            onClick={(e) => {
                                e.preventDefault();
                                onTabChange(index, obj.key);
                            }}
                            data-toggle='tab'
                        >
                            {language === 'en-US' ? obj.labelEN : obj.labelUA}
                        </a>
                    </li>
                ))}
            </div>
        </ul>
    );
};

export default Tab;
