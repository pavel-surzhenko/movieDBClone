export const getCircleColor = (voteAverage: number) => {
    if (voteAverage < 5) {
        return '#db2360';
    } else if (voteAverage < 7) {
        return '#d2d531';
    } else {
        return '#21d07a';
    }
};
