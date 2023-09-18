// React & Libraries
import { useEffect, useState, useContext } from 'react';
import { Helmet } from 'react-helmet';
import { useParams } from 'react-router-dom';

// Components
import Container from '../components/Container';

// Other
import { api } from '../api/api';
import { Context } from '../lib';

// Types
import { peopleDetailsProps } from '../types/People/peopleDetailsProps';
import PeopleDetailHeader from '../components/PeopleDetailPage/PeopleDetailHeader';

export const PeopleDetailPage = () => {
    const { peopleId } = useParams<'peopleId'>();
    const [personData, setPersonData] = useState<peopleDetailsProps | null>(null);
    const { language } = useContext(Context);

    useEffect(() => {
        api.people.getPerson(Number(peopleId), language).then((data) => setPersonData(data));
    }, [language, peopleId]);

    return (
        <>
            {personData && (
                <Helmet>
                    <title>{personData?.name} - The Movie Data Base(TMDB)</title>
                </Helmet>
            )}
            <Container>
                <PeopleDetailHeader personData={personData} />
            </Container>
        </>
    );
};
