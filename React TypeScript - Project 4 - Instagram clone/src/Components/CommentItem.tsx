import { CommentType } from '../utils/Types';
import { ProfileHeader } from './ProfileHeader';

type CommentItemProps = {
  comment: CommentType;
};

export function CommentItem({ comment }: CommentItemProps) {
  const { Author, commentBody } = comment;
  return (
    <>
      <div className='CommentList-item'>
        <ProfileHeader
          profileImgSize={'25px'}
          profileImgUrl={Author.profileImg}
          profileId={Author._id}
          profileName={Author.userName}
        />
        <div className='CommentList-item--body'>{commentBody}</div>
      </div>
    </>
  );
}
