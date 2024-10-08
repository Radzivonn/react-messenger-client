import { useState } from 'react';
import { useUserData } from 'hooks/useUserData/useUserData';
import { TailSpinner } from 'components/UI/Loaders/TailSpinner';
import { AvatarImage } from 'components/UI/AvatarUI/AvatarImage';
import { ChangeAvatarButton } from 'components/UI/AvatarUI/ChangeAvatarButton';
import { EditInfoPopup } from './EditInfoPopup';
import { editingOptions } from './editingOptions';
import PersonIcon from '../assets/person-circle-outline.svg?react';

export const UserData = () => {
  const [editingOption, setEditingOption] = useState<editingOptions | null>(null);
  const [currentInfo, setCurrentInfo] = useState<string | null>(null);
  const { isFetching, data } = useUserData();
  const isEditingPopupOpened = editingOption && currentInfo;

  if (isFetching || !data) return <TailSpinner />;

  return (
    <>
      <div className="user-data" data-testid="user-data-block">
        <AvatarImage
          className="h-36 w-36 text-5xl"
          userId={data.id}
          name={data.name}
          isOnline={false}
          isOpenable={true}
        >
          <ChangeAvatarButton userId={data.id} />
        </AvatarImage>
        <div
          data-testid="name-option"
          className="user-data__option"
          onClick={() => {
            setEditingOption('Name');
            setCurrentInfo(data.name);
          }}
        >
          <div className="flex items-center gap-5">
            <PersonIcon />
            <p>Name</p>
          </div>
          <p className="option-value">{data.name}</p>
        </div>
      </div>
      {isEditingPopupOpened && (
        <EditInfoPopup
          userId={data.id}
          currentInfo={currentInfo}
          editingOption={editingOption}
          onCancelCallback={() => {
            setEditingOption(null);
            setCurrentInfo(null);
          }}
        />
      )}
    </>
  );
};
