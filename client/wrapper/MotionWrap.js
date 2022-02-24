import React from 'react';
import { motion } from 'framer-motion';

import clsx from 'clsx';
import styles from '../styles/App.module.scss';

const MotionWrap = (Component, styles) =>
  function HOC() {
    return (
      <motion.div
        whileInView={{ y: [100, 50, 0], opacity: [0, 0, 1] }}
        transition={{ duration: 0.5 }}
        className={clsx(styles.app__flex)}
        style={{ styles }}
      >
        <Component />
      </motion.div>
    );
  };

export default MotionWrap;
