import axios from "axios";
import { MovieProps } from "../types/MovieProps";

export const baseUrl = 'https://api.themoviedb.org/3/'

export const apiOptions = {
    method: 'GET',
    headers: {
        accept: 'application/json',
        Authorization: `Bearer ${import.meta.env.VITE_TMDB_AUTH}`,
    },
};

export const api = {
    movies: {
        async getTrending(): Promise<MovieProps[]> {
            const { data: { results } } = await axios.get<TrendingResponse>(`${baseUrl}trending/all/day`, apiOptions)

            return results
        }
    }
}

interface TrendingResponse {
    results: MovieProps[];
}