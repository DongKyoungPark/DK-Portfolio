import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import disableScroll from 'disable-scroll';

import { AppWrap, MotionWrap } from '../../wrapper';
import { urlFor, client } from '../../utils/client';
import { Modal } from '../../components';
import { AiFillEye, AiFillGithub } from 'react-icons/ai';

import clsx from 'clsx';
import styles from './Projects.module.scss';

const app__projects = {
  flex: '1',
  width: '100%',
  flexDirection: 'column',
};

// const projects = [
//   {
//     title: `DK's Portfolio`,
//     description: '포트폴리오 사이트 구축',
//     projectImage: '/Images/portfolio.png',
//     projectLink: 'https://smartmind.team',
//     projectVideo: ['https://www.youtube.com/watch?v=gZwiRtoidhU&ab_channel=FashionScanner'],
//     period: '2022.02 ~ 제작 진행 중',
//     codeLink: 'https://github.com/DongKyoungPark/DK-Portfolio',
//     tags: ['Next', 'Sass', 'Sanity', 'Framer-motion'],
//     review: 'NextJS를 처음으로 적용한 프로젝트 입니다.',
//     ps: '',
//   },
//   {
//     title: 'M.AD.E Web',
//     description: 'M.AD.E를 소개하는 페이지',
//     projectImage: '/Images/madeWeb.png',
//     projectLink: 'https://madeplatforms.com/',
//     projectVideo: ['https://www.youtube.com/watch?v=gZwiRtoidhU&ab_channel=FashionScanner'],
//     period: '2022.01(1주)',
//     codeLink: '',
//     devPerson: '프론트 - 1명',
//     tags: ['React', 'Hooks', 'React-Router', 'Material-UI', '반응형', 'i18nextLng(언어변경)'],
//     review:
//       'SmartMind HomePage 컴포넌트 기반으로 제작된 홈페이지 입니다. 컴포넌트를 재사용 함으로써 제작기간이 확연히 줄어든 케이스의 프로젝트 입니다.',
//     ps: 'M.AD.E 기획 수정 중에 있어 서버 중단 상태 입니다.',
//   },
//   {
//     title: 'SmartMind HomePage',
//     description: 'SmartMind를 소개하는 페이지',
//     projectImage: '/Images/smartmindWeb.png',
//     projectLink: 'https://smartmind.team',
//     projectVideo: ['https://smartmind.team/'],
//     period: '2021.12 ~ 제작 진행 중',
//     codeLink: '',
//     devPerson: '프론트 - 1명',
//     tags: [
//       'React',
//       'Hooks',
//       'React-Router',
//       'Material-UI',
//       'emailJS',
//       '반응형',
//       'i18nextLng(언어변경)',
//     ],
//     review:
//       '홈페이지 Layout 구성은 2주만에 제작 되었지만, 컨텐츠 부분을 제장중에 있어, 컨텐츠를 채워나가고 있는 중입니다.',
//     ps: '',
//   },
//   {
//     title: 'M.AD.E',
//     description: '광고주, 마케터를 통합하여 광고하는 플랫폼',
//     projectImage: '/Images/made.png',
//     projectLink: 'https://smartmind.team',
//     projectVideo: ['https://youtu.be/QQHGYuqkgc8', 'https://youtu.be/OeByrX1qGRY'],
//     period: '2020.10 ~ 제작 진행 중',
//     codeLink: '',
//     devPerson: '프론트 - 1명 / 백엔드 - 3명',
//     tags: [
//       'React',
//       'Hooks',
//       'React-Router',
//       'Redux',
//       'Axios',
//       'Material-UI',
//       '반응형',
//       'ApexCharts(데이터 시각화)',
//       'OpenAPI(사업자등록증확인)',
//       '아임포트(휴대폰인증,결제)',
//       'Social Login(페이스북, 구글)',
//       'etc...',
//     ],
//     review:
//       '혼자 프론트 개발을 총괄하여 제작하였으며, 5번의 기획 수정으로 인해 프로젝트 기간이 길어 졌지만 처음부터 끝까지 배포해 본 첫 프로젝트이며, 여전히 기획 수정 중에 있는 프로젝트 입니다. Redux, ApexChart, 아임포트 등 처음 접하는 많은 기술들을 찾아보면서 성장하게 된 계기가 된 프로젝트였던 것 같습니다.',
//     ps: 'M.AD.E 기획 수정 중에 있어 서버 중단 상태입니다.',
//   },
// ];

const Projects = () => {
  const [showModal, setShowModal] = useState(false);

  const [projects, setProjects] = useState([]);
  const [activeProject, setActiveProject] = useState(0);
  const [filterProject, setFilterProject] = useState(projects);
  const [activeFilter, setActiveFilter] = useState('All');
  const [animateCard, setAnimateCard] = useState({ y: 0, opacity: 1 });

  const handleProjectFilter = item => {
    setActiveFilter(item);
    setAnimateCard([{ y: 100, opacity: 0 }]);

    setTimeout(() => {
      setAnimateCard([{ y: 0, opacity: 1 }]);

      if (item === 'All') {
        setFilterProject(projects);
      } else {
        setFilterProject(projects.filter(project => project.tags.includes(item)));
      }
    }, 500);
  };

  const handleModal = index => {
    setActiveProject(index);
    setShowModal(true);
    disableScroll.on();
  };

  useEffect(() => {
    const query = '*[_type == "projects"]';

    client.fetch(query).then(data => {
      setProjects(data);
      setFilterProject(data);
    });
  }, []);

  return (
    <>
      <h2 className={styles.head_text}>
        My <span>Projects</span> Section
      </h2>

      <div className={styles.app__project_filter}>
        {['React', 'Next', 'All'].map((item, index) => (
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
        {filterProject.map((project, index) => (
          <div className={clsx(styles.app__project_item, styles.app__flex)} key={index}>
            <div className={clsx(styles.app__project_img, styles.app__flex)}>
              <img src={urlFor(project.projectImage)} alt={project.title} />

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
                  <Link href={project.codeLink}>
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
                {project.description}
              </p>

              <div className={clsx(styles.app__project_tag, styles.app__flex)}>
                <p className={styles.p_text}>{project?.tags[0]}</p>
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
              <strong>회고 :</strong> {projects[activeProject]?.review}
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
