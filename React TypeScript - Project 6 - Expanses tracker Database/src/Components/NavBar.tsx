import { useExpanseContext } from "../Context/Context";

export function NavBar() {
  const { tokenId, setTokenId, setCurrentPage, CurrentPage } = useExpanseContext();

  const handleSignOut = () => {
    setTokenId("");
    setCurrentPage("home");
  };

  return (
    <>
      <div className="NavBar">
        <div className="NavTitle">Expanses tracker</div>
        {tokenId && tokenId.length > 5 ? (
          <>
            <button onClick={handleSignOut}>Sign Out</button>
          </>
        ) : (
          <>
            {CurrentPage === "home" && (
              <button onClick={() => setCurrentPage("login")}>Sign In</button>
            )}
            {CurrentPage === "signup" && (
              <button onClick={() => setCurrentPage("login")}>Log In</button>
            )}
            {CurrentPage === "login" && (
              <button onClick={() => setCurrentPage("signup")}>Sign Up</button>
            )}
          </>
        )}
      </div>
    </>
  );
}
