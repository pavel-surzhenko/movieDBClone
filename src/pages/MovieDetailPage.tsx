import { useParams } from 'react-router-dom';
import Header from '../components/Header';
import { Suspense, useContext, useEffect, useState } from 'react';
import { movieDetailProps } from '../types/movieDetailProps';
import { api } from '../api/api';
import { Context } from '../lib/context';
import 'react-circular-progressbar/dist/styles.css';
import Spinner from '../components/Spinner';
import { movieCreditsProps } from '../types/movieCreditsProps';
import { Helmet } from 'react-helmet';
import { movieProps } from '../types/movieProps';
import React from 'react';
import Footer from '../components/Footer';

const MovieDetailsPageHeader = React.lazy(() => import('../components/MovieDetailsPageHeader'));
const MovieDetailsPageCast = React.lazy(() => import('../components/MovieDetailsPageCast'));
const MovieDetailsPageRecommendations = React.lazy(
    () => import('../components/MovieDetailsPageRecommendations')
);

export const MovieDetailPage: React.FC = () => {
    const { movieId } = useParams();
    const { language } = useContext(Context);
    const [movieData, setMovieData] = useState<movieDetailProps | null>(null);
    const [movieCredits, setMovieCredits] = useState<movieCreditsProps | null>(null);
    const [recommendations, setRecommendations] = useState<movieProps[]>([]);

    useEffect(() => {
        api.movies
            .getDetails(Number(movieId), language)
            .then((data) => setMovieData(data))
            .catch(() => {});
        api.movies
            .getCredits(Number(movieId), language)
            .then((data) => setMovieCredits(data))
            .catch(() => {});
        api.movies
            .getRecommendations(Number(movieId), language)
            .then((data) => setRecommendations(data))
            .catch(() => {});
    }, [language, movieId]);

    return (
        <>
            <Header />

            {movieData && movieCredits ? (
                <>
                    <Helmet>
                        <title>{movieData?.title}- The Movie Data Base(TMDB)</title>
                    </Helmet>
                    <Suspense>
                        <MovieDetailsPageHeader
                            movieDetails={movieData}
                            movieCredits={movieCredits}
                        />
                        <div>
                            <MovieDetailsPageCast {...movieCredits} />
                            <MovieDetailsPageRecommendations recommendations={recommendations} />
                        </div>
                    </Suspense>
                </>
            ) : (
                <div className='absolute top-1/2 right-1/2 translate-x-1/2'>
                    <Spinner />
                </div>
            )}
            <Footer />
        </>
    );
};

export default MovieDetailPage;
