// React & Libraries
import React from 'react';
import { Outlet, useLocation, useParams } from 'react-router-dom';
import { useContext, useEffect, useState } from 'react';
import { Helmet } from 'react-helmet';

// Components
import Spinner from '../components/Spinner';

// Types
import { movieCreditsProps, movieDetailProps, movieProps } from '../types/Movie';
import { tvCreditsProps, tvDetailProps, tvProps } from '../types/TV';

// Other
import { api } from '../api/api';
import { Context } from '../lib';

// CSS
import 'react-circular-progressbar/dist/styles.css';

export const MovieDetailPage: React.FC = () => {
    const { movieId } = useParams<'movieId'>();
    const { pathname } = useLocation();
    const movieType = pathname.split('/')[1];

    const { language } = useContext(Context);
    const [movieData, setMovieData] = useState<movieDetailProps | tvDetailProps | null>(null);
    const [movieCredits, setMovieCredits] = useState<movieCreditsProps | tvCreditsProps | null>(
        null
    );
    const [recommendations, setRecommendations] = useState<movieProps[] | tvProps[]>([]);

    useEffect(() => {
        if (movieType === 'movie') {
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
        } else {
            api.tv
                .getDetails(Number(movieId), language)
                .then((data) => setMovieData(data))
                .catch(() => {});
            api.tv
                .getCredits(Number(movieId), language)
                .then((data) => setMovieCredits(data))
                .catch(() => {});
            api.tv
                .getRecommendations(Number(movieId), language)
                .then((data) => setRecommendations(data))
                .catch(() => {});
        }
    }, [language, movieId, movieType]);

    const title = movieData && 'title' in movieData ? movieData.title : movieData?.name;

    return (
        <>
            {movieData && movieCredits ? (
                <>
                    <Helmet>
                        <title>{title}- The Movie Data Base(TMDB)</title>
                    </Helmet>
                    <Outlet context={{ movieData, movieCredits, recommendations }} />
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
