import { useEffect, useState } from 'react';
import { api } from '../api/api';
import { TrailerProps, VideoPropsResponse } from '../types/VieoProps';
import { MovieProps } from '../types/MovieProps';

export function useFetchVideos(movies: MovieProps[]) {
    const [videos, setVideos] = useState<TrailerProps[]>([]);

    useEffect(() => {
        if (movies.length > 0) {
            const moviesId = movies.map((movie) => movie.id);

            const videoPromises = moviesId.map((id: number) =>
                api.movies.getVideos(id)
            );

            Promise.allSettled(videoPromises)
                .then((data) => {
                    const successfulResults: TrailerProps[] = data
                        .filter(
                            (
                                result
                            ): result is PromiseFulfilledResult<VideoPropsResponse> =>
                                result.status === 'fulfilled'
                        )
                        .map((result) => ({
                            id: result.value.id,
                            key:
                                result.value.results.find(
                                    (video) => video.name === 'Official Trailer'
                                )?.key || '',
                        }))
                        .filter((result) => result.key !== '');

                    setVideos(successfulResults);
                })
                .catch((error) =>
                    console.log('Promise.allSettled error:', error)
                );
        }
    }, [movies]);

    return videos;
}
