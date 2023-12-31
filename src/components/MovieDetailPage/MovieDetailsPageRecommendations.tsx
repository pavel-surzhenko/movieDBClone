// React & Libraries
import { useContext } from 'react';

// Components
import TabsContainer from '../TabsContainer';

// Other
import { Context } from '../../lib';

// Types
import { movieProps } from '../../types/Movie';
import { tvProps } from '../../types/TV';

const MovieDetailsPageRecommendations: React.FC<{
    recommendations: movieProps[] | tvProps[];
}> = ({ recommendations }) => {
    const { language } = useContext(Context);

    return (
        <section>
            <div className='pt-4 lg:py-[30px] pl-8 lg:pl-[40px] white-shadow relative'>
                <h2 className='text-xl font-semibold mb-5 animate-fade-right animate-once animate-duration-500'>
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
        </section>
    );
};

export default MovieDetailsPageRecommendations;
