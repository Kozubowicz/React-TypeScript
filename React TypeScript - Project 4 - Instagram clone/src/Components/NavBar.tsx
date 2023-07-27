import { useInstaContext } from "../Context/InstaContext";
import Logo from "/Logo.png";

export function NavBar() {
  const {
    LightDarkModeChanger,
    DarkMode,
    setUserId,
    setShowNavBar,
    aspectRatio,
    searchUserResult,
    serachUser,
  } = useInstaContext();

  return (
    <>
      <div className={`NavBar ${aspectRatio <= 0.9 ? "mobile" : ""}`}>
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

          <div className="TitleLogoContainer" onClick={() => setUserId("")}>
            <label className="InstaTitle">Insta App</label>
            <img src={Logo} width={40} />
          </div>

          <input
            type="text"
            className={`searchBar ${DarkMode ? "dark" : ""}`}
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
      </div>
    </>
  );
}
