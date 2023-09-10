import { MyProfile } from "../Components/MyProfile";
import { useInstaContext } from "../Context/InstaContext";
import { useEffect } from "react";

export function Profile() {
  const { getUserProfile, setModalOn, setModalImg, setModalUser, userId, userProfile } =
    useInstaContext();

  useEffect(() => {
    getUserProfile(userId);
  }, [userId]);

  return (
    <>
      {userProfile && userProfile._id && (
        <div className="Profile">
          <div className="ProfileAbout">
            <div className="ProfileImgName">
              <div className="ProfileNameReaction">
                <MyProfile
                  profileImgSize={"90px"}
                  profileImgUrl={userProfile.profileImg}
                  profileId={userProfile._id}
                  profileName={userProfile.userName}
                  profile={true}
                />
              </div>
              <div className="ProfileButtonsContainer">
                <button>Follow</button>
                <button>Message</button>
              </div>
            </div>
            <div className="ProfileDescription">{userProfile.description}</div>
          </div>

          <div className="ProfileGallery">
            {userProfile.posts.map((e) => (
              <div
                className="GalleryPicture"
                key={e._id}
                onClick={() => (
                  setModalImg(e.imgUrl),
                  setModalOn(true),
                  setModalUser({
                    userId: userProfile._id,
                    userName: userProfile.userName,
                    profileImg: userProfile.profileImg,
                  })
                )}
              >
                <img src={e.imgUrl} key={`img${e._id}`} />
              </div>
            ))}
          </div>
        </div>
      )}
    </>
  );
}
