import { FC } from 'react';
import { ChildrenProps } from './types';
import { useSearchParams } from 'react-router-dom';
import { useAppSettingsStore } from 'store/appSettings/appSettingsStore';
import { Button } from 'components/UI/Button/Button';
import ArrowIcon from '../../../assets/arrow_left_icon.svg?react';

export const MobileHeader: FC<ChildrenProps> = ({ children }) => {
  const [_searchParams, setSearchParams] = useSearchParams();
  const setIsChatOpened = useAppSettingsStore((state) => state.setIsChatOpened);

  const onCloseChat = () => {
    setSearchParams({}, { replace: true });
    setIsChatOpened(false);
  };

  return (
    <section className="friend-header friend-header--mobile">
      <Button className="button--icon-only" onClick={() => onCloseChat()}>
        <ArrowIcon className="icon w-7" />
      </Button>
      {children}
    </section>
  );
};
