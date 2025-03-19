import { Link, useLocation } from 'react-router-dom';
import './NavBar.scss';

export function NavBar() {
  const location = useLocation();

  const page = location.pathname.split('/')[1];

  return (
    <>
      <nav className='NavBar'>
        <ul className='NavBar-List'>
          <li
            className={`NavBar-List--Item ${
              page === '' && 'NavBar-List--Item--selected'
            } `}
          >
            <Link to='/'>Home</Link>
          </li>
          <li
            className={`NavBar-List--Item ${
              page === 'counter' && 'NavBar-List--Item--selected'
            } `}
          >
            <Link to='/counter'>Counter</Link>
          </li>
          <li
            className={`NavBar-List--Item ${
              page === 'loader' && 'NavBar-List--Item--selected'
            } `}
          >
            <Link to='/loader'>Loader</Link>
          </li>
        </ul>
      </nav>
    </>
  );
}
