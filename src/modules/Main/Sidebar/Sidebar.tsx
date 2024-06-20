import React, { ComponentProps, FC } from 'react';
import './style.scss';
import { Link, useLocation, useSearchParams } from 'react-router-dom';
import { mainPageRoutes } from '../../../router/routes';
import AddFriendIcon from '../../../assets/icons/add-friend-icon.svg?react';
import { Button } from '../../../components/UI/Button/Button';
import { useChatSettingsStore } from '../../../store/chatSettings/chatSettingsStore';

export const Sidebar: FC<ComponentProps<'aside'>> = ({ children }) => {
  const isMobile = useChatSettingsStore((state) => state.isMobile);
  const { pathname } = useLocation();
  const [searchParams] = useSearchParams();
  const activeTab = pathname.slice(pathname.lastIndexOf('/') + 1);
  const isFriendsTabOpened = activeTab === mainPageRoutes.friends;
  const isAnyTabOpened = Object.values(mainPageRoutes).find((route) => route === activeTab);

  return (
    <aside className={`main-sidebar main-sidebar--${isMobile ? 'mobile' : 'desktop'}`}>
      <div className="flex flex-row justify-between">
        <h2 className="main-sidebar__title">
          {isAnyTabOpened ? activeTab : 'Select any tab please'}
        </h2>
        {isFriendsTabOpened && (
          <Link
            to={`${mainPageRoutes.searching}?${searchParams.toString()}`}
            className="self-center"
          >
            <Button accent className="form__button button--icon-only">
              <AddFriendIcon className="icon" />
            </Button>
          </Link>
        )}
      </div>
      <div className="main-sidebar__content">{children}</div>
    </aside>
  );
};
