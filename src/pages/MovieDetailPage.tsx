import { useParams } from 'react-router-dom';
import Container from '../components/Container';
import Header from '../components/Header';
import { useContext, useEffect, useState } from 'react';
import { movieDetailProps } from '../types/movieDetailProps';
import { api } from '../api/api';
import { Context } from '../lib/context';

export const MovieDetailPage = () => {
    const { movieId } = useParams();
    const { language } = useContext(Context);
    const cleanedMovieId = Number(movieId?.substring(1));
    const [movieData, setMovieData] = useState<movieDetailProps | null>(null);

    useEffect(() => {
        api.movies
            .getDetails(cleanedMovieId, language)
            .then((data) => setMovieData(data))
            .catch((error) => {
                console.log(error);
            });
    }, [language, cleanedMovieId]);

    console.log(movieData);

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
