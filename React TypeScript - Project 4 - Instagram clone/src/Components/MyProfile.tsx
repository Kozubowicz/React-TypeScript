import { useInstaContext } from "../Context/InstaContext";

type MyProfileProps = {
  profileImgSize: string;
  profileImgUrl: string;
  profileId: string;
  profileName: string;
  profile: boolean;
};

export function MyProfile({
  profileImgSize,
  profileImgUrl,
  profileId,
  profileName,
  profile,
}: MyProfileProps) {
  const { setUserId, setModalOn } = useInstaContext();
  return (
    <div className="MyProfileContainer">
      <div
        className="ProfilePicture"
        onClick={() => (setUserId(profileId), setModalOn(false))}
        style={{ width: parseInt(profileImgSize, 13), height: parseInt(profileImgSize, 13) }}
      >
        <img src={profileImgUrl} width={profileImgSize} />
      </div>
      <label
        className={`userName ${profile ? "profile" : ""}`}
        onClick={() => (setUserId(profileId), setModalOn(false))}
      >
        {profileName}
      </label>
    </div>
  );
}
