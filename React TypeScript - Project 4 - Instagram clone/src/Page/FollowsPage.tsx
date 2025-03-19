import { useEffect, useState } from 'react';
import { useInstaContext } from '../Context/InstaContext';
import { ProfileType } from '../utils/Types';
import { ProfileHeader } from '../Components/ProfileHeader';
import { FaHeart, FaPlusCircle } from 'react-icons/fa';
import { Loader } from '../Components/Loader';

export function FollowsPage() {
  const [page, setPage] = useState<number>(1);
  const [follows, setFollows] = useState<ProfileType[]>([]);
  const [isMore, setIsMore] = useState<boolean>(false);
  const [downloading, setDownloading] = useState(false);
  const [idToRemove, setIdToRemove] = useState('');

  const { getFollows, addRemoveFollow } = useInstaContext();

  const handleAddFollows = (newFollows: ProfileType[]) => {
    setFollows((prev) => [
      ...(prev || []),
      ...newFollows.filter(
        (follow) => !prev?.some((el) => el._id === follow._id)
      ),
    ]);
  };

  const handleGetFollows = async () => {
    try {
      setDownloading(true);

      const result = await getFollows(page);

      handleAddFollows(result.follows);
      setIsMore(result.isMore);
    } catch (error) {
      console.error(error);
    } finally {
      setDownloading(false);
    }
  };

  const handleGetMore = () => {
    setPage((prev) => prev + 1);
  };

  const handleRemoveFollow = async (idToRemove: string) => {
    try {
      setIdToRemove(idToRemove);
      const result = await addRemoveFollow(idToRemove);
      if (!result.isFollowing) {
        setFollows((prev) => prev.filter((el) => el._id !== idToRemove));
      }
    } catch (error) {
      console.error(error);
    } finally {
      setIdToRemove('');
    }
  };

  useEffect(() => {
    handleGetFollows();
  }, [page]);

  return (
    <>
      <div className='FollowsPage'>
        {follows && (
          <div className='FollowsPage-list'>
            {follows.map((follow) => (
              <div className='FollowsPage-list-item' key={follow._id}>
                <ProfileHeader
                  profileImgSize={'50px'}
                  profileImgUrl={follow.profileImg}
                  profileId={follow._id}
                  profileName={follow.userName}
                />
                <button
                  className='FollowButton
                      FollowButton--following'
                  onClick={() => handleRemoveFollow(follow._id)}
                >
                  {idToRemove === follow._id ? (
                    <Loader size='10px' />
                  ) : (
                    <>
                      <FaHeart /> Following
                    </>
                  )}
                </button>
              </div>
            ))}
          </div>
        )}
        {isMore && !downloading && (
          <button className='ReactionButton' onClick={handleGetMore}>
            <FaPlusCircle />
          </button>
        )}
        {downloading && <Loader size='30px' />}
      </div>
    </>
  );
}
