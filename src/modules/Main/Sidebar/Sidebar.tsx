import React, { ComponentProps, FC } from 'react';
import './style.scss';
import { useLocation } from 'react-router-dom';
import { mainPageRoutes } from 'router/routes';
import { useAppSettingsStore } from 'store/appSettings/appSettingsStore';
import { LinkToSearching } from './components/LinkToSearching';

export const Sidebar: FC<ComponentProps<'aside'>> = ({ children }) => {
  const { pathname } = useLocation();
  const activeTab = pathname.slice(pathname.lastIndexOf('/') + 1);
  const isFriendsTabOpened = activeTab === mainPageRoutes.friends;
  const isAnyTabOpened = Object.values(mainPageRoutes).find((route) => route === activeTab);

  const isMobile = useAppSettingsStore((state) => state.isMobile);

  return (
    <aside className={`main-sidebar main-sidebar--${isMobile ? 'mobile' : 'desktop'}`}>
      <div className="flex flex-row justify-between">
        <h2 className="main-sidebar__title">
          {isAnyTabOpened ? activeTab : 'Select any tab please'}
        </h2>
        {isFriendsTabOpened && <LinkToSearching />}
      </div>
      <div className="main-sidebar__content">{children}</div>
    </aside>
  );
};
