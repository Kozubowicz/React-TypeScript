import { useInstaContext } from "../Context/InstaContext";

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
  const { setUserId, setModalOn, setModalImg, setModalUser } = useInstaContext();
  return (
    <>
      <div className="HomePost">
        <div className="UserProfileName">
          <>
            <img
              src={post.profileImg}
              key={post.profileImg}
              onClick={() => setUserId(post.userId)}
              className="PostProfilePicture"
            />
            <div onClick={() => setUserId(post.userId)} className="PostUserName">
              {post.userName}
            </div>
          </>
        </div>
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
          <label className="PostDescription"> {post.description}</label>
        </label>
      </div>
    </>
  );
}
