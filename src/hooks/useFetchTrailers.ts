import { useEffect, useState } from 'react';
import { api } from '../api/api';
import { VideoPropsResponse, SuccessVideoProps } from '../types/VideoProps';
import { MovieProps } from '../types/MovieProps';

export function useFetchVideos(movies: MovieProps[]): SuccessVideoProps[] {
    const [videos, setVideos] = useState<SuccessVideoProps[]>([]);

    useEffect(() => {
        if (movies.length > 0) {
            const moviesId = movies.map((movie) => movie.id);

            const videoPromises = moviesId.map((id: number) =>
                api.movies.getVideos(id)
            );

            Promise.allSettled(videoPromises)
                .then((data) => {
                    const successfulResults: SuccessVideoProps[] = data
                        .filter(
                            (
                                result
                            ): result is PromiseFulfilledResult<VideoPropsResponse> =>
                                result.status === 'fulfilled'
                        )
                        .map((result) => ({
                            id: result.value.id,
                            link:
                                result.value.results.find(
                                    (video) => video.name === 'Official Trailer'
                                )?.key || '',
                        }))
                        .filter((result) => result.link !== '');

                    setVideos(successfulResults);
                })
                .catch((error) =>
                    console.log('Promise.allSettled error:', error)
                );
        }
    }, [movies]);

    return videos;
}
