import Container from '../components/Container';
import Header from '../components/Header';
import Welcome from '../components/Welcome';

export const MainPage = () => {
    return (
        <Container>
            <Header />
            <Welcome />
        </Container>
    );
};

export default MainPage;
