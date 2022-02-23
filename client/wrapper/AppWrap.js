import React from 'react';
import { NavigationDots, SocialMedia } from '../components';

import clsx from 'clsx';
import styles from '../styles/App.module.scss';

const AppWrap = (Component, idName, bgColor) =>
  function HOC() {
    return (
      <div id={idName} className={styles.app__container} style={{ backgroundColor: bgColor }}>
        <SocialMedia />
        <div className={clsx(styles.app__wrapper, styles.app__flex)}>
          <Component />

          <div className={styles.copyright}>
            <p className={styles.p_text}>@2022 Dong Kyoung</p>
            <p className={styles.p_text}>All rights reserved</p>
          </div>
        </div>
        <NavigationDots active={idName} />
      </div>
    );
  };

export default AppWrap;
