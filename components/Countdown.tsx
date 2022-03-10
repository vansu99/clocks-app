import React, { memo } from 'react';

type ITimer = 'hours' | 'minutes' | 'seconds';

function Countdown({ hoursMinSecs }: any) {
  const { hours = 0, minutes, seconds }: Record<ITimer, number> = hoursMinSecs;

  return (
    <>
      {`${hours?.toString().padStart(2, '0')}:${minutes
        .toString()
        .padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`}
    </>
  );
}

export default memo(Countdown);
