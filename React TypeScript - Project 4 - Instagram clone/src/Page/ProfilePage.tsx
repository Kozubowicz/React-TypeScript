import { Link, useParams } from 'react-router-dom';
import { ProfileHeader } from '../Components/ProfileHeader';
import { useInstaContext } from '../Context/InstaContext';
import { useEffect, useState } from 'react';
import { ProfilePageType } from '../utils/Types';
import { Loader } from '../Components/Loader';
import { FaHeart, FaRegHeart } from 'react-icons/fa';

export function ProfilePage() {
  const [success, setSuccess] = useState<boolean | undefined>(undefined);
  const [userProfile, setUserProfile] = useState<ProfilePageType | undefined>(
    undefined
  );

  const [isFollowing, setIsFollowing] = useState<boolean | undefined>(
    undefined
  );

  const {
    getUserProfile,
    hasFollowed,
    addRemoveFollow,
    setErrorMessage,
    sendMessage,
    tokenId,
  } = useInstaContext();

  const { userId } = useParams();

  const handleSendMessage = () => {
    sendMessage();
  };

  useEffect(() => {
    const handleFetchProfile = async () => {
      try {
        if (userId) {
          const response = await getUserProfile(userId);

          if (typeof response === 'boolean') {
            throw new Error();
          }
          setSuccess(true);
          setUserProfile(response);
        }
      } catch (error) {
        setSuccess(false);
        console.error('Error', error);
      }
    };

    if (userId) {
      handleFetchProfile();
    }
  }, [userId]);

  const handleAddRemoveFollow = async () => {
    if (userId) {
      setIsFollowing(undefined);
      try {
        const result = await addRemoveFollow(userId);

        setIsFollowing(result.isFollowing);
      } catch (error) {
        setErrorMessage('An error occurred while trying to follow');
      }
    }
  };

  useEffect(() => {
    const handleHasFollowed = async () => {
      if (userId) {
        try {
          const result = await hasFollowed(userId);

          setIsFollowing(result);
        } catch (error) {
          setIsFollowing(false);
        }
      }
    };

    handleHasFollowed();
  }, [userId]);

  return (
    <>
      <div className='ProfilePage'>
        <div className='ProfilePage-About'>
          {!userProfile && success === undefined && <Loader />}
          {success === false && <div>Error during Featching </div>}
          {success && userProfile && (
            <>
              <div className='ProfilePage-About-Header'>
                <div className='ProfilePage-About-Header--ProfileHeader'>
                  <ProfileHeader
                    profileImgSize={'90px'}
                    profileImgUrl={userProfile.profileImg}
                    profileId={userProfile._id}
                    profileName={userProfile.userName}
                    profile={true}
                  />
                </div>

                {tokenId !== userId && (
                  <div className='ProfilePage-About-Header--Reaction'>
                    {isFollowing !== undefined ? (
                      <button
                        className={`FollowButton ${
                          isFollowing ? 'FollowButton--following' : ''
                        } `}
                        onClick={handleAddRemoveFollow}
                      >
                        {isFollowing ? (
                          <>
                            <FaHeart /> Following
                          </>
                        ) : (
                          <>
                            <FaRegHeart />
                            Follow
                          </>
                        )}
                      </button>
                    ) : (
                      <button className='FollowButton'>
                        <Loader size='10px' />
                      </button>
                    )}

                    <button onClick={handleSendMessage}>Message</button>
                  </div>
                )}
              </div>
              <div className='ProfilePage-About--des'>
                {userProfile.description}
              </div>
            </>
          )}
        </div>
        {userProfile ? (
          <div className='ProfilePage-Gallery'>
            {userProfile.posts.map((e) => (
              <Link
                to={`/${userProfile._id}/${e._id}`}
                className='ProfilePage-Gallery-item Link'
                key={e._id}
              >
                <img src={e.imgUrl} key={`img${e._id}`} />
              </Link>
            ))}
          </div>
        ) : (
          <Loader />
        )}
      </div>
    </>
  );
}
