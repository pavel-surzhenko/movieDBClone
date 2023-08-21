import React, { Suspense, useContext, useEffect, useState } from 'react';
import { Context } from '../lib/context';
import { useFetchVideos } from '../hooks/useFetchTrailers';
import { baseUrlImg } from '../lib/links';
import Modal from 'react-modal';
import ModalTrailer from './ModalTrailer';
import Spinner from './Spinner';

const TrailerCard = React.lazy(() => import('./TrailerCard'));

export const PopularTrailers = () => {
    const { language, movies } = useContext(Context);
    const [backImg, setBackImg] = useState<string>('');
    const trailers = useFetchVideos(movies);

    const [showModal, setShowModal] = useState<boolean>(false);
    const [showTrailerLink, setShowTrailerLink] = useState<string>('');

    const handleClickOpen = (link: string) => {
        setShowModal(true);
        setShowTrailerLink(link);
    };

    const handleClickClose = () => {
        setShowModal(false);
    };

    const handleHover = (id: string) => {
        setBackImg(id);
    };

    useEffect(() => {
        if (movies.length > 0) {
            setBackImg(movies[0]?.backdrop_path);
        }
    }, [movies]);

    return (
        <section
            className={`pt-[30px] pl-5 relative white-shadow`}
            style={{
                background: backImg
                    ? `center / cover no-repeat linear-gradient(to right, rgba(3, 37, 65, 0.8) 0%, rgba(3, 37, 65, 0.5) 100%), url(${baseUrlImg}/w1280${backImg}) center / cover  no-repeat `
                    : `center / cover no-repeat linear-gradient(to right, rgba(3, 37, 65, 0.8) 0%, rgba(3, 37, 65, 0.5) 100%)`,
            }}
        >
            <div className='flex'>
                <h3 className='title-white'>
                    {language === 'en-US'
                        ? 'Popular trailers'
                        : 'Популярні трейлери'}
                </h3>
            </div>
            <div className='relative flex flex-col break-words w-full pt-5 mb-5 '>
                <div className='flex flex-nowrap overflow-x-auto snap-x -mb-4 min-h-[240px]'>
                    {trailers.map((trailer) => (
                        <Suspense
                            fallback={
                                <div className='min-w-[300px]'>
                                    <Spinner />
                                </div>
                            }
                            key={trailer.id}
                        >
                            <TrailerCard
                                {...trailer}
                                movieDetails={movies.find(
                                    (movie) => movie.id === trailer.id
                                )}
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
                        top: '15%',
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
                    showTrailerLink={showTrailerLink}
                    closeModal={handleClickClose}
                />
            </Modal>
        </section>
    );
};

export default PopularTrailers;
