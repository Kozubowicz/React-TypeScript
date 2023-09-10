import { useInstaContext } from "../Context/InstaContext";
import { MyProfile } from "./MyProfile";
import Logo from "/Logo.png";
type NavBarProps = {
  setLogSign: (e: boolean) => void;
};
export function NavBar({ setLogSign }: NavBarProps) {
  const {
    LightDarkModeChanger,
    DarkMode,
    setUserId,
    setShowNavBar,
    aspectRatio,
    searchUserResult,
    serachUser,
    tokenId,
    myProfile,
  } = useInstaContext();

  return (
    <>
      <div className={`NavBar ${aspectRatio <= 0.9 ? "mobile" : ""} ${DarkMode && "dark"}`}>
        <div>
          <div className="LightDarkModeSet">
            Dark Mode
            <input
              type="checkbox"
              id="DarkModeCheckbox"
              checked={DarkMode}
              onChange={() => LightDarkModeChanger()}
            />
          </div>

          <div
            className="TitleLogoContainer"
            onClick={() => {
              setUserId(""), setLogSign(false);
            }}
          >
            <label className="InstaTitle">Insta App</label>
            <img src={Logo} width={40} />
          </div>

          <input
            type="text"
            className={`inputBar ${DarkMode ? "dark" : ""}`}
            onChange={(e) => serachUser(e.target.value)}
          />

          <div className="userList">
            {searchUserResult?.map((e) => (
              <div
                className="userListElement"
                key={e._id}
                onClick={() => (setUserId(e._id), setShowNavBar(false))}
              >
                {e.userName}
              </div>
            ))}
          </div>
        </div>
        {tokenId && (
          <div style={{ padding: "0vh 0vh 10rem 0vh" }}>
            <MyProfile
              profileImgSize={"30px"}
              profileImgUrl={myProfile.profileImg}
              profileId={myProfile._id}
              profileName={myProfile.userName}
              profile={true}
            />
          </div>
        )}
      </div>
    </>
  );
}
