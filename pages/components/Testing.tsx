import React, { memo, useCallback } from 'react';

function Testing({ hoursMinSecs, enable }: any) {
  const { hours, minutes, seconds } = hoursMinSecs;
  // const [[hrs, mins, secs], setTime] = React.useState([hours, minutes, seconds]);

  // const resetCountDownTime = useCallback(
  //   () => setTime([parseInt(hours), parseInt(minutes), parseInt(seconds)]),
  //   [hours, minutes, seconds]
  // );

  // const tick = useCallback(() => {
  //   if (hrs === 0 && mins === 0 && secs === 0) resetCountDownTime();
  //   else if (mins === 0 && secs === 0) {
  //     setTime([hrs - 1, 59, 59]);
  //   } else if (secs === 0) {
  //     setTime([hrs, mins - 1, 59]);
  //   } else {
  //     setTime([hrs, mins, secs - 1]);
  //   }
  // }, [hrs, mins, resetCountDownTime, secs]);

  // React.useEffect(() => {
  //   let timeInterval: any = null;
  //   if ((hrs !== 0 && mins !== 0 && secs !== 0) || enable) {
  //     timeInterval = setInterval(() => tick(), 1000);
  //   } else {
  //     clearInterval(timeInterval);
  //   }

  //   return () => clearInterval(timeInterval);
  // }, [enable, hrs, mins, secs, tick]);

  return (
    <>
      {`${hours.toString().padStart(2, '0')}:${minutes
        .toString()
        .padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`}
    </>
  );
}

export default memo(Testing);
