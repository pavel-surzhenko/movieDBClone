// React
import { Helmet } from 'react-helmet';
import { useContext, useState } from 'react';

// Other
import { api } from '../api/api';
import { redirectUrl } from '../lib/links';
import { Check } from '../assets';
import { Context } from '../lib';
import { useNavigate } from 'react-router-dom';

export const LoginPage = () => {
    const [userName, setUserName] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    const { setSessionId } = useContext(Context);
    const navigate = useNavigate();

    const handleClick = () => {
        api.getToken().then((res) => {
            window.location.href = `https://www.themoviedb.org/authenticate/${res.data.request_token}?redirect_to=${redirectUrl}`;
        });
    };

    const currentUrl = new URL(window.location.href);
    const approved = currentUrl.searchParams.get('approved');
    const requestToken = currentUrl.searchParams.get('request_token');

    const handleSubmit = () => {
        if (requestToken) {
            api.login(requestToken).then((res) => {
                if (res.success) {
                    setSessionId(res.session_id);
                    navigate('/');
                }
            });
        }
    };

    return (
        <>
            <Helmet>
                <title>Login - The Movie Data Base (TMDB)</title>
            </Helmet>
            <section className='mt-12 md:mt-24'>
                <div className='flex flex-col items-center justify-center px-6 py-8 m-auto lg:py-0 '>
                    <div className='w-full boxShadow rounded-lg shadow  md:mt-0 sm:max-w-md xl:p-0'>
                        <div className='p-6 space-y-4 md:space-y-6 sm:p-8'>
                            <h1 className='text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl '>
                                Login to account
                            </h1>
                            <div>
                                <p className='mb-3'>
                                    At first you need to get access from{' '}
                                    <span className='font-medium'>TMDB</span>
                                </p>
                                <div className='flex items-center space-x-3'>
                                    <button
                                        type='button'
                                        onClick={handleClick}
                                        className='bg-lightBlue text-white hover:bg-darkBlue font-medium rounded-lg text-sm px-5 py-2.5 text-center disabled:bg-lightGreen'
                                        disabled={!!approved}
                                    >
                                        Get access
                                    </button>
                                    {approved && <Check />}
                                </div>
                            </div>
                            {approved && (
                                <form className='space-y-4 md:space-y-6'>
                                    <div>
                                        <label
                                            htmlFor='email'
                                            className='block mb-2 text-sm font-medium text-gray-900 '
                                        >
                                            Your email
                                        </label>
                                        <input
                                            type='text'
                                            className='bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 '
                                            placeholder='username'
                                            value={userName}
                                            onChange={(e) => setUserName(e.target.value)}
                                        />
                                    </div>
                                    <div>
                                        <label
                                            htmlFor='password'
                                            className='block mb-2 text-sm font-medium text-gray-900 '
                                        >
                                            Password
                                        </label>
                                        <input
                                            value={password}
                                            onChange={(e) => setPassword(e.target.value)}
                                            type='password'
                                            name='password'
                                            id='password'
                                            placeholder='••••••••'
                                            className='bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 '
                                        />
                                    </div>
                                    <button
                                        type='button'
                                        disabled={!userName.length || !password.length}
                                        onClick={handleSubmit}
                                        className='w-full bg-lightBlue text-white hover:bg-darkBlue font-medium rounded-lg text-sm px-5 py-2.5 text-center disabled:bg-lightGray'
                                    >
                                        Sign in
                                    </button>
                                </form>
                            )}
                        </div>
                    </div>
                </div>
            </section>
        </>
    );
};
