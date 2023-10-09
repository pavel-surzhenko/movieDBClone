// Types
import { detailsResponse } from '../../types';

const ProfilePageHeader: React.FC<detailsResponse> = ({ username }) => {
    return <>{username}</>;
};

export default ProfilePageHeader;
