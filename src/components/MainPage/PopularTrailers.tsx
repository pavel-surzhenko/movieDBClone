// React & Libraries
import React, { Suspense, useContext, useEffect, useState } from 'react';
import Modal from 'react-modal';

// Components
import ModalTrailer from '../Trailer/ModalTrailer';
import Spinner from '../Spinner';

// Other
import { Context, baseUrlImg } from '../../lib';

// Lazy
const TrailerCard = React.lazy(() => import('../Trailer/TrailerCard'));

const PopularTrailers = () => {
    const { language, movies } = useContext(Context);
    const [backImg, setBackImg] = useState<string>('');

    const [showModal, setShowModal] = useState<boolean>(false);
    const [trailerId, setTrailerId] = useState<string>('');

    const handleClickOpen = (id: string) => {
        setShowModal(true);
        setTrailerId(id);
    };

    const handleClickClose = () => {
        setShowModal(false);
    };

    const handleHover = (id: string) => {
        setBackImg(id);
    };

    useEffect(() => {
        if (movies.length > 0) {
            setBackImg(movies[0]?.backdrop_path || '');
        }
    }, [movies]);

    return (
        <section
            className={`pt-[30px] pl-5 relative white-shadow bg-blend-multiply`}
            style={{
                background: backImg
                    ? `center / cover no-repeat linear-gradient(to right, rgba(3, 37, 65, 0.8) 0%, rgba(3, 37, 65, 0.5) 100%), url(${baseUrlImg}/w1280${backImg}) center / cover  no-repeat `
                    : `center / cover no-repeat linear-gradient(to right, rgba(3, 37, 65, 0.8) 0%, rgba(3, 37, 65, 0.5) 100%)`,
            }}
        >
            <div className='flex'>
                <h3 className='title-white'>
                    {language === 'en-US' ? 'Popular trailers' : 'Популярні трейлери'}
                </h3>
            </div>
            <div className='relative flex flex-col break-words w-full pt-5 mb-5 '>
                <div className='flex flex-nowrap overflow-x-auto snap-x -mb-4 min-h-[240px]'>
                    {movies
                        .filter((movie) => movie.media_type === 'movie')
                        .map((movie) => (
                            <Suspense
                                fallback={
                                    <div className='min-w-[300px]'>
                                        <Spinner />
                                    </div>
                                }
                                key={movie.id}
                            >
                                <TrailerCard
                                    movieDetails={movie}
                                    handleHover={handleHover}
                                    handleClick={handleClickOpen}
                                />
                            </Suspense>
                        ))}
                </div>
            </div>
            <Modal
                isOpen={showModal}
                ariaHideApp={false}
                style={{
                    overlay: {
                        backgroundColor: 'rgba(0,0,0, 0.5)',
                    },
                    content: {
                        background: '#0d253f',
                        position: 'absolute',
                        top: '10%',
                        left: '10%',
                        right: '10%',
                        bottom: '10%',
                        border: 'transparent',
                        padding: '0px',
                        aspectRatio: 16 / 9,
                    },
                }}
            >
                <ModalTrailer
                    trailerId={trailerId}
                    closeModal={handleClickClose}
                />
            </Modal>
        </section>
    );
};

export default PopularTrailers;
