import { useContext, useEffect, useState } from 'react';
import { api } from '../api/api';
import { videoPropsResponse, successVideoProps } from '../types/videoProps';
import { movieProps } from '../types/movieProps';
import { Context } from '../lib/context';

export function useFetchVideos(movies: movieProps[]): successVideoProps[] {
    const [videos, setVideos] = useState<successVideoProps[]>([]);
    const { language } = useContext(Context);

    useEffect(() => {
        if (movies.length > 0) {
            const moviesId = movies.map((movie) => movie.id);

            const videoPromises = moviesId.map((id: number) => {
                try {
                    return api.movies.getVideos(id, language);
                } catch (error) {
                    return null;
                }
            });

            Promise.allSettled(videoPromises)
                .then((data) => {
                    const successfulResults: successVideoProps[] = data
                        .filter(
                            (
                                result
                            ): result is PromiseFulfilledResult<videoPropsResponse> =>
                                result.status === 'fulfilled' &&
                                result.value !== null
                        )
                        .map((result) => ({
                            id: result.value.id,
                            link:
                                result.value.results?.find(
                                    (video) =>
                                        video.name === 'Official Trailer' ||
                                        'Міжнародний трейлер'
                                )?.key || '',
                        }))
                        .filter((result) => result.link !== '');

                    setVideos(successfulResults);
                })
                .catch((error) =>
                    console.log('Promise.allSettled error:', error)
                );
        }
    }, [movies, language]);

    return videos;
}
