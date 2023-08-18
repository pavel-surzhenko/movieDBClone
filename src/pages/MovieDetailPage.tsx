import { useParams } from 'react-router-dom';
import Container from '../components/Container';
import Header from '../components/Header';
import { useContext, useEffect, useState } from 'react';
import { movieDetailProps } from '../types/movieDetailProps';
import { api } from '../api/api';
import { Context } from '../lib/context';
import 'react-circular-progressbar/dist/styles.css';
import Spinner from '../components/Spinner';
import MovieDetailsPageHeader from '../components/MovieDetailsPageHeader';
import { movieCreditsProps } from '../types/movieCreditsProps';
import MovieDetailsPageCast from '../components/MovieDetailsPageCast';

export const MovieDetailPage: React.FC = () => {
    const { movieId } = useParams();
    const { language } = useContext(Context);
    const [movieData, setMovieData] = useState<movieDetailProps | null>(null);
    const [movieCredits, setMovieCredits] = useState<movieCreditsProps | null>(
        null
    );

    useEffect(() => {
        api.movies
            .getDetails(Number(movieId), language)
            .then((data) => setMovieData(data))
            .catch((error) => {});
        api.movies
            .getCredits(Number(movieId), language)
            .then((data) => setMovieCredits(data))
            .catch((error) => {});
    }, [language, movieId]);

    return (
        <>
            <Header />

            {movieData && movieCredits ? (
                <>
                    <MovieDetailsPageHeader
                        movieDetails={movieData}
                        movieCredits={movieCredits}
                    />
                    <div>
                        <MovieDetailsPageCast {...movieCredits} />
                    </div>
                </>
            ) : (
                <div className='absolute top-1/2 right-1/2 translate-x-1/2'>
                    <Spinner />
                </div>
            )}
        </>
    );
};

export default MovieDetailPage;
