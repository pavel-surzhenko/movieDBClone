import Container from '../components/Container';
import Header from '../components/Header';
import Trending from '../components/Trending';
import Welcome from '../components/Welcome';

export const MainPage = () => {
    return (
        <>
            <Header />
            <Container>
                <Welcome />
                <Trending />
            </Container>
        </>
    );
};

export default MainPage;
