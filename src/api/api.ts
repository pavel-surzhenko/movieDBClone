// React & Libraries
import axios from 'axios';

// Other
import { baseUrl } from '../lib';
import { apiOptions } from './options';

// Types
import { videoPropsResponse, keyWordsProps } from '../types';
import {
    movieProps,
    movieDetailProps,
    movieCreditsProps,
    movieProvidersProps,
    collectionProps,
    movieResponseProps,
} from '../types/Movie';
import {
    tvLinksProps,
    tvProps,
    tvDetailProps,
    tvCreditsProps,
    tvSeasonDetailProps,
    tvResponseProps,
} from '../types/TV';

export const api = {
    async getTrendingAll(language: string): Promise<movieProps[]> {
        const {
            data: { results },
        } = await axios.get<movieResponseProps>(
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
                } = await axios.get<movieResponseProps>(
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
                } = await axios.get<movieResponseProps>(
                    `${baseUrl}movie/${id}/recommendations?language=${language}`,
                    apiOptions
                );

                return results;
            } catch (error) {
                throw new Error(`Failed to fetch movie recommendations: ${error}`);
            }
        },

        async getLinks(id: number): Promise<tvLinksProps> {
            try {
                const { data } = await axios.get<tvLinksProps>(
                    `${baseUrl}movie/${id}/external_ids`,
                    apiOptions
                );
                return data;
            } catch (error) {
                throw new Error(`Failed to fetch links: ${error}`);
            }
        },

        async getKeyWords(id: number): Promise<keyWordsProps> {
            try {
                const { data } = await axios.get<keyWordsProps>(
                    `${baseUrl}movie/${id}/keywords`,
                    apiOptions
                );
                return data;
            } catch (error) {
                throw new Error(`Failed to fetch keywords: ${error}`);
            }
        },

        async getCollection(id: number, language: string): Promise<collectionProps> {
            try {
                const { data } = await axios.get<collectionProps>(
                    `${baseUrl}collection/${id}?language=${language}`,
                    apiOptions
                );
                return data;
            } catch (error) {
                throw new Error(`Failed to fetch collection: ${error}`);
            }
        },
    },
    tv: {
        async getTrendingTV(time: string, language: string): Promise<tvProps[]> {
            try {
                const {
                    data: { results },
                } = await axios.get<tvResponseProps>(
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
                } = await axios.get<tvResponseProps>(
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
                    `${baseUrl}tv/${id}/videos?language=${language}&append_to_response=videos`,
                    apiOptions
                );
                return data;
            } catch (error) {
                throw new Error(`Failed to fetch tv videos: ${error}`);
            }
        },

        async getLinks(id: number): Promise<tvLinksProps> {
            try {
                const { data } = await axios.get<tvLinksProps>(
                    `${baseUrl}tv/${id}/external_ids`,
                    apiOptions
                );
                return data;
            } catch (error) {
                throw new Error(`Failed to fetch links: ${error}`);
            }
        },

        async getKeyWords(id: number): Promise<keyWordsProps> {
            try {
                const { data } = await axios.get<keyWordsProps>(
                    `${baseUrl}tv/${id}/keywords`,
                    apiOptions
                );
                return data;
            } catch (error) {
                throw new Error(`Failed to fetch keywords: ${error}`);
            }
        },

        async getSeasonsDetail(
            id: number,
            seasonNumber: number,
            language: string
        ): Promise<tvSeasonDetailProps> {
            try {
                const { data } = await axios.get<tvSeasonDetailProps>(
                    `${baseUrl}tv/${id}/season/${seasonNumber}?language=${language}`,
                    apiOptions
                );
                return data;
            } catch (error) {
                throw new Error(`Failed to fetch season detail: ${error}`);
            }
        },
    },
};
