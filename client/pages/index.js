import Head from 'next/head';
import Image from 'next/image';

import { Intro } from '../container';

import clsx from 'clsx';
import styles from '../styles/App.module.scss';

const App = () => {
  return (
    <div className={styles.app}>
      <Intro />
    </div>
  );
};

export default App;
