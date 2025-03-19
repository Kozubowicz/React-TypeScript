import { Navigate, Route, Routes } from 'react-router-dom';
import './App.scss';
import { NavBar } from './components/NavBar';
import { HomePage } from './Pages/HomePage';
import { CounterPage } from './Pages/CounterPage';
import { LoaderPage } from './Pages/LoaderPage';

function App() {
  return (
    <>
      <div className='App'>
        <NavBar />
        <Routes>
          <Route path='/' element={<HomePage />} />
          <Route path='/home' element={<Navigate to='/' replace />} />
          <Route path='/counter' element={<CounterPage />} />
          <Route path='/loader' element={<LoaderPage />} />
        </Routes>
      </div>
    </>
  );
}

export default App;
