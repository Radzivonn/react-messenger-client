import { RefObject, useEffect } from 'react';

export const useClickOnSpecific = (
  ref: RefObject<HTMLElement>,
  handleOnClickSpecificElement: (event: MouseEvent | TouchEvent) => void,
) => {
  useEffect(() => {
    const listener = (event: MouseEvent | TouchEvent) => {
      if (ref.current && ref.current === event.target) {
        handleOnClickSpecificElement(event);
      }
    };
    document.addEventListener('mousedown', listener);
    document.addEventListener('touchstart', listener);
    return () => {
      document.removeEventListener('mousedown', listener);
      document.removeEventListener('touchstart', listener);
    };
  }, [ref, handleOnClickSpecificElement]);
};
