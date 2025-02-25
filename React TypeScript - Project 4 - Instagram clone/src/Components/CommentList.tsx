import commentsArr from './../comments.json';

import { CommentItem } from './CommentItem';

export function CommentList() {
  return (
    <>
      <div className='CommentList'>
        {commentsArr.map((comment) => (
          <CommentItem comment={comment} key={comment._id} />
        ))}
      </div>
    </>
  );
}
