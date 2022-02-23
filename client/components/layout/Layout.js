import Header from '../Header';

import { Navigation } from '../';

const Layout = ({ children }) => {
  return (
    <>
      <Header />
      <Navigation />
      {children}
    </>
  );
};

export default Layout;
