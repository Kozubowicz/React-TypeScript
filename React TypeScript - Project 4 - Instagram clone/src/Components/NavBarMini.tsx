import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars } from '@fortawesome/free-solid-svg-icons';
import { useInstaContext } from '../Context/InstaContext';
import { Link, useNavigate } from 'react-router-dom';
import { FaHome } from 'react-icons/fa';

export function NavBarMini() {
  const navigate = useNavigate();

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
        <button className='ReactionButton' onClick={() => navigate('/')}>
          <FaHome size={26} />
        </button>
      </div>
    </>
  );
}
