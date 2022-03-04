import React from 'react';

interface CountdownProps {
  millisecond: number;
}

export default function Countdown({ millisecond }: CountdownProps) {
  const getTime = (timeInMilliseconds: number) => {
    let time = timeInMilliseconds;
    const hours = formatUnitOfTime(Math.floor(time / (60 * 60 * 1000)));
    time = time % (60 * 60 * 1000);
    const minutes = formatUnitOfTime(Math.floor(time / (60 * 1000)));
    time = time % (60 * 1000);
    const seconds = formatUnitOfTime(Math.floor(time / 1000));
    const milliseconds = formatUnitOfTime(time % 1000);
    return `${hours}:${minutes}:${seconds}`;
  };

  const formatUnitOfTime = (unitOfTime: number) => {
    return unitOfTime < 10
      ? `0${unitOfTime}`.substring(0, 2)
      : unitOfTime.toString().substring(0, 2);
  };

  return <div>{getTime(millisecond)}</div>;
}
