import { useEffect, useState } from 'react';
import { api } from '../api/api';
import { videoProps, videoPropsResponse } from '../types/videoProps';

export const useFetchTrailer = (id: string, language: string, type: 'movie' | 'tv' = 'movie') => {
    const [trailer, setTrailer] = useState<videoProps>();

    const fetchVideo = async (): Promise<void> => {
        try {
            const response: videoPropsResponse = await (type === 'movie'
                ? api.movies.getVideos(Number(id), language)
                : api.tv.getVideos(Number(id), language));
            if (response.results.length > 0) {
                const officialTrailer =
                    response.results?.find(
                        (video) =>
                            video.name === 'Official Trailer' ||
                            video.name === 'Міжнародний трейлер' ||
                            video.type === 'Trailer'
                    ) ||
                    response.results?.find(
                        (video) =>
                            video.name.includes('Official Trailer') ||
                            video.name.includes('Міжнародний трейлер') ||
                            video.name.includes('Tрейлер')
                    );

                setTrailer(officialTrailer);
            } else {
                const response: videoPropsResponse = await (type === 'movie'
                    ? api.movies.getVideos(Number(id), 'en-US')
                    : api.tv.getVideos(Number(id), 'en-US'));

                const officialTrailer =
                    response.results?.find((video) => video.name === 'Official Trailer') ||
                    response.results?.find((video) => video.name.includes('Official Trailer')) ||
                    response.results?.find((video) => video.type.includes('Trailer'));

                setTrailer(officialTrailer);
            }
        } catch (error) {
            throw new Error(`Failed to fetch videos: ${error}`);
        }
    };

    useEffect(() => {
        fetchVideo();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [id, language]);

    return trailer;
};
