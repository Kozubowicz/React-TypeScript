import { NavBar } from './Components/NavBar';
import { HomePage } from './Page/HomePage';
import { ProfilePage } from './Page/ProfilePage';
import { NavBarMini } from './Components/NavBarMini';
import { useEffect } from 'react';
import { LogInSignUp } from './Page/LogInSignUp';
import { Navigate, Route, Routes, useLocation } from 'react-router-dom';
import { PostPage } from './Page/PostPage';

function App() {
  const location = useLocation();

  useEffect(() => {
    //window.scrollTo(0, 0);
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
            </Routes>
          </div>

          <NavBarMini />
        </div>
      </div>
    </>
  );
}

export default App;
