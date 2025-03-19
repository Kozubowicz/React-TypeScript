import { NavBar } from './Components/NavBar';
import { HomePage } from './Page/HomePage';
import { ProfilePage } from './Page/ProfilePage';
import { NavBarMini } from './Components/NavBarMini';
import { LogInSignUp } from './Page/LogInSignUp';
import { Navigate, Route, Routes, useLocation } from 'react-router-dom';
import { PostPage } from './Page/PostPage';
import { useInstaContext } from './Context/InstaContext';
import { ErrorPopUp } from './utils/ErrorPopUp';
import { FollowsPage } from './Page/FollowsPage';
import { useEffect } from 'react';

function App() {
  const { errorMessage } = useInstaContext();

  const location = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location]);

  return (
    <>
      <div className='AppContainer'>
        <NavBar />
        <div className='AppContainer-router'>
          <div className='AppContainer-router-pages'>
            <Routes>
              <Route path='/' element={<HomePage />} />
              <Route path='/home' element={<Navigate to='/' replace />} />

              <Route path=':userId'>
                <Route path='/:userId' element={<ProfilePage />} />
                <Route path='/:userId/:postId' element={<PostPage />} />
              </Route>

              <Route path='/loginsignup' element={<LogInSignUp />} />

              <Route path='/followers' element={<FollowsPage />} />
            </Routes>
          </div>

          <NavBarMini />
        </div>
        {errorMessage && <ErrorPopUp message={errorMessage} />}
      </div>
    </>
  );
}

export default App;
