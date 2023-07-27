import { NavBar } from "./Components/NavBar";
import { HomePage } from "./Page/HomePage";
import { Profile } from "./Page/Profile";
import { useInstaContext } from "./Context/InstaContext";
import { NavBarMini } from "./Components/NavBarMini";
import { Modal } from "./Components/Modal";

function App() {
  const { userId, aspectRatio, showNavBar, modalOn } = useInstaContext();

  return (
    <>
      <div className="AppContainer">
        {modalOn && <Modal />}
        {(aspectRatio > 0.9 || showNavBar) && <NavBar />}
        {modalOn === false && aspectRatio <= 0.9 && <NavBarMini />}
        {!userId && (
          <>
            {aspectRatio > 0.9 && <div style={{ width: "100%" }} />}
            <HomePage />
            {aspectRatio > 0.9 && <div style={{ width: "100%" }} />}
          </>
        )}
        {userId && <Profile />}
      </div>
    </>
  );
}

export default App;
