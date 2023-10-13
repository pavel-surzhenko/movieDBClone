// Types
import { baseUrlImg } from '../../lib';
import { detailsResponse } from '../../types';

// Components
import Container from '../Container';

const ProfilePageHeader: React.FC<detailsResponse> = ({ username, avatar }) => {
    return (
        <div className='bg-profile-bg bg-[#072e46] bg-cover bg-[center_top]'>
            <Container>
                <div className='flex text-white py-5 md:py-10 px-5 items-center'>
                    <div className='w-[75px] md:w-[130px] h-[75px] md:h-[130px] rounded-full bg-[rgb(1,119,210)] flex justify-center items-center'>
                        {avatar.tmdb.avatar_path ? (
                            <img src={`${baseUrlImg}/w200${avatar.tmdb.avatar_path}`} />
                        ) : (
                            <div className='text-2xl md:text-7xl'>{username.charAt(0)}</div>
                        )}
                    </div>
                    <div className='ml-10 text-xl md:text-3xl'>{username}</div>
                </div>
            </Container>
        </div>
    );
};

export default ProfilePageHeader;
