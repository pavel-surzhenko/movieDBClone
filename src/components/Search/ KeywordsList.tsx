// Types
import { keywords } from '../../types';

const KeywordsList: React.FC<keywords> = (props) => {
    return <div key={props.id}>{props.name}</div>;
};

export default KeywordsList;
