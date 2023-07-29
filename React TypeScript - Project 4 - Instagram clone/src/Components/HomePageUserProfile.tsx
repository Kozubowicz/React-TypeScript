import { useState } from "react";
import { LogInForm } from "./LogInForm";
import { useInstaContext } from "../Context/InstaContext";
import { SignUpForm } from "./SignUpForm";
import { MyProfile } from "./MyProfile";

export function HomePageUserProfile() {
  const { myProfile, tokenId, SignOut } = useInstaContext();
  const [LogSign, setLogSign] = useState<boolean>(true);
  return (
    <>
      {tokenId.length > 0 ? (
        <div className="LogInContainer">
          <button onClick={() => SignOut()}>Sign Out</button>
          <MyProfile
            profileImgSize={"75px"}
            profileImgUrl={myProfile.profileImg}
            profileId={myProfile._id}
            profileName={myProfile.userName}
            profile={true}
          />
        </div>
      ) : (
        <div className="LogInContainer">
          <button onClick={() => setLogSign(!LogSign)}>
            {LogSign ? <>Sign Up</> : <>Log In</>}
          </button>

          {LogSign ? <LogInForm /> : <SignUpForm />}
        </div>
      )}
    </>
  );
}
