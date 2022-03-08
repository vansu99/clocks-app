import React, { memo } from 'react';

function Countdown({ hoursMinSecs }: any) {
  const { hours = 0, minutes, seconds } = hoursMinSecs;

  return (
    <>
      {`${hours?.toString().padStart(2, '0')}:${minutes
        .toString()
        .padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`}
    </>
  );
}

export default memo(Countdown);
