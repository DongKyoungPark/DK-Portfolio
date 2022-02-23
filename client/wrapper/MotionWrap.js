import React from 'react';
import { motion } from 'framer-motion';

import clsx from 'clsx';
import styles from '../styles/App.module.scss';

const MotionWrap = (Component, classNames) =>
  function HOC() {
    return (
      <motion.div whileInView={{ y: [100, 50, 0], opacity: [0, 0, 1] }} transition={{ duration: 0.5 }} className={clsx(classNames, styles.app__flex)}>
        <Component />
      </motion.div>
    );
  };

export default MotionWrap;