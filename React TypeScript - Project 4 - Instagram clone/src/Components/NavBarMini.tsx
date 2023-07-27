import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars } from "@fortawesome/free-solid-svg-icons";
import { useInstaContext } from "../Context/InstaContext";
export function NavBarMini() {
  const { DarkMode, setShowNavBar, showNavBar } = useInstaContext();
  return (
    <>
      <div className={`NavBarMini ${DarkMode ? "dark" : ""}`}>
        <button onClick={() => setShowNavBar(!showNavBar)}>
          <FontAwesomeIcon icon={faBars} />
        </button>
      </div>
    </>
  );
}
