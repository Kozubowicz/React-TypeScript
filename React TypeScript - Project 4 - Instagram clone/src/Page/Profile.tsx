import { useInstaContext } from "../Context/InstaContext";
import { useEffect, useState } from "react";

type UserProfile = {
  _id: string;
  userName: string;
  profileImg: string;
  description: string;
  posts: UserPosts[];
};
type UserPosts = {
  _id: string;
  userId: string;
  name: string;
  description: string;
  imgUrl: string;
};

export function Profile() {
  const { getUserProfile, setModalOn, setModalImg, setModalUser, userId } = useInstaContext();
  const [userProfile, setUserProfile] = useState<UserProfile>();

  useEffect(() => {
    const fetachPost = async () => {
      try {
        const tmp = await getUserProfile();
        setUserProfile(tmp);
      } catch (error) {
        console.error("Error");
        return [];
      }
    };
    fetachPost();
  }, [userId]);

  return (
    <>
      {userProfile && userProfile._id && (
        <div className="Profile">
          <div className="ProfileAbout">
            <div className="ProfileImgName">
              <div className="ProfileNameReaction">
                <div className="ProfilePicture">
                  <img src={userProfile.profileImg} style={{ width: "80px" }} />
                </div>
                <label className="ProfileName">{userProfile.userName}</label>
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
