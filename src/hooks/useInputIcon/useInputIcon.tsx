import { HTMLInputTypeAttribute } from 'react';
import OpenedEyeIcon from './assets/opened-eye-icon.svg?react';
import ClosedEyeIcon from './assets/closed-eye-icon.svg?react';
import SearchIcon from './assets/search-icon.svg?react';

export default function useInputIcon(
  type: HTMLInputTypeAttribute,
  isActiveOption: boolean,
): [React.JSX.Element | null, boolean, HTMLInputTypeAttribute] {
  let fieldIcon = null;
  let isInteractive = false;
  let inputType: HTMLInputTypeAttribute = type;

  switch (type) {
    case 'password':
      fieldIcon = isActiveOption ? <ClosedEyeIcon /> : <OpenedEyeIcon />;
      inputType = isActiveOption ? 'text' : 'password';
      isInteractive = true;
      break;
    case 'search':
      fieldIcon = <SearchIcon />;
      break;
  }

  return [fieldIcon, isInteractive, inputType];
}
