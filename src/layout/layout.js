import { Outlet } from 'react-router-dom';
import Navigation from 'components/organisms/Navigation/Navigation';
function Layout() {
  return (
    <>
      <Navigation />
      <Outlet />
    </>
  );
}

export default Layout;
