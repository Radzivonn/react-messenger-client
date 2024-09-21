import { ComponentProps, FC } from 'react';
import './style.scss';

interface Props extends ComponentProps<'div'> {
  imagePath: string;
  onImageClose: () => void;
}

export const OpenedImage: FC<Props> = ({ imagePath, onImageClose }) => {
  return (
    <div className="opened-image-wrapper">
      <img className="opened-image" src={imagePath} alt="opened-image" />
      <div id="cross" onClick={() => onImageClose()}></div>
    </div>
  );
};
