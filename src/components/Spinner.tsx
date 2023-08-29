import { RotatingLines } from 'react-loader-spinner';

const Spinner: React.FC = () => {
    return (
        <div className={`w-full  flex items-center  justify-center `}>
            <RotatingLines
                strokeColor={'#01B4E4'}
                animationDuration='1'
            />
        </div>
    );
};

export default Spinner;
