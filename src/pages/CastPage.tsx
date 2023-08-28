import { useOutletContext } from 'react-router-dom';
import { OutletContextType } from '../types/movieDetailProps';
import Container from '../components/Container';

export const CastPage = () => {
    const { movieCredits }: OutletContextType = useOutletContext();
    console.log(movieCredits);

    return (
        <>
            <Container></Container>
        </>
    );
};

export default CastPage;
