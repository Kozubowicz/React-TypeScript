import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars } from "@fortawesome/free-solid-svg-icons";
import { useInstaContext } from "../Context/InstaContext";
type setLogSignProps = {
  setLogSign: (e: boolean) => void;
  LogSign: boolean;
};
export function NavBarMini({ LogSign, setLogSign }: setLogSignProps) {
  const { DarkMode, setShowNavBar, showNavBar, tokenId, SignOut } = useInstaContext();
  return (
    <>
      <div className={`NavBarMini ${DarkMode && "dark"}`}>
        {tokenId ? (
          <button onClick={() => SignOut()}>Sign Out</button>
        ) : (
          <button onClick={() => setLogSign(!LogSign)}>Log In</button>
        )}
        <button onClick={() => setShowNavBar(!showNavBar)}>
          <FontAwesomeIcon icon={faBars} />
        </button>
      </div>
    </>
  );
}
