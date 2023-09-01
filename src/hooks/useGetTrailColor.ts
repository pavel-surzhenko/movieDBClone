export const useGetTrailColor = (voteAverage: number) => {
    if (voteAverage < 5) {
        return '#571435';
    } else if (voteAverage < 7) {
        return '#423d0f';
    } else {
        return '#204529';
    }
};
