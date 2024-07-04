import React, { FC } from 'react';

export const OnlineStatusMarker: FC = () => {
  return (
    <svg className="relative translate-x-1/3 translate-y-5" height="18">
      <circle className="online-status-marker" cx="50%" cy="50%" r="7" />
    </svg>
  );
};
