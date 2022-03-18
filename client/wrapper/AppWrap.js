import { NavigationDots, SocialMedia } from '../components';

import clsx from 'clsx';
import styles from '../styles/App.module.scss';

const AppWrap = (Component, idName, bgColor) => {
  const HOC = ({ ...props }) => {
    return (
      <div
        id={idName}
        className={idName === 'home' ? styles.app__main_container : styles.app__sub_container}
        style={{ backgroundColor: bgColor }}
      >
        <SocialMedia />
        <div className={clsx(styles.app__wrapper, styles.app__flex)}>
          <Component {...props} />

          <div className={styles.copyright}>
            <p className={styles.p_text}>@2022 Dong Kyoung</p>
            <p className={styles.p_text}>All rights reserved</p>
          </div>
        </div>
        <NavigationDots active={idName} />
      </div>
    );
  };

  HOC.getInitialProps = async context => {
    if (Component.getInitialProps) {
      const wrappedProps = await Component.getInitialProps(context);
      return wrappedProps;
    }
  };

  return HOC;
};

export default AppWrap;
