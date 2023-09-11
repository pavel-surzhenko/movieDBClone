// React & Libraries
import { useParams } from 'react-router-dom';

export const PeopleDetailPage = () => {
    const { peopleId } = useParams<'peopleId'>();

    console.log(peopleId);

    return <></>;
};
