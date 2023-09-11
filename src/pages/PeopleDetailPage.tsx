// React & Libraries
import { useEffect, useState, useContext } from 'react';
import { Helmet } from 'react-helmet';
import { useParams } from 'react-router-dom';

// Other
import { api } from '../api/api';
import { Context, baseUrlImg } from '../lib';

// Types
import { peopleDetailsProps } from '../types/People/peopleDetailsProps';
import Container from '../components/Container';

export const PeopleDetailPage = () => {
    const { peopleId } = useParams<'peopleId'>();
    const [personData, setPersonData] = useState<peopleDetailsProps | null>(null);
    const { language } = useContext(Context);

    useEffect(() => {
        api.people.getPerson(Number(peopleId), language).then((data) => setPersonData(data));
    }, [language, peopleId]);

    const paragraphs = personData?.biography ? (
        personData.biography.split('\n').map((paragraph, index) => (
            <p
                className='mb-5'
                key={index}
            >
                {paragraph}
            </p>
        ))
    ) : (
        <p>
            {language === 'uk-UA'
                ? 'Вибачте, немає достатньо інформації українською'
                : 'Sorry, not enough information'}
        </p>
    );

    console.log(paragraphs);

    return (
        <>
            {personData && (
                <Helmet>
                    <title>{personData?.name} - The Movie Data Base(TMDB)</title>
                </Helmet>
            )}
            <Container>
                <section className='mt-5 flex'>
                    <div className='min-w-[300px] w-[300px] rounded-md overflow-hidden mr-10'>
                        <img
                            src={
                                personData?.profile_path
                                    ? `${baseUrlImg}/w1280${personData?.profile_path}`
                                    : ``
                            }
                            alt={personData?.name}
                            className='w-full object-contain'
                        />
                    </div>
                    <div>
                        <h1 className='text-3xl font-bold mb-5'>{personData?.name}</h1>
                        <div>
                            <h3 className='text-xl font-semibold mb-2'>
                                {language === 'uk-UA' ? 'Біографія' : 'Biography'}
                            </h3>
                            <div>{paragraphs}</div>
                        </div>
                    </div>
                </section>
            </Container>
        </>
    );
};
