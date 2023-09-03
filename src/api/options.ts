export const apiOptions = {
    method: 'GET',
    headers: {
        accept: 'application/json',
        Authorization: `Bearer ${import.meta.env.VITE_TMDB_AUTH}`,
    },
};
export const optionsList = {
    movie: {
        popular: 'popular',
        now_playing: 'now_playing',
        top_rated: 'top_rated',
        upcoming: 'upcoming',
    },
    tv: {
        popular: 'popular',
        now_playing: 'airing_today',
        top_rated: 'top_rated',
        upcoming: 'on_the_air',
    },
};
