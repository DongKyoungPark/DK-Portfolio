import { useState } from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import disableScroll from 'disable-scroll';

import { AppWrap, MotionWrap } from '../../wrapper';
import { urlFor } from '../../utils/client';
import { Modal } from '../../components';
import { AiFillEye, AiFillGithub } from 'react-icons/ai';

import clsx from 'clsx';
import styles from './Projects.module.scss';

const app__projects = {
  flex: '1',
  width: '100%',
  flexDirection: 'column',
};

const Projects = ({ projects }) => {
  const [showModal, setShowModal] = useState(false);

  const [activeProject, setActiveProject] = useState(0);
  const [filterProject, setFilterProject] = useState(projects);
  const [activeFilter, setActiveFilter] = useState('All');
  const [animateCard, setAnimateCard] = useState({ y: 0, opacity: 1 });

  const sortFilterProject = filterProject?.sort((a, b) =>
    a.period > b.period ? -1 : a.period < b.period ? 1 : 0,
  );

  const handleProjectFilter = item => {
    setActiveFilter(item);
    setAnimateCard([{ y: 100, opacity: 0 }]);

    setTimeout(() => {
      setAnimateCard([{ y: 0, opacity: 1 }]);

      if (item === 'All') {
        setFilterProject(projects);
      } else {
        setFilterProject(projects?.filter(project => project?.tags?.includes(item)));
      }
    }, 500);
  };

  const handleModal = index => {
    setActiveProject(index);
    setShowModal(true);
    disableScroll.on();
  };

  return (
    <>
      <h2 className={styles.head_text}>
        My <span>Projects</span> Section
      </h2>

      <div className={styles.app__project_filter}>
        {['React', 'Next', 'Vite', 'All'].map((item, index) => (
          <div
            key={index}
            onClick={() => handleProjectFilter(item)}
            className={clsx(
              styles.app__project_filter_item,
              styles.app__flex,
              styles.p_text,
              `${activeFilter === item ? styles.item_active : ''}`,
            )}
          >
            {item}
          </div>
        ))}
      </div>

      <motion.div
        animate={animateCard}
        transition={{ duration: 0.5, delayChildren: 0.5 }}
        className={styles.app__project_portfolio}
      >
        {sortFilterProject?.map((project, index) => (
          <div className={clsx(styles.app__project_item, styles.app__flex)} key={index}>
            <div className={clsx(styles.app__project_img, styles.app__flex)}>
              <img src={urlFor(project?.projectImage)} alt={project?.title} />

              <motion.div
                whileHover={{ opacity: [0, 1] }}
                transition={{ duration: 0.25, ease: 'easeInOut', staggerChildren: 0.5 }}
                className={clsx(styles.app__project_hover, styles.app__flex)}
              >
                {/* <Link href={project.projectLink}> */}
                {/* <a target='_blank' rel='noreferrer'> */}
                <motion.div
                  whileInView={{ scale: [0.5, 1] }}
                  whileHover={{ scale: [1, 0.9] }}
                  transition={{ duration: 0.25 }}
                  className={styles.app__flex}
                >
                  <AiFillEye onClick={() => handleModal(index)} />
                </motion.div>

                {/* </a> */}
                {/* </Link> */}
                {project.codeLink !== ('' || undefined) && (
                  <Link href={project?.codeLink}>
                    <a target='_blank' rel='noreferrer'>
                      <motion.div
                        whileInView={{ scale: [0.5, 1] }}
                        whileHover={{ scale: [1, 0.9] }}
                        transition={{ duration: 0.25 }}
                        className={styles.app__flex}
                      >
                        <AiFillGithub />
                      </motion.div>
                    </a>
                  </Link>
                )}
              </motion.div>
            </div>

            <div className={clsx(styles.app__project_content, styles.app__flex)}>
              <h4 className={styles.bold_text}>{project.title}</h4>
              <p className={styles.p_text} style={{ marginTop: 10 }}>
                {project?.description}
              </p>

              <div className={clsx(styles.app__project_tag, styles.app__flex)}>
                <p className={styles.p_text}>{project ? project?.tags[0] : ''}</p>
              </div>
            </div>
          </div>
        ))}
      </motion.div>

      <Modal
        onClose={() => setShowModal(false)}
        show={showModal}
        title={projects[activeProject]?.title}
      >
        <div
          className={clsx(styles.app__project_item, styles.app__flex)}
          style={{ flexDirection: 'column' }}
        >
          <div className={clsx(styles.app__project_img, styles.app__flex)}>
            <img
              src={urlFor(projects[activeProject]?.projectImage)}
              alt={projects[activeProject]?.title}
            />
          </div>

          <div
            className={clsx(styles.app__project_content, styles.app__flex)}
            style={{ alignItems: 'flex-start' }}
          >
            <h4 className={styles.bold_text}>{projects[activeProject]?.title}</h4>
            <p className={styles.p_text} style={{ marginTop: 10 }}>
              {projects[activeProject]?.description}
            </p>

            <p className={styles.p_text} style={{ marginTop: 10 }}>
              <strong>제작기간 :</strong> {projects[activeProject]?.period}
            </p>

            <p className={styles.p_text} style={{ marginTop: 10 }}>
              <strong>제작인원 :</strong> {projects[activeProject]?.devPerson}
            </p>

            <p className={styles.p_text} style={{ marginTop: 10 }}>
              <strong>기술스택 :</strong>&nbsp;
              {projects[activeProject]?.tags?.map((tag, index) => (
                <span key={index} style={{ margin: '0 4px 4px 0' }}>{`'${tag}'`}</span>
              ))}
            </p>

            {projects[activeProject]?.projectVideo !== ('' || undefined) && (
              <p className={styles.p_text} style={{ marginTop: 10 }}>
                <strong>시연영상 :</strong>&nbsp;
                {projects[activeProject]?.projectVideo?.map((item, index) => (
                  <Link key={index} href={item}>
                    <a target='_blank' rel='noreferrer'>
                      {item} &nbsp;&nbsp;
                    </a>
                  </Link>
                ))}
              </p>
            )}

            {projects[activeProject]?.projectLink !== ('' || undefined) && (
              <p className={styles.p_text} style={{ marginTop: 10 }}>
                <strong>홈페이지 :</strong>&nbsp;
                <Link href={projects[activeProject]?.projectLink}>
                  <a target='_blank' rel='noreferrer'>
                    {projects[activeProject]?.projectLink}
                  </a>
                </Link>
              </p>
            )}

            <p className={styles.p_text} style={{ marginTop: 10 }}>
              <div style={{ display: 'flex', flexDirection: 'column' }}>
                <strong>회고</strong>
                <p>
                  {projects[activeProject]?.review
                    ?.replace(/\./g, '.<br />')
                    .replace(/\]/g, ']<br />')
                    .split('<br />')
                    .map((sentence, index) => (
                      <span key={index}>
                        {sentence}
                        {index <
                          projects[activeProject]?.review
                            ?.replace(/\./g, '.<br />')
                            .replace(/\]/g, ']<br />')
                            .split('<br />').length -
                            1 && <br />}
                      </span>
                    ))}
                </p>
              </div>
            </p>

            {projects[activeProject]?.ps !== ('' || undefined) && (
              <p className={styles.p_text} style={{ marginTop: 10 }}>
                <strong>ps :</strong> {projects[activeProject]?.ps}
              </p>
            )}
          </div>
        </div>
      </Modal>
    </>
  );
};

export default AppWrap(MotionWrap(Projects, app__projects), 'projects', 'var(--white-color)');
