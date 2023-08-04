import axios from 'axios';
import { MovieProps, MovieResponse } from '../types/MovieProps';
import { baseUrl } from '../lib/links';
import { TVProps, TVResponse } from '../types/TVProps';

export const apiOptions = {
    method: 'GET',
    headers: {
        accept: 'application/json',
        Authorization: `Bearer ${import.meta.env.VITE_TMDB_AUTH}`,
    },
};

export const api = {
    movies: {
        async getTrendingAll(): Promise<MovieProps[]> {
            const {
                data: { results },
            } = await axios.get<MovieResponse>(
                `${baseUrl}trending/all/day`,
                apiOptions
            );

            return results;
        },
        async getTrendingMovies(
            time: string,
            language: string
        ): Promise<MovieProps[]> {
            const {
                data: { results },
            } = await axios.get<MovieResponse>(
                `${baseUrl}trending/movie/${time}?language=${language}`,
                apiOptions
            );

            return results;
        },
        async getTrendingTV(
            time: string,
            language: string
        ): Promise<TVProps[]> {
            const {
                data: { results },
            } = await axios.get<TVResponse>(
                `${baseUrl}trending/tv/${time}?language=${language}`,
                apiOptions
            );
            console.log(results);

            return results;
        },
    },
};
