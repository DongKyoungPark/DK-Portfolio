import { client } from '../utils/client';

import { Intro, About, Skills, Projects, Contact } from '../container';

import styles from '../styles/App.module.scss';

const App = ({ abouts, experiences, skills, projects }) => {
  return (
    <div className={styles.app}>
      <Intro />
      <About abouts={abouts} />
      <Skills experiences={experiences} skills={skills} />
      <Projects projects={projects} />
      <Contact />
    </div>
  );
};

export default App;

export const getServerSideProps = async context => {
  const aboutsQuery = '*[_type == "abouts"]';
  const abouts = await client.fetch(aboutsQuery).then(res => res);

  const expQuery = '*[_type == "experiences"]';
  const experiences = await client.fetch(expQuery).then(res => res);

  const skillsQuery = '*[_type == "skills"]';
  const skills = await client.fetch(skillsQuery).then(res => res);

  const projectsQuery = '*[_type == "projects"]';
  const projects = await client.fetch(projectsQuery).then(res => res);

  return {
    props: { abouts, experiences, skills, projects },
  };
};
