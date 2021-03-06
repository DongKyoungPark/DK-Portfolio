import { motion } from 'framer-motion';

import { AppWrap, MotionWrap } from '../../wrapper';
import { urlFor } from '../../utils/client';

import clsx from 'clsx';
import styles from './About.module.scss';

const app__about = {
  flex: '1',
  width: '100%',
  flexDirection: 'column',
};

const About = ({ abouts }) => {
  return (
    <>
      <div className={clsx(styles.app__about, styles.app__flex)}>
        <h2 className={styles.head_text}>
          <span>developer</span> who takes the initiative to find a way
          <br /> and <span>achieves goals</span> with <span>colleagues</span>
        </h2>

        <div className={styles.app__profiles}>
          {abouts?.map((about, index) => (
            <motion.div
              whileInView={{ opacity: 1 }}
              whileHover={{ scale: 1.1 }}
              transition={{ duration: 0.5, type: 'tween' }}
              className={styles.app__profile_item}
              key={about?.title + index}
            >
              <img src={urlFor(about.imgUrl)} alt={about.title} />
              <h2 className={styles.bold_text} style={{ marginTop: 20 }}>
                {about?.title}
              </h2>
              <p className={styles.p_text} style={{ marginTop: 10 }}>
                {about?.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </>
  );
};

export default AppWrap(MotionWrap(About, app__about), 'about', 'var(--white-color)');
