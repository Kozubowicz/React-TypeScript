import { Link } from 'react-router-dom';

type ProfileHeaderProps = {
  profileImgSize: string;
  profileImgUrl: string;
  profileId: string;
  profileName: string;
  profile: boolean;
};

export function ProfileHeader({
  profileImgSize,
  profileImgUrl,
  profileId,
  profileName,
  profile,
}: ProfileHeaderProps) {
  return (
    <div className='ProfileHeader'>
      <Link
        to={`/${profileId}`}
        className='ProfileHeader--img '
        style={{
          width: parseInt(profileImgSize, 11),
          height: parseInt(profileImgSize, 11),
        }}
      >
        <img src={profileImgUrl} width={profileImgSize} />
      </Link>
      <Link
        to={`/${profileId}`}
        className={`ProfileHeader--name  ${profile ? 'profile' : ''}`}
      >
        {profileName}
      </Link>
    </div>
  );
}
