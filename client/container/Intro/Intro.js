import { motion } from 'framer-motion';

import { AppWrap } from '../../wrapper';

import clsx from 'clsx';
import styles from './Intro.module.scss';

const scaleVariants = {
  whileInView: {
    scale: [0, 1],
    opacity: [0, 1],
    transition: {
      duration: 1,
      ease: 'easeInOut',
    },
  },
};

const Intro = () => (
  <div className={clsx(styles.app__header, styles.app__flex)}>
    <motion.div
      whileInView={{ x: [-100, 0], opacity: [0, 1] }}
      transition={{ duration: 0.5 }}
      className={styles.app__header_info}
    >
      <div className={styles.app__header_badge}>
        <div className={clsx(styles.badge_cmp, styles.app__flex)}>
          <span>👋</span>
          <div>
            <p className={styles.p_text}>Hello, I am</p>
            <h1 className={styles.head_text}>Dong Kyoung</h1>
          </div>
        </div>

        <div className={clsx(styles.tag_cmp, styles.app__flex)}>
          <p className={styles.p_text}>Web Developer</p>
        </div>

        <div className={clsx(styles.tag_cmp, styles.app__flex)}>
          <p className={styles.p_text} style={{ textTransform: 'inherit', textAlign: 'left' }}>
            Welcome to <br />
            My Personal Portfolio
          </p>
        </div>

        <div className={clsx(styles.tag_cmp, styles.app__flex)}>
          <p className={styles.p_text} style={{ textTransform: 'inherit', textAlign: 'left' }}>
            This is a portfolio <br />
            that introduces the projects. <br />i have been working on so far.
          </p>
        </div>
      </div>
    </motion.div>

    <motion.div
      whileInView={{ opacity: [0, 1] }}
      transition={{ duration: 0.5, delayChildren: 0.5 }}
      className={styles.app__header_img}
    >
      <div>
        <img
          src='https://raw.githubusercontent.com/DongKyoungPark/DongKyoungPark/master/svg/developer.gif'
          alt='profile_bg'
        />
      </div>
      <motion.img
        whileInView={{ scale: [0, 1] }}
        transition={{ duration: 1, ease: 'easeInOut' }}
        src='/Images/circle.svg'
        alt='profile_circle'
        className={styles.overlay_circle}
      />
    </motion.div>

    <motion.div
      variants={scaleVariants}
      whileInView={scaleVariants.whileInView}
      className={styles.app__header_circles}
    >
      {[
        '/Images/materialUI.png',
        '/Images/nextJS.png',
        '/Images/react.png',
        '/Images/redux.png',
        '/Images/node.png',
      ].map((circle, index) => (
        <div className={clsx(styles.circle_cmp, styles.app__flex)} key={`circle-${index}`}>
          <img src={circle} alt='profile_bg' />
        </div>
      ))}
    </motion.div>
  </div>
);

export default AppWrap(Intro, 'home', 'var(--primary-color)');
