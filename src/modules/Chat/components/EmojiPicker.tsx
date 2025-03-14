import { FC } from 'react';
import data from '@emoji-mart/data';
import Picker from '@emoji-mart/react';

interface Props {
  setInputValue: React.Dispatch<React.SetStateAction<string>>;
}

const MOBILE_BREAKPOINT = 480;
const MAX_PER_LINE = 9;
const MIN_PER_LINE = 6;

export const EmojiPicker: FC<Props> = ({ setInputValue }) => {
  return (
    <div className="absolute bottom-16 right-0 self-end" data-testid="emoji-picker">
      <Picker
        className="self-end"
        data={data}
        previewPosition="none"
        navPosition="bottom"
        perLine={window.innerWidth > MOBILE_BREAKPOINT ? MAX_PER_LINE : MIN_PER_LINE}
        maxFrequentRows={3}
        onEmojiSelect={(e: { native: string }) => setInputValue((prev) => prev + e.native)}
      />
    </div>
  );
};
