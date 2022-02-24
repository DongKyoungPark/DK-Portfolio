import { motion } from 'framer-motion';

import { AppWrap, MotionWrap } from '../../wrapper';

import clsx from 'clsx';
import styles from './Skills.module.scss';

const app__skills = {
  flex: '1',
  width: '100%',
  flexDirection: 'column',
};

const skills = [
  {
    name: 'HTML',
    icon: '/Images/html.png',
    bgColor: '#fff',
  },
  {
    name: 'CSS',
    icon: '/Images/css.png',
    bgColor: '#fff',
  },
  {
    name: 'SASS',
    icon: '/Images/sass.png',
    bgColor: '#fff',
  },
  {
    name: 'JavaScript',
    icon: '/Images/javascript.png',
    bgColor: '#fff',
  },
  {
    name: 'React',
    icon: '/Images/react.png',
    bgColor: '#fff',
  },
  {
    name: 'Redux',
    icon: '/Images/redux.png',
    bgColor: '#fff',
  },
  {
    name: 'React-Router',
    icon: '/Images/reactRouter.png',
    bgColor: '#fff',
  },
  {
    name: 'Material-UI',
    icon: '/Images/materialUI.png',
    bgColor: '#fff',
  },
  {
    name: 'NextJS',
    icon: '/Images/nextJS.png',
    bgColor: '#fff',
  },
  {
    name: 'Node',
    icon: '/Images/node.png',
    bgColor: '#fff',
  },
  {
    name: 'ExpressJS',
    icon: '/Images/express.png',
    bgColor: '#fff',
  },
  {
    name: 'Github',
    icon: '/Images/github.png',
    bgColor: '#fff',
  },
  {
    name: 'Figma',
    icon: '/Images/figma.png',
    bgColor: '#fff',
  },
  {
    name: 'Jira',
    icon: '/Images/jira.png',
    bgColor: '#fff',
  },
];

const experiences = [
  {
    year: '2020.10 - Ing',
    works: [
      {
        name: 'Junior Web Developer',
        company: 'SmartMind',
        desc: 'Front-End',
      },
    ],
  },
];

const Skills = () => {
  return (
    <>
      <h2 className={styles.head_text}>Skills & Experiences</h2>

      <div className={styles.app__skills_container}>
        <motion.div className={styles.app__skills_list}>
          {skills.map((skill, index) => (
            <motion.div
              whileInView={{ opacity: [0, 1] }}
              transition={{ duration: 0.5 }}
              className={clsx(styles.app__skills_item, styles.app__flex)}
              key={skill.name + index}
            >
              <div className={styles.app__flex} style={{ backgroundColor: skill.bgColor }}>
                <img src={skill.icon} alt={skill.name} />
              </div>
              <p className={styles.p_text}>{skill.name}</p>
            </motion.div>
          ))}
        </motion.div>

        <div className={styles.app__skills_exp}>
          {experiences.map((experience, index) => (
            <motion.div className={styles.app__skills_exp_item} key={experience.year + index}>
              <div className={styles.app__skills_exp_year}>
                <p className={styles.bold_text}>{experience.year}</p>
              </div>

              <motion.div className={styles.app__skills_exp_works}>
                {experience.works.map((work, index) => (
                  <>
                    <motion.div
                      whileInView={{ opacity: [0, 1] }}
                      transition={{ duration: 0.5 }}
                      className={styles.app__skills_exp_work}
                      data-tip
                      data-for={work.name}
                      key={work.name + index}
                    >
                      <h4 className={styles.bold_text}>{work.name}</h4>
                      <p className={styles.p_text} style={{ width: '140px' }}>
                        {work.company}
                      </p>
                      <p style={{ fontSize: '0.5rem' }}>{work.desc}</p>
                    </motion.div>
                  </>
                ))}
              </motion.div>
            </motion.div>
          ))}
        </div>
      </div>
    </>
  );
};

export default AppWrap(MotionWrap(Skills, app__skills), 'skills', 'var(--primary-color)');
