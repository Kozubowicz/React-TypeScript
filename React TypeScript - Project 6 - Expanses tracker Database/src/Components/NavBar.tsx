import { useLocation, useNavigate } from "react-router-dom";
import { useExpanseContext } from "../Context/Context";

export function NavBar() {
  const { tokenId, setTokenId } = useExpanseContext();
  const location = useLocation();
  const navigate = useNavigate();

  const handleSignOut = () => {
    setTokenId("");
    navigate("/");
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
            {location.pathname === "/" && (
              <button onClick={() => navigate("/login")}>Sign In</button>
            )}
            {location.pathname === "/signup" && (
              <button onClick={() => navigate("/login")}>Log In</button>
            )}
            {location.pathname === "/login" && (
              <button onClick={() => navigate("/signup")}>Sign Up</button>
            )}
          </>
        )}
      </div>
    </>
  );
}
