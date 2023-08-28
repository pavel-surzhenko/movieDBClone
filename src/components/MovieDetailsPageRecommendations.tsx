import { useContext } from 'react';
import { Context } from '../lib/context';
import { movieProps } from '../types/movieProps';
import Container from './Container';
import TabsContainer from './TabsContainer';

export const MovieDetailsPageRecommendations: React.FC<{ recommendations: movieProps[] }> = ({
    recommendations,
}) => {
    const { language } = useContext(Context);

    return (
        <section>
            <Container>
                <div className='pt-4 lg:py-[30px] pl-8 lg:pl-[40px] white-shadow relative'>
                    <h2 className='text-xl font-semibold mb-5'>
                        {language === 'uk-UA' ? 'Рекомендації' : 'Recommendations'}
                    </h2>
                    <TabsContainer movies={recommendations} />
                </div>
            </Container>
        </section>
    );
};

export default MovieDetailsPageRecommendations;
