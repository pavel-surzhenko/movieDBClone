// React & Libraries
import { Link } from 'react-router-dom';

// Components
import Container from '../components/Container';

export const ErrorPage = () => {
    return (
        <Container>
            <h2 className='title-black pt-5'>Oops, something went wrong ...</h2>
            <p className='underline pt-2'>
                <Link to='/'>Go to the home page</Link>
            </p>
        </Container>
    );
};
