import React from 'react';
import { motion } from 'framer-motion';

import clsx from 'clsx';
import styles from '../styles/App.module.scss';

const MotionWrap = (Component, styles) => {
  const HOC = ({ ...props }) => {
    return (
      <motion.div
        whileInView={{ y: [100, 50, 0], opacity: [0, 0, 1] }}
        transition={{ duration: 0.5 }}
        className={clsx(styles.app__flex)}
        style={{ styles }}
      >
        <Component {...props} />
      </motion.div>
    );
  };

  HOC.getInitialProps = async context => {
    if (WrappedComponent.getInitialProps) {
      const wrappedProps = await WrappedComponent.getInitialProps(context);
      return wrappedProps;
    }
  };

  return HOC;
};

export default MotionWrap;
