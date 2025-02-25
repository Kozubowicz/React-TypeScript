import { Link } from 'react-router-dom';
import { ProfileHeader } from './ProfileHeader';

type PostProps = {
  post: {
    _id: string;
    userId: string;
    name: string;
    description: string;
    imgUrl: string;
    userName: string;
    profileImg: string;
  };
};

export function PostItem({ post }: PostProps) {
  return (
    <>
      <div className='PostItem'>
        <ProfileHeader
          profileImgSize={'30px'}
          profileImgUrl={post.profileImg}
          profileId={post.userId}
          profileName={post.userName}
          profile={false}
        />
        <Link to={`${post.userId}/${post._id}`} className='PostItem--img Link'>
          <img src={post.imgUrl} className='PostImage' />
        </Link>
        <div className='PostItem--des'>{post.description}</div>
      </div>
    </>
  );
}
