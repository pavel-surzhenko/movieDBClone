import { useContext, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { api } from '../api/api';
import { Context } from '../lib/context';
import { collectionProps } from '../types/collectionProps';

const MovieCollection = () => {
    const { id } = useParams();
    const { language } = useContext(Context);
    const [collection, setCollection] = useState<collectionProps>();
    console.log(collection);

    useEffect(() => {
        api.movies.getCollection(Number(id), language).then((data) => setCollection(data));
    }, [id, language]);

    return <section>Movie collection</section>;
};

export default MovieCollection;
