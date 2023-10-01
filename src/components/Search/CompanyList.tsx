// Types
import { baseUrlImg } from '../../lib';
import { companyProps } from '../../types/Search';

const CompanyList: React.FC<companyProps> = (props) => {
    return (
        <div
            key={props.id}
            className='flex items-center text-lg border-b border-lightGray py-2 animate-fade-left animate-once animate-duration-500 animate-ease-linear animate-fill-forwards'
        >
            {props.logo_path && (
                <div>
                    <img
                        src={`${baseUrlImg}/w200${props.logo_path}`}
                        alt={props.name}
                        className='object-contain w-7 h-7 mr-2'
                    />
                </div>
            )}
            <div>{props.name}</div>
            {props.origin_country && (
                <div className='ml-2 bg-lightGray px-1 text-sm rounded-sm'>
                    {props.origin_country}
                </div>
            )}
        </div>
    );
};

export default CompanyList;
