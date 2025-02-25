import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars } from '@fortawesome/free-solid-svg-icons';
import { useInstaContext } from '../Context/InstaContext';
import { Link } from 'react-router-dom';

export function NavBarMini() {
  const { DarkMode, setShowNavBar, showNavBar, tokenId, SignOut } =
    useInstaContext();
  return (
    <>
      <div className={`NavBarMini ${DarkMode && 'dark'}`}>
        {tokenId ? (
          <button onClick={() => SignOut()}>Sign Out</button>
        ) : (
          <Link to='/loginsignup' className='Link'>
            <button>Log In</button>
          </Link>
        )}
        <button onClick={() => setShowNavBar(!showNavBar)}>
          <FontAwesomeIcon icon={faBars} />
        </button>
      </div>
    </>
  );
}
