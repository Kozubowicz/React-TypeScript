import { CommentType } from '../utils/Types';
import { ProfileHeader } from './ProfileHeader';

type CommentItemProps = {
  comment: CommentType;
};

export function CommentItem({ comment }: CommentItemProps) {
  const { Author, body } = comment;
  return (
    <>
      <div className='CommentList-item'>
        <ProfileHeader
          profileImgSize={'25px'}
          profileImgUrl={Author.profileImg}
          profileId={Author._id}
          profileName={Author.userName}
          profile={false}
        />
        <div className='CommentList-item--body'>{body}</div>
      </div>
    </>
  );
}
