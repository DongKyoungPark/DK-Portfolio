import { Intro, About, Skills, Projects, Contact } from '../container';

import styles from '../styles/App.module.scss';

const App = () => {
  return (
    <div className={styles.app}>
      <Intro />
      <About />
      <Skills />
      <Projects />
      <Contact />
    </div>
  );
};

export default App;
