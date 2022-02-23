import { useState } from 'react';
import { HiMenuAlt4, HiX } from 'react-icons/hi';
import { motion } from 'framer-motion';

import Link from 'next/link';

import clsx from 'clsx';
import styles from './Navigation.module.scss';

const Navigation = () => {
  const [toggle, setToggle] = useState(false);

  return (
    <>
      <nav className={styles.app__navbar}>
        <div className={styles.app__navbar_logo}>
          <Link href='/'>DK&apos;s Portfolio</Link>
          {/* <img src={images.logo} alt='logo' /> */}
        </div>
        <ul className={styles.app__navbar_links}>
          {['home', 'about', 'work', 'skills', 'contact'].map(item => (
            <li className={clsx(styles.app__flex, styles.p_text)} key={`link-${item}`}>
              <div />
              <Link href={`#${item}`}>
                <a>{item}</a>
              </Link>
            </li>
          ))}
        </ul>

        <div className={styles.app__navbar_menu}>
          <HiMenuAlt4 onClick={() => setToggle(true)} />

          {toggle && (
            <motion.div
              whileInView={{ x: [200, 0] }}
              transition={{ duration: 0.85, ease: 'easeOut' }}
            >
              <HiX onClick={() => setToggle(false)} />
              <ul>
                {['home', 'about', 'work', 'skills', 'contact'].map(item => (
                  <li key={item}>
                    <Link href={`#${item}`} onClick={() => setToggle(false)}>
                      <a>{item}</a>
                    </Link>
                  </li>
                ))}
              </ul>
            </motion.div>
          )}
        </div>
      </nav>
    </>
  );
};

export default Navigation;
