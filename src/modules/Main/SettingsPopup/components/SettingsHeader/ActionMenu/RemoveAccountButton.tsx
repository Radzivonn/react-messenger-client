import { ComponentProps, FC } from 'react';
import { Button } from 'components/UI/Button/Button';
import RecycleBinIcon from '../../assets/recycle-bin-icon.svg?react';
import { useUserData } from 'hooks/useUserData/useUserData';
import { TailSpinner } from 'components/UI/Loaders/TailSpinner';
import { useRemoveAccount } from 'hooks/useAuthMutations/useRemoveAccount';

export const RemoveAccountButton: FC<ComponentProps<'button'>> = ({ className, children }) => {
  const { isFetching, data } = useUserData();
  const { mutate: removeAccount } = useRemoveAccount();

  if (isFetching || !data) return <TailSpinner />;

  return (
    <Button className={className} onClick={() => removeAccount({ userId: data.id })}>
      <RecycleBinIcon stroke="var(--red-selection)" />
      {children}
    </Button>
  );
};
