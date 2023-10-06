// React & Libraries
import React from 'react';
import { Outlet, useLocation, useParams } from 'react-router-dom';
import { useContext, useEffect, useState } from 'react';
import { Helmet } from 'react-helmet';

// Components
import Spinner from '../components/Spinner';

// Types
import {
    movieCreditsProps,
    movieDetailProps,
    movieProps,
    movieProvidersProps,
} from '../types/Movie';
import { tvDetailProps, tvProps } from '../types/TV';
import { keywordsProps, linksProps } from '../types';

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
    const [movieCredits, setMovieCredits] = useState<movieCreditsProps | null>(null);
    const [recommendations, setRecommendations] = useState<movieProps[] | tvProps[]>([]);
    const [watchProviders, setWatchProviders] = useState<movieProvidersProps | null>(null);
    const [keywords, setKeywords] = useState<keywordsProps | null>(null);
    const [links, setLinks] = useState<linksProps | null>(null);

    useEffect(() => {
        if (movieType === 'movie') {
            api.movies.getAllDetails(Number(movieId), language).then((data) => {
                setMovieData(data);
                setMovieCredits(data.credits);
                setRecommendations(data.recommendations.results);
                setWatchProviders(data['watch/providers']);
                setKeywords(data.keywords);
                setLinks(data.external_ids);
            });
        } else {
            api.tv.getAllDetails(Number(movieId), language).then((data) => {
                setMovieData(data);
                setMovieCredits(data.credits);
                setRecommendations(data.recommendations.results);
                setWatchProviders(data['watch/providers']);
                setKeywords(data.keywords);
                setLinks(data.external_ids);
            });
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
                    <Outlet
                        context={{
                            movieData,
                            movieCredits,
                            recommendations,
                            watchProviders,
                            keywords,
                            links,
                        }}
                    />
                </>
            ) : (
                <div className='absolute top-1/2 right-1/2 translate-x-1/2'>
                    <Spinner />
                </div>
            )}
        </>
    );
};
