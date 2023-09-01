// Types
import { loadingModelProps } from '../types/loadingModelProps';

const LoadingModel: React.FC<loadingModelProps> = ({ width, height }) => {
    return (
        <div className={`min-w-[${width}px] min-h-[${height}px] mr-5`}>
            <div className={`min-h-[193px] bg-lightBlack rounded-lg  `}></div>
            <div className='w-3/4 h-3 bg-lightBlack mt-2'></div>
            <div className='w-2/3 h-2 bg-lightBlack mt-2'></div>
        </div>
    );
};

export default LoadingModel;
