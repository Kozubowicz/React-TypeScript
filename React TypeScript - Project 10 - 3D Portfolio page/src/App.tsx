import './App.scss';
import { AboutMe } from './components/AboutMe';
import { Education } from './components/Education';
import { Links } from './components/Links';
import { NavBar } from './components/NavBar';
import { Projects } from './components/Projects';
import { Skills } from './components/Skills';

function App() {
  return (
    <>
      <NavBar />
      <section id=''>
        <AboutMe />
      </section>
      <section id='projects'>
        <Projects />
      </section>
      <section id='skills'>
        <Skills />
      </section>
      <section id='education'>
        <Education />
      </section>
      <section id='links'>
        <Links />
      </section>
      <div className='BacgroundAnimation' />
    </>
  );
}

export default App;
