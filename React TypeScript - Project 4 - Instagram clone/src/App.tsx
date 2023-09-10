import { NavBar } from "./Components/NavBar";
import { HomePage } from "./Page/HomePage";
import { Profile } from "./Page/Profile";
import { useInstaContext } from "./Context/InstaContext";
import { NavBarMini } from "./Components/NavBarMini";
import { Modal } from "./Components/Modal";
import { HomePageUserProfile } from "./Components/HomePageUserProfile";
import { useState } from "react";
import { LogInSignUp } from "./Page/LogInSignUp";

function App() {
  const { userId, aspectRatio, showNavBar, modalOn } = useInstaContext();

  const [LogSign, setLogSign] = useState<boolean>(false);
  return (
    <>
      <div className="AppContainer">
        {modalOn && <Modal />}
        {(aspectRatio > 0.9 || showNavBar) && <NavBar setLogSign={setLogSign} />}
        {modalOn === false && aspectRatio <= 0.9 && (
          <NavBarMini LogSign={LogSign} setLogSign={setLogSign} />
        )}
        {!userId && !LogSign && (
          <>
            {aspectRatio > 1.2 && <div style={{ width: "80%" }} />}
            <HomePage />
            {aspectRatio > 1.2 && (
              <div className="MyProfile" style={{ width: "90%" }}>
                <HomePageUserProfile />
              </div>
            )}
          </>
        )}
        {userId && !LogSign && <Profile />}
        {LogSign && <LogInSignUp setLogSign={setLogSign} />}
      </div>
    </>
  );
}

export default App;
