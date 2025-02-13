import { useExpanseContext } from "../Context/Context";

export function NavBar() {
  const { tokenId, setTokenId, CurrentPage, setCurrentPage, setSucess, openMenu, setOpenMenu } =
    useExpanseContext();

  const handleChangePassword = () => {
    handleMenu();
    setCurrentPage("change");
  };
  const handleSignOut = () => {
    handleMenu();
    setTokenId("");
    setCurrentPage("home");
  };
  const handleMenu = () => {
    setOpenMenu(!openMenu);
  };

  return (
    <>
      <div className="NavBar">
        <div className="NavTitle">Expanses tracker</div>
        {tokenId && tokenId.length > 5 ? (
          <div className="ButtonNavContainer">
            <button onClick={handleMenu}>☰</button>
            {openMenu && (
              <div className="MenuContainer">
                <ul>
                  {CurrentPage === "home" ? (
                    <li onClick={handleChangePassword}>Change Password</li>
                  ) : (
                    <li
                      onClick={() => {
                        setCurrentPage("home");
                        setOpenMenu(!openMenu);
                      }}
                    >
                      Home
                    </li>
                  )}
                  <li onClick={handleSignOut}>Sign Out</li>
                </ul>
              </div>
            )}
          </div>
        ) : (
          <>
            {CurrentPage === "home" && (
              <button
                onClick={() => {
                  setCurrentPage("login");
                  setSucess(undefined);
                }}
              >
                Sign In
              </button>
            )}
            {CurrentPage === "signup" && (
              <button
                onClick={() => {
                  setCurrentPage("login");
                  setSucess(undefined);
                }}
              >
                Log In
              </button>
            )}
            {CurrentPage === "login" && (
              <button
                onClick={() => {
                  setCurrentPage("signup");
                  setSucess(undefined);
                }}
              >
                Sign Up
              </button>
            )}
          </>
        )}
      </div>
    </>
  );
}
