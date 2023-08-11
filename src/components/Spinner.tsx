import { RotatingLines } from 'react-loader-spinner';

export const Spinner = () => {
    return (
        <div className='w-full h-full flex items-center justify-center'>
            <RotatingLines
                strokeColor={'#01B4E4'}
                animationDuration='1'
            />
        </div>
    );
};

export default Spinner;
