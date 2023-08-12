import { useParams } from 'react-router-dom';
import Container from '../components/Container';
import Header from '../components/Header';

export const MovieDetailPage = () => {
    const { movieId } = useParams();
    const cleanedMovieId = movieId?.substring(1);

    return (
        <>
            <Header />
            <Container>
                <p>Details</p>
            </Container>
        </>
    );
};

export default MovieDetailPage;
