import Head from 'next/head';

const Header = ({ title, description }) => {
  return (
    <>
      <Head>
        <title>{title ? `${title} | DK-Portfolio` : 'DK-Portfolio'}</title>
        {description && <meta name='Web Development Portfolio' content={description}></meta>}
      </Head>
    </>
  );
};

export default Header;
