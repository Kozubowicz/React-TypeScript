import { useEffect, useState } from 'react';
import { useInstaContext } from '../Context/InstaContext';

import { CommentItem } from './CommentItem';
import { CommentType } from '../utils/Types';
import { Loader } from './Loader';
import { FaPlusCircle } from 'react-icons/fa';

type CommentListProps = {
  comments: CommentType[] | undefined;
  addComments: (comments: CommentType[]) => void;
  postId: string;
};

export function CommentList({
  postId,
  comments,
  addComments,
}: CommentListProps) {
  const [page, setPage] = useState<number>(1);
  const [error, setError] = useState<boolean>(false);
  const [isMore, setIsMore] = useState<boolean | undefined>(undefined);
  const [downloading, setDownloading] = useState<boolean>(false);

  const { getComments } = useInstaContext();

  const handleGetComments = async () => {
    if (downloading) return;

    try {
      setDownloading(true);

      const response = await getComments(postId, page);

      if (typeof response === 'boolean') {
        throw new Error();
      }
      addComments(response.comments);
      setIsMore(response.isMore);
    } catch (error) {
      setError(true);
    } finally {
      setDownloading(false);
    }
  };

  const handleMoreComments = () => {
    setPage((prev) => prev + 1);
  };

  useEffect(() => {
    handleGetComments();
  }, [page]);

  return (
    <>
      <div className='CommentList'>
        {!comments && !error && <Loader />}
        {comments &&
          comments.map((comment) => (
            <CommentItem comment={comment} key={comment._id} />
          ))}
        {error && <div>Error downloading comments</div>}
        {isMore && (
          <div className='CommentList--more'>
            {downloading ? (
              <Loader size='16px' />
            ) : (
              <button className='ReactionButton' onClick={handleMoreComments}>
                <FaPlusCircle />
              </button>
            )}
          </div>
        )}
      </div>
    </>
  );
}
