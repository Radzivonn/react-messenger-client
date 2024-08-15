import React, { FC } from 'react';
import Picker from '@emoji-mart/react';

interface Props {
  setInputValue: React.Dispatch<React.SetStateAction<string>>;
}

export const EmojiPicker: FC<Props> = ({ setInputValue }) => {
  return (
    <div className="absolute bottom-16 right-0 self-end">
      <Picker
        className="self-end"
        set="google"
        previewPosition="none"
        navPosition="bottom"
        onEmojiSelect={(e: { native: string }) => setInputValue((prev) => prev + e.native)}
      />
    </div>
  );
};
