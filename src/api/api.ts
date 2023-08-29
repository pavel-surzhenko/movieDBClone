import axios from 'axios';
import { movieProps, movieResponse } from '../types/movieProps';
import { baseUrl } from '../lib/links';
import { tvProps, tvResponse } from '../types/tvProps';
import { videoPropsResponse } from '../types/videoProps';
import { movieDetailProps } from '../types/movieDetailProps';
import { movieCreditsProps } from '../types/movieCreditsProps';
import { movieProvidersProps } from '../types/movieProvidersProps';
import { tvDetailProps } from '../types/tvDetailProps';
import { tvCreditsProps } from '../types/tvCreditsProps';

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
        async getTrendingMovies(time: string, language: string): Promise<movieProps[]> {
            try {
                const {
                    data: { results },
                } = await axios.get<movieResponse>(
                    `${baseUrl}trending/movie/${time}?language=${language}`,
                    apiOptions
                );
                return results;
            } catch (error) {
                throw new Error(`Failed to fetch movie trending: ${error}`);
            }
        },

        async getVideos(id: number, language: string): Promise<videoPropsResponse> {
            try {
                const { data } = await axios.get<videoPropsResponse>(
                    `${baseUrl}movie/${id}/videos?language=${language}&append_to_response=videos`,
                    apiOptions
                );
                return data;
            } catch (error) {
                throw new Error(`Failed to fetch movie videos: ${error}`);
            }
        },

        async getDetails(id: number, language: string): Promise<movieDetailProps> {
            try {
                const { data } = await axios.get<movieDetailProps>(
                    `${baseUrl}movie/${id}?language=${language}`,
                    apiOptions
                );
                return data;
            } catch (error) {
                throw new Error(`Failed to fetch movie details: ${error}`);
            }
        },

        async getCredits(id: number, language: string): Promise<movieCreditsProps> {
            try {
                const { data } = await axios.get<movieCreditsProps>(
                    `${baseUrl}movie/${id}/credits?language=${language}`,
                    apiOptions
                );
                return data;
            } catch (error) {
                throw new Error(`Failed to fetch movie credits: ${error}`);
            }
        },

        async getProvider(id: number): Promise<movieProvidersProps> {
            try {
                const { data } = await axios.get<movieProvidersProps>(
                    `${baseUrl}movie/${id}/watch/providers?locale='US'`,
                    apiOptions
                );
                return data;
            } catch (error) {
                throw new Error(`Failed to fetch movie provider: ${error}`);
            }
        },

        async getRecommendations(id: number, language: string): Promise<movieProps[]> {
            try {
                const {
                    data: { results },
                } = await axios.get<movieResponse>(
                    `${baseUrl}movie/${id}/recommendations?language=${language}`,
                    apiOptions
                );

                return results;
            } catch (error) {
                throw new Error(`Failed to fetch movie recommendations: ${error}`);
            }
        },
    },
    tv: {
        async getTrendingTV(time: string, language: string): Promise<tvProps[]> {
            try {
                const {
                    data: { results },
                } = await axios.get<tvResponse>(
                    `${baseUrl}trending/tv/${time}?language=${language}`,
                    apiOptions
                );
                return results;
            } catch (error) {
                throw new Error(`Failed to fetch tv trending: ${error}`);
            }
        },

        async getDetails(id: number, language: string): Promise<tvDetailProps> {
            try {
                const { data } = await axios.get<tvDetailProps>(
                    `${baseUrl}tv/${id}?language=${language}`,
                    apiOptions
                );
                return data;
            } catch (error) {
                throw new Error(`Failed to fetch tv details: ${error}`);
            }
        },

        async getCredits(id: number, language: string): Promise<tvCreditsProps> {
            try {
                const { data } = await axios.get<tvCreditsProps>(
                    `${baseUrl}tv/${id}/credits?language=${language}`,
                    apiOptions
                );
                return data;
            } catch (error) {
                throw new Error(`Failed to fetch tv credits: ${error}`);
            }
        },

        async getRecommendations(id: number, language: string): Promise<tvProps[]> {
            try {
                const {
                    data: { results },
                } = await axios.get<tvResponse>(
                    `${baseUrl}tv/${id}/recommendations?language=${language}`,
                    apiOptions
                );

                return results;
            } catch (error) {
                throw new Error(`Failed to fetch tv recommendations: ${error}`);
            }
        },

        async getProvider(id: number): Promise<movieProvidersProps> {
            try {
                const { data } = await axios.get<movieProvidersProps>(
                    `${baseUrl}tv/${id}/watch/providers?locale='US'`,
                    apiOptions
                );
                return data;
            } catch (error) {
                throw new Error(`Failed to fetch tv providers: ${error}`);
            }
        },

        async getVideos(id: number, language: string): Promise<videoPropsResponse> {
            try {
                const { data } = await axios.get<videoPropsResponse>(
                    `${baseUrl}movie/${id}/videos?language=${language}&append_to_response=videos`,
                    apiOptions
                );
                return data;
            } catch (error) {
                throw new Error(`Failed to fetch tv videos: ${error}`);
            }
        },
    },
};
