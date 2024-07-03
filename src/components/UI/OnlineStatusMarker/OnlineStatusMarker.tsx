import React, { FC } from 'react';

export const OnlineStatusMarker: FC = () => {
  return (
    <svg className="relative translate-x-[20%] translate-y-5" height="15">
      <circle cx="50%" cy="50%" r="6" fill="var(--online-status-marker-color)" />
    </svg>
  );
};
