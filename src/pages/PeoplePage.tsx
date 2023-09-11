import { Helmet } from 'react-helmet';
import Container from '../components/Container';

export const PeoplePage = () => {
    return (
        <>
            <Helmet>
                <title>People - The Movie Data Base (TMDB)</title>
            </Helmet>
            <Container>People</Container>
        </>
    );
};
