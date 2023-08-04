import { useContext } from 'react';
import { LanguageContext } from '../lib/context';
import { TabProps } from '../types/TabProps';

export const Tab: React.FC<TabProps> = ({ openTab, onTabChange, tabs }) => {
    const { language } = useContext(LanguageContext);

    return (
        <ul className='flex'>
            <div className='flex border rounded-[30px]'>
                {tabs?.map((obj, index) => (
                    <li
                        key={index}
                        className='animate-fade-right animate-once animate-duration-500 cursor-pointer'
                    >
                        <a
                            className={`px-5 py-1 block leading-normal rounded-[30px] ${
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
