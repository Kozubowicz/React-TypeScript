import { FaHeart, FaRegComment, FaRegHeart, FaRegSmile } from 'react-icons/fa';
import { ProfileHeader } from '../Components/ProfileHeader';
import { useInstaContext } from '../Context/InstaContext';
import { useNavigate, useParams } from 'react-router-dom';
import { useEffect, useRef, useState } from 'react';
import { CommentType, PostType } from '../utils/Types';
import { Loader } from '../Components/Loader';
import { CommentList } from '../Components/CommentList';
import { BsSend } from 'react-icons/bs';

export function PostPage() {
  const [isLiked, setIsLiked] = useState(false);
  const [post, setPost] = useState<PostType | undefined>(undefined);
  const [success, setSuccess] = useState<boolean | undefined>(undefined);

  const [comments, setComments] = useState<CommentType[] | undefined>(
    undefined
  );

  const newCommentRef = useRef<HTMLInputElement>(null);

  const {
    getPost,
    tokenId,
    myProfile,
    hasLiked,
    addRemoveLike,
    addComment,
    setErrorMessage,
  } = useInstaContext();

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

          // adding post description as first comment
          if (response.description.length > 1) {
            const descrition = {
              _id: 'dess',
              commentBody: response.description,
              Author: {
                _id: response.userId,
                userName: response.userName,
                profileImg: response.profileImg,
              },
            };

            setComments(() => [descrition]);
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
    } else {
      setErrorMessage('You must be logged in to like');
    }
  };

  const handleAddComments = (newComments: CommentType[]) => {
    setComments((prev) => [
      ...(prev || []),
      ...newComments.filter(
        (comment) => !prev?.some((el) => el._id === comment._id)
      ),
    ]);
  };

  const handleNewCommentFocus = () => {
    newCommentRef.current?.focus();
  };

  const handleAddNewComment = async () => {
    if (!tokenId || !postId || !myProfile) {
      setErrorMessage('You have been logged in to comment');
    } else if (
      !newCommentRef.current?.value ||
      newCommentRef.current?.value.trim().length < 1
    ) {
      setErrorMessage('You have to write something in the comment');
    } else {
      try {
        const commentBody = newCommentRef.current.value;

        const response = await addComment(postId, commentBody);

        if (response.success && response.insertedId) {
          const userComment = {
            _id: response.insertedId,
            commentBody,
            Author: myProfile,
          };

          newCommentRef.current.value = '';

          setComments((prev) => [userComment, ...(prev || [])]);
        }
      } catch (error) {
        setErrorMessage('An error occurred while sending your comment.');
      }
    }
  };

  return (
    <>
      <div className='PostPage'>
        <div className='PostPage-close'>
          <button
            onClick={() => {
              window.history.length > 1 ? navigate(-1) : navigate('/');
            }}
            className='PostPage-close--button Link'
          >
            X
          </button>
        </div>
        <div className='PostPage-main'>
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
                />
              ) : (
                <Loader />
              )}
            </div>

            <div className='PostPage-main-right--comments'>
              {postId && (
                <CommentList
                  postId={postId}
                  comments={comments}
                  addComments={handleAddComments}
                />
              )}
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
              <button
                className='ReactionButton comment'
                onClick={handleNewCommentFocus}
              >
                <FaRegComment size={22} />
              </button>
            </div>

            <div className='PostPage-main-right--newComment'>
              <FaRegSmile size={22} />
              <input placeholder='comment' ref={newCommentRef} />
              <button className='ReactionButton' onClick={handleAddNewComment}>
                <BsSend size={22} />
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
