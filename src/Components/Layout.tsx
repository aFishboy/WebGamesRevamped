import React from 'react';
import Nav from './Nav';
import { Outlet } from 'react-router-dom';

const Layout: React.FC = () => {
  return (
    <div>
      <Nav />
      <div>
        <Outlet />
      </div>
    </div>
  );
};

export default Layout;
