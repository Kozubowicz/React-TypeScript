import { useState } from 'react';
import { LogInForm } from './LogInForm';
import { useInstaContext } from '../Context/InstaContext';
import { SignUpForm } from './SignUpForm';
import { ProfileHeader } from './ProfileHeader';
import { Loader } from './Loader';

export function HomePageUserHeader() {
  const { myProfile, tokenId, SignOut } = useInstaContext();
  const [LogSign, setLogSign] = useState<boolean>(true);

  return (
    <>
      {tokenId ? (
        <div className='Form Form-top'>
          <button onClick={() => SignOut()}>Sign Out</button>
          {myProfile ? (
            <ProfileHeader
              profileImgSize={'75px'}
              profileImgUrl={myProfile.profileImg}
              profileId={myProfile._id}
              profileName={myProfile.userName}
              profile={true}
            />
          ) : (
            <Loader />
          )}
        </div>
      ) : (
        <div className='Form'>
          <button onClick={() => setLogSign(!LogSign)}>
            {LogSign ? <>Sign Up</> : <>Log In</>}
          </button>

          {LogSign ? <LogInForm /> : <SignUpForm />}
        </div>
      )}
    </>
  );
}
