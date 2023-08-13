import axios from 'axios';
import { movieProps, movieResponse } from '../types/movieProps';
import { baseUrl } from '../lib/links';
import { tvProps, tvResponse } from '../types/tvProps';
import { videoPropsResponse } from '../types/videoProps';
import { movieDetailProps } from '../types/movieDetailProps';

export const apiOptions = {
    method: 'GET',
    headers: {
        accept: 'application/json',
        Authorization: `Bearer ${import.meta.env.VITE_TMDB_AUTH}`,
    },
};

export const api = {
    async getTrendingAll(language: string): Promise<movieProps[]> {
        const {
            data: { results },
        } = await axios.get<movieResponse>(
            `${baseUrl}trending/all/day?language=${language}`,
            apiOptions
        );

        return results;
    },
    movies: {
        async getTrendingMovies(
            time: string,
            language: string
        ): Promise<movieProps[]> {
            const {
                data: { results },
            } = await axios.get<movieResponse>(
                `${baseUrl}trending/movie/${time}?language=${language}`,
                apiOptions
            );
            return results;
        },

        async getVideos(
            id: number,
            language: string
        ): Promise<videoPropsResponse | null> {
            try {
                const { data } = await axios.get<videoPropsResponse>(
                    `${baseUrl}movie/${id}/videos?language=${language}&append_to_response=videos`,
                    apiOptions
                );
                return data;
            } catch (error) {
                return null;
            }
        },

        async getDetails(
            id: number,
            language: string
        ): Promise<movieDetailProps | null> {
            try {
                const { data } = await axios.get<movieDetailProps>(
                    `${baseUrl}movie/${id}?language=${language}`,
                    apiOptions
                );
                return data;
            } catch (error) {
                return null;
            }
        },
    },
    tv: {
        async getTrendingTV(
            time: string,
            language: string
        ): Promise<tvProps[]> {
            const {
                data: { results },
            } = await axios.get<tvResponse>(
                `${baseUrl}trending/tv/${time}?language=${language}`,
                apiOptions
            );
            return results;
        },
    },
};
