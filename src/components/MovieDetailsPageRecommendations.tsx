import { useContext } from 'react';
import { Context } from '../lib/context';
import { movieProps } from '../types/movieProps';
import Container from './Container';
import TabsContainer from './TabsContainer';
import { tvProps } from '../types/tvProps';

const MovieDetailsPageRecommendations: React.FC<{
    recommendations: movieProps[] | tvProps[];
}> = ({ recommendations }) => {
    const { language } = useContext(Context);

    return (
        <section>
            <Container>
                <div className='pt-4 lg:py-[30px] pl-8 lg:pl-[40px] white-shadow relative'>
                    <h2 className='text-xl font-semibold mb-5'>
                        {language === 'uk-UA' ? 'Рекомендації' : 'Recommendations'}
                    </h2>
                    {recommendations.length > 1 ? (
                        <TabsContainer movies={recommendations} />
                    ) : (
                        <div>
                            {language === 'uk-UA'
                                ? `У нас недостатньо даних, щоб запропонувати фільми, засновані на цьому фільмі.`
                                : `We don't have enough data to suggest any movies based on this film.`}
                        </div>
                    )}
                </div>
            </Container>
        </section>
    );
};

export default MovieDetailsPageRecommendations;
