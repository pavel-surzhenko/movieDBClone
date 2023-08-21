import { loadingModelProps } from '../types/loadingModelProps';

export const LoadingModel: React.FC<loadingModelProps> = ({
    width,
    height,
}) => {
    return (
        <div className={`min-w-[${width}px] min-h-[${height}px] mr-5`}>
            <div className='min-h-[225px] bg-lightBlack rounded-lg'></div>
            <div className='w-3/4 h-4 bg-lightBlack mt-6'></div>
            <div className='w-2/3 h-4 bg-lightBlack mt-2'></div>
        </div>
    );
};

export default LoadingModel;
