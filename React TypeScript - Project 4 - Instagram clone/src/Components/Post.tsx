import { useInstaContext } from "../Context/InstaContext";
import { MyProfile } from "./MyProfile";

type PostProps = {
  post: {
    _id: string;
    userId: string;
    name: string;
    description: string;
    imgUrl: string;
    userName: string;
    profileImg: string;
  };
};

export function Post({ post }: PostProps) {
  const { setModalOn, setModalImg, setModalUser } = useInstaContext();
  return (
    <>
      <div className="HomePost">
        <MyProfile
          profileImgSize={"30px"}
          profileImgUrl={post.profileImg}
          profileId={post.userId}
          profileName={post.userName}
          profile={false}
        />
        <div className="PostImageContainer">
          <img
            src={post.imgUrl}
            className="PostImage"
            onClick={() => (
              setModalImg(post.imgUrl),
              setModalOn(true),
              setModalUser({
                userId: post.userId,
                userName: post.userName,
                profileImg: post.profileImg,
              })
            )}
          />
        </div>
        <label className="PostDescriptionContainer">
          <label className="PostDescription">{post.description}</label>
        </label>
      </div>
    </>
  );
}
