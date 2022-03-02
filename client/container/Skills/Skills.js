import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

import { AppWrap, MotionWrap } from '../../wrapper';
import { urlFor, client } from '../../utils/client';

import clsx from 'clsx';
import styles from './Skills.module.scss';

const app__skills = {
  flex: '1',
  width: '100%',
  flexDirection: 'column',
};

const Skills = () => {
  const [experiences, setExperiences] = useState([]);
  const [skills, setSkills] = useState([]);

  const sortSkills = skills.sort((a, b) =>
    a._createdAt < b._createdAt ? -1 : a._createdAt > b._createdAt ? 1 : 0,
  );

  useEffect(() => {
    const query = '*[_type == "experiences"]';
    const skillsQuery = '*[_type == "skills"]';

    client.fetch(query).then(data => {
      setExperiences(data);
    });

    client.fetch(skillsQuery).then(data => {
      setSkills(data);
    });
  }, []);

  return (
    <>
      <h2 className={styles.head_text}>Skills & Experiences</h2>

      <div className={styles.app__skills_container}>
        <motion.div className={styles.app__skills_list}>
          {sortSkills?.map((skill, index) => (
            <motion.div
              whileInView={{ opacity: [0, 1] }}
              transition={{ duration: 0.5 }}
              className={clsx(styles.app__skills_item, styles.app__flex)}
              key={skill.name + index}
            >
              <div className={styles.app__flex} style={{ backgroundColor: skill.bgColor }}>
                <img src={urlFor(skill.icon)} alt={skill.name} />
              </div>
              <p className={styles.p_text}>{skill.name}</p>
            </motion.div>
          ))}
        </motion.div>

        <div className={styles.app__skills_exp}>
          {experiences?.map((experience, index) => (
            <motion.div className={styles.app__skills_exp_item} key={experience.year + index}>
              <div className={styles.app__skills_exp_year}>
                <p className={styles.bold_text}>{experience.year}</p>
              </div>

              <motion.div className={styles.app__skills_exp_works}>
                {experience?.projects?.map((project, index) => (
                  <motion.div
                    whileInView={{ opacity: [0, 1] }}
                    transition={{ duration: 0.5 }}
                    className={styles.app__skills_exp_work}
                    data-tip
                    data-for={project.name}
                    key={project.name + index}
                  >
                    <h4 className={styles.bold_text}>{project.name}</h4>
                    <p className={styles.p_text} style={{ width: '140px' }}>
                      {project.company}
                    </p>
                    <p style={{ fontSize: '0.5rem' }}>{project.desc}</p>
                  </motion.div>
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
