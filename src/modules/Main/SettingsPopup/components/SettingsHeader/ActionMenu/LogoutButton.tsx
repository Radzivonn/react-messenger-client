import { ComponentProps, FC } from 'react';
import { Button } from 'components/UI/Button/Button';
import LogoutIcon from '../../assets/logout-icon.svg?react';
import { useUserData } from 'hooks/useUserData/useUserData';
import { TailSpinner } from 'components/UI/Loaders/TailSpinner';
import { useLogout } from 'hooks/useAuthMutations/useLogout';

export const LogoutButton: FC<ComponentProps<'button'>> = ({ className, children }) => {
  const { isFetching, data } = useUserData();
  const { mutate: logout } = useLogout();

  if (isFetching || !data) return <TailSpinner />;

  return (
    <Button className={className} onClick={() => logout({ userId: data.id })}>
      <LogoutIcon stroke="var(--red-selection)" />
      {children}
    </Button>
  );
};
