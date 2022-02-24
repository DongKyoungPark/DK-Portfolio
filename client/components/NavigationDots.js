import Link from 'next/link';

import styles from '../styles/App.module.scss';

const NavigationDots = ({ active }) => (
  <div className={styles.app__navigation}>
    {['home', 'about', 'work', 'skills', 'testimonial', 'contact'].map((item, index) => (
      <Link href={`#${item}`} key={item + index}>
        <a
          className={styles.app__navigation_dot}
          style={active === item ? { backgroundColor: '#313BAC' } : {}}
        ></a>
      </Link>
    ))}
  </div>
);

export default NavigationDots;
