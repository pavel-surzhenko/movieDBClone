import { Outlet, useLocation, useParams } from 'react-router-dom';
import { useContext, useEffect, useState } from 'react';
import { movieDetailProps } from '../types/movieDetailProps';
import { api } from '../api/api';
import { Context } from '../lib/context';
import 'react-circular-progressbar/dist/styles.css';
import Spinner from '../components/Spinner';
import { movieCreditsProps } from '../types/movieCreditsProps';
import { Helmet } from 'react-helmet';
import { movieProps } from '../types/movieProps';
import React from 'react';

export const MovieDetailPage: React.FC = () => {
    const { movieId } = useParams<'movieId'>();
    const { pathname } = useLocation();
    const movieType = pathname.split('/')[1];

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
            {movieData && movieCredits ? (
                <>
                    <Helmet>
                        <title>{movieData?.title}- The Movie Data Base(TMDB)</title>
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
