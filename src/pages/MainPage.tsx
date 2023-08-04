import Container from '../components/Container';
import Header from '../components/Header';
import TrendingMovies from '../components/TrendingMovies';
import TrendingTV from '../components/TrendingTV';
import Welcome from '../components/Welcome';

export const MainPage = () => {
    return (
        <>
            <Header />
            <Container>
                <Welcome />
                <TrendingMovies />
                <TrendingTV />
            </Container>
        </>
    );
};

export default MainPage;
