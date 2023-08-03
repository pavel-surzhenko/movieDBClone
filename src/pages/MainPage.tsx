import Container from '../components/Container';
import Header from '../components/Header';
import Welcome from '../components/Welcome';

export const MainPage = () => {
    return (
        <>
            <Header />
            <Container>
                <Welcome />
            </Container>
        </>
    );
};

export default MainPage;
