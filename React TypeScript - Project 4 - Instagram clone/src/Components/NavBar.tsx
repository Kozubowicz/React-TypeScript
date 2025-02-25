import { Link } from 'react-router-dom';
import { useInstaContext } from '../Context/InstaContext';
import { ProfileHeader } from './ProfileHeader';
import Logo from '/Logo.png';

export function NavBar() {
  const {
    LightDarkModeChanger,
    DarkMode,
    searchUserResult,
    serachUser,
    myProfile,
    showNavBar,
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
            onChange={(e) => serachUser(e.target.value)}
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
        {myProfile && (
          <div style={{ padding: '0vh 0vh 10rem 0vh' }}>
            <ProfileHeader
              profileImgSize={'30px'}
              profileImgUrl={myProfile.profileImg}
              profileId={myProfile._id}
              profileName={myProfile.userName}
              profile={true}
            />
          </div>
        )}
      </div>
    </>
  );
}
