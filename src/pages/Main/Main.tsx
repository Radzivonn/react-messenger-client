import React, { ComponentProps, FC } from 'react';
import { Outlet } from 'react-router-dom';
import { NavigationSidebar } from '../../modules/Main/NavigationSidebar/NavigationSidebar';
import { Sidebar } from '../../modules/Main/Sidebar/Sidebar';
import './style.scss';

export const Main: FC<ComponentProps<'main'>> = () => {
  return (
    <main className="main-page">
      <div className="main-page__content">
        <NavigationSidebar />
        <Sidebar>
          <Outlet />
        </Sidebar>
      </div>
    </main>
  );
};
