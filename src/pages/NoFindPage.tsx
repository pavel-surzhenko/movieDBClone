// React & Libraries
import { Link } from 'react-router-dom';

// Components
import Container from '../components/Container';

export const NoFindPage = () => {
    return (
        <Container>
            <div className='mx-5'>
                <h2 className='title-black pt-5'>It looks like you're lost...</h2>
                <p className='underline pt-2'>
                    <Link to='/'>Go to the home page</Link>
                </p>
            </div>
        </Container>
    );
};
