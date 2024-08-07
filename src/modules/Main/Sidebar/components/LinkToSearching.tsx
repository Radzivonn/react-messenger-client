import React, { FC } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import { mainPageRoutes } from '../../../../router/routes';
import AddFriendIcon from '../../../../assets/icons/add-friend-icon.svg?react';
import { Button } from '../../../../components/UI/Button/Button';

export const LinkToSearching: FC = () => {
  const [searchParams] = useSearchParams();

  return (
    <Link to={`${mainPageRoutes.searching}?${searchParams.toString()}`} className="self-center">
      <Button accent className="form__button button--icon-only">
        <AddFriendIcon />
      </Button>
    </Link>
  );
};
