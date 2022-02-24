import Head from 'next/head';
import Image from 'next/image';

import { Intro, About, Skills, Projects, Contact } from '../container';

import clsx from 'clsx';
import styles from '../styles/App.module.scss';

import { useState } from 'react';

const App = () => {
  const [showModal, setShowModal] = useState(false);

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
