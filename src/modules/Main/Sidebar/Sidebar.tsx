import React, { ComponentProps, FC } from 'react';
import './style.scss';
import { useLocation } from 'react-router-dom';
import routes from '../../../router/routes';

export const Sidebar: FC<ComponentProps<'aside'>> = ({ children }) => {
  const { pathname } = useLocation();
  const activeTab = pathname.slice(pathname.lastIndexOf('/') + 1);

  const isAnyTabOpened = (tab: string) => tab === routes.chats || tab === routes.friends;

  return (
    <aside className="main-sidebar">
      <h2 className="main-sidebar__title">
        {isAnyTabOpened(activeTab) ? activeTab : 'Select any tab please'}
      </h2>
      <div className="main-sidebar__content">{children}</div>
    </aside>
  );
};
