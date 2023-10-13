// React & Libraries
import axios, { AxiosResponse } from 'axios';

// Other
import { baseUrl } from '../lib';
import { apiOptions } from './options';

// Types
import {
    videoPropsResponse,
    keywordsProps,
    typeOfLists,
    linksProps,
    tokenResponse,
    loginResponse,
    detailsResponse,
    companyResponseProps,
    keywordsResponseProps,
    listsResponse,
} from '../types';
import {
    movieProps,
    movieDetailProps,
    movieCreditsProps,
    movieProvidersProps,
    collectionProps,
    movieResponseProps,
    genres,
    movieAllDetailsProps,
} from '../types/Movie';
import {
    tvProps,
    tvDetailProps,
    tvSeasonDetailProps,
    tvResponseProps,
    tvAllDetailsProps,
} from '../types/TV';
import { peopleResponseProps } from '../types/People/peopleResponseProps';
import { peopleDetailsProps } from '../types/People/peopleDetailsProps';

export const api = {
    async getToken(): Promise<AxiosResponse<tokenResponse>> {
        try {
            const response: AxiosResponse<tokenResponse> = await axios.get<tokenResponse>(
                `${baseUrl}authentication/token/new`,
                apiOptions
            );
            return response;
        } catch (error) {
            throw new Error(`Failed to get token: ${error}`);
        }
    },

    async login(request_token: string): Promise<loginResponse> {
        const body = { request_token: request_token };
        try {
            const { data } = await axios.post<loginResponse>(
                `${baseUrl}authentication/session/new`,
                body,
                {
                    headers: {
                        accept: 'application/json',
                        Authorization: `Bearer ${import.meta.env.VITE_TMDB_AUTH}`,
                    },
                }
            );

            return data;
        } catch (error) {
            throw new Error(`Failed to get token: ${error}`);
        }
    },

    async getDetails(sessionId: string): Promise<detailsResponse> {
        try {
            const { data } = await axios.get<detailsResponse>(
                `${baseUrl}account?api_key=${
                    import.meta.env.VITE_TMDB_KEY
                }&session_id=${sessionId}&append_to_response=favorite/tv`,
                apiOptions
            );

            return data;
        } catch (error) {
            throw new Error(`Failed to get details: ${error}`);
        }
    },

    async getLists(
        userId: number,
        sessionId: string,
        language: string,
        page: number
    ): Promise<listsResponse> {
        try {
            const { data } = await axios.get<listsResponse>(
                `${baseUrl}account/${userId}?language=${language}&session_id=${sessionId}&page=${page}&append_to_response=favorite/movies,favorite/tv,watchlist/movies,watchlist/tv`,
                apiOptions
            );

            return data;
        } catch (error) {
            throw new Error(`Failed to get lists: ${error}`);
        }
    },

    async getTrendingAll(language: string): Promise<movieProps[]> {
        try {
            const {
                data: { results },
            } = await axios.get<movieResponseProps>(
                `${baseUrl}trending/all/day?language=${language}`,
                apiOptions
            );

            return results;
        } catch (error) {
            throw new Error(`Failed to fetch trending all: ${error}`);
        }
    },

    async getGenres(type: 'movie' | 'tv', language: string): Promise<genres[]> {
        try {
            const { data } = await axios.get<{ genres: genres[] }>(
                `${baseUrl}genre/${type}/list?language=${language}`,
                apiOptions
            );

            return data.genres;
        } catch (error) {
            throw new Error(`Failed to fetch genres of ${type}: ${error}`);
        }
    },

    async getSearch(
        currentType: string | undefined,
        type: string | undefined,
        query: string | null,
        language: string,
        page: number
    ): Promise<
        | movieResponseProps
        | tvResponseProps
        | peopleResponseProps
        | companyResponseProps
        | keywordsResponseProps
    > {
        try {
            if (currentType === type) {
                const { data } = await axios.get<
                    | movieResponseProps
                    | tvResponseProps
                    | peopleResponseProps
                    | companyResponseProps
                    | keywordsResponseProps
                >(
                    `${baseUrl}search/${type}?query=${query}&include_adult=true&language=${language}&page=${page}`,
                    apiOptions
                );

                return data;
            } else {
                const { data } = await axios.get<
                    | movieResponseProps
                    | tvResponseProps
                    | peopleResponseProps
                    | companyResponseProps
                    | keywordsResponseProps
                >(
                    `${baseUrl}search/${type}?query=${query}&include_adult=true&language=${language}&page=${1}`,
                    apiOptions
                );

                return data;
            }
        } catch (error) {
            throw new Error(`Failed to fetch search: ${error}`);
        }
    },
    movies: {
        async getTrending(time: string, language: string): Promise<movieProps[]> {
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

        async getPopular(page: number, language: string): Promise<movieProps[]> {
            try {
                const {
                    data: { results },
                } = await axios.get<movieResponseProps>(
                    `${baseUrl}movie/popular?language=${language}&page=${page}`,
                    apiOptions
                );
                return results;
            } catch (error) {
                throw new Error(`Failed to fetch popular movies: ${error}`);
            }
        },

        async getListsMovie(
            lists: typeOfLists,
            language: string,
            page: number,
            genre: number
        ): Promise<movieResponseProps> {
            const baseUrlWithParams = `${baseUrl}movie/${lists}?language=${language}&page=${page}${
                genre > 0 ? `&with_genres=${genre}` : ''
            }`;

            try {
                const { data } = await axios.get<movieResponseProps>(baseUrlWithParams, apiOptions);
                return data;
            } catch (error) {
                throw new Error(`Failed to fetch movie list: ${error}`);
            }
        },

        async getAllDetails(id: number, language: string): Promise<movieAllDetailsProps> {
            try {
                const { data } = await axios.get<movieAllDetailsProps>(
                    `${baseUrl}movie/${id}?language=${language}&append_to_response=credits,recommendations,watch/providers,keywords,external_ids,account_states`,
                    apiOptions
                );

                return data;
            } catch (error) {
                throw new Error(`Failed to fetch movie details: ${error}`);
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

        async getLinks(id: number): Promise<linksProps> {
            try {
                const { data } = await axios.get<linksProps>(
                    `${baseUrl}movie/${id}/external_ids`,
                    apiOptions
                );
                return data;
            } catch (error) {
                throw new Error(`Failed to fetch links: ${error}`);
            }
        },

        async getKeyWords(id: number): Promise<keywordsProps> {
            try {
                const { data } = await axios.get<keywordsProps>(
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
        async getAllDetails(id: number, language: string): Promise<tvAllDetailsProps> {
            try {
                const { data } = await axios.get<tvAllDetailsProps>(
                    `${baseUrl}tv/${id}?language=${language}&append_to_response=credits,recommendations,watch/providers,keywords,external_ids,account_states`,
                    apiOptions
                );

                return data;
            } catch (error) {
                throw new Error(`Failed to fetch tv details: ${error}`);
            }
        },

        async getCredits(id: number, language: string): Promise<movieCreditsProps> {
            try {
                const { data } = await axios.get<movieCreditsProps>(
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
        async getListsTV(
            lists: typeOfLists,
            language: string,
            page: number,
            genre: number
        ): Promise<tvResponseProps> {
            const baseUrlWithParams = `${baseUrl}tv/${lists}?language=${language}&page=${page}${
                genre > 0 ? `&with_genres=${genre}` : ''
            }`;

            try {
                const { data } = await axios.get<tvResponseProps>(baseUrlWithParams, apiOptions);
                return data;
            } catch (error) {
                throw new Error(`Failed to fetch tv list: ${error}`);
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

        async getLinks(id: number): Promise<linksProps> {
            try {
                const { data } = await axios.get<linksProps>(
                    `${baseUrl}tv/${id}/external_ids`,
                    apiOptions
                );
                return data;
            } catch (error) {
                throw new Error(`Failed to fetch links: ${error}`);
            }
        },

        async getKeyWords(id: number): Promise<keywordsProps> {
            try {
                const { data } = await axios.get<keywordsProps>(
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

        async getPopular(page: number, language: string): Promise<movieProps[]> {
            try {
                const {
                    data: { results },
                } = await axios.get<movieResponseProps>(
                    `${baseUrl}tv/popular?language=${language}&page=${page}`,
                    apiOptions
                );
                return results;
            } catch (error) {
                throw new Error(`Failed to fetch popular tv: ${error}`);
            }
        },
    },
    people: {
        async getPopular(language: string, page: number): Promise<peopleResponseProps> {
            try {
                const { data } = await axios.get<peopleResponseProps>(
                    `${baseUrl}person/popular?language=${language}&page=${page}`,
                    apiOptions
                );
                return data;
            } catch (error) {
                throw new Error(`Failed to fetch people list: ${error}`);
            }
        },

        async getPerson(id: number, language: string): Promise<peopleDetailsProps> {
            try {
                const { data } = await axios.get<peopleDetailsProps>(
                    `${baseUrl}person/${id}?language=${language}&append_to_response=combined_credits`,
                    apiOptions
                );
                return data;
            } catch (error) {
                throw new Error(`Failed to fetch person details: ${error}`);
            }
        },
    },
};
