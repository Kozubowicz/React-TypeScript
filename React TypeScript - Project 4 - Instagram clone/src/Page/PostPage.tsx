import { FaHeart, FaRegComment, FaRegHeart } from 'react-icons/fa';
import { ProfileHeader } from '../Components/ProfileHeader';
import { useInstaContext } from '../Context/InstaContext';
import { useNavigate, useParams } from 'react-router-dom';
import { useEffect, useRef, useState } from 'react';
import { PostType } from '../utils/Types';
import { Loader } from '../Components/Loader';
import { CommentList } from '../Components/CommentList';

export function PostPage() {
  const mainContainer = useRef<HTMLDivElement>(null);
  const [isLiked, setIsLiked] = useState(false);
  const [post, setPost] = useState<PostType | undefined>(undefined);
  const [success, setSuccess] = useState<boolean | undefined>(undefined);

  const { getPost, tokenId, hasLiked, addRemoveLike } = useInstaContext();

  const { postId } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    const handleFetchPostData = async () => {
      if (postId) {
        try {
          const response = await getPost(postId);

          if (typeof response === 'boolean') {
            throw new Error();
          }
          setPost(response);
          setSuccess(true);
        } catch (error) {
          setSuccess(false);
        }
      }
    };

    if (postId) {
      handleFetchPostData();
    }
  }, [postId]);

  useEffect(() => {
    const handleHasLiked = async () => {
      if (postId && tokenId) {
        try {
          const response = await hasLiked(postId, tokenId);

          setIsLiked(response);
        } catch (error) {
          console.error(error);
        }
      }
    };

    handleHasLiked();
  }, [postId, tokenId]);

  const handleAddRemoveLike = async () => {
    if (postId && tokenId) {
      try {
        const response = await addRemoveLike(postId, tokenId);
        setIsLiked(response);
      } catch (error) {
        console.error(error);
      }
    }
  };

  useEffect(() => {
    setTimeout(() => {
      requestAnimationFrame(() => {
        if (mainContainer.current) {
          mainContainer.current.scrollTop = -1000;
        }
      });
      console.log(mainContainer.current);
    }, 1000);
  }, [post]);

  return (
    <>
      <div className='PostPage'>
        <div className='PostPage-close'>
          <button
            onClick={() => navigate(-1)}
            className='PostPage-close--button Link'
          >
            X
          </button>
        </div>
        <div className='PostPage-main' ref={mainContainer}>
          <div className='PostPage-main-left'>
            {post && success ? (
              <img src={post.imgUrl} alt='ModalImg' />
            ) : (
              <Loader />
            )}
          </div>
          <div className='PostPage-main-right'>
            <div className='PostPage-main-right--header'>
              {post && success ? (
                <ProfileHeader
                  profileImgSize={'40px'}
                  profileImgUrl={post.profileImg}
                  profileId={post.userId}
                  profileName={post.userName}
                  profile={false}
                />
              ) : (
                <Loader />
              )}
            </div>

            <div className='PostPage-main-right--comments'>
              <CommentList />
            </div>

            <div className='PostPage-main-right--reactions'>
              <button
                className='ReactionButton like'
                onClick={handleAddRemoveLike}
              >
                {isLiked ? (
                  <FaHeart color={'red'} size={22} />
                ) : (
                  <FaRegHeart color={'white'} size={22} />
                )}
              </button>
              <button className='ReactionButton comment'>
                <FaRegComment size={22} />
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
