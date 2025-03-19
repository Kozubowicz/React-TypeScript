import { Link } from 'react-router-dom';
import { useInstaContext } from '../Context/InstaContext';
import { ProfileHeader } from './ProfileHeader';

import Logo from '/Logo.png';

export function NavBar() {
  const {
    LightDarkModeChanger,
    DarkMode,
    searchUserResult,
    searchUser,
    myProfile,
    showNavBar,
    SignOut,
  } = useInstaContext();

  return (
    <>
      <div className={`NavBar ${showNavBar && 'mobile'} ${DarkMode && 'dark'}`}>
        <div>
          <div className='NavBar-LightDarkModeSet'>
            Dark Mode
            <input
              type='checkbox'
              className='NavBar-LightDarkModeSet--Checkbox'
              checked={DarkMode}
              onChange={() => LightDarkModeChanger()}
            />
          </div>

          <Link to='/' className='NavBar-TitleLogo Link'>
            <label className='NavBar-TitleLogo--label'>Insta App</label>
            <img src={Logo} width={40} />
          </Link>

          <input
            type='text'
            className={`inputBar ${DarkMode ? 'dark' : ''}`}
            onChange={(e) => searchUser(e.target.value)}
          />

          <div className='NavBar-userList'>
            {searchUserResult?.map((e) => (
              <Link
                to={e._id}
                className='NavBar-userList--item Link'
                key={e._id}
              >
                {e.userName}
              </Link>
            ))}
          </div>
        </div>
        <div className='NavBar-profile'>
          {myProfile ? (
            <div className='NavBar-profile--menu'>
              <ul className='NavBar-profile--menu--list'>
                <Link to='/followers' className='Link'>
                  <ol className='NavBar-profile--menu--list-item'>Followers</ol>
                </Link>
                <ol
                  className='NavBar-profile--menu--list-item'
                  onClick={SignOut}
                >
                  Sign Out
                </ol>
              </ul>

              <ProfileHeader
                profileImgSize={'30px'}
                profileImgUrl={myProfile.profileImg}
                profileId={myProfile._id}
                profileName={myProfile.userName}
                profile={true}
              />
            </div>
          ) : (
            <Link to='/loginsignup' className='Link'>
              <button>Log In</button>
            </Link>
          )}
        </div>
      </div>
    </>
  );
}
