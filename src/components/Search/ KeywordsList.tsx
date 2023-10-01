// Types
import { keywords } from '../../types';

const KeywordsList: React.FC<keywords> = (props) => {
    return (
        <div
            className='animate-fade-left animate-once animate-duration-500 animate-ease-linear animate-fill-forwards'
            key={props.id}
        >
            {props.name}
        </div>
    );
};

export default KeywordsList;
