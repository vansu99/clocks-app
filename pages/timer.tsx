import React, { ChangeEvent, useCallback, useEffect, useState } from 'react';

export interface Time {
  hours: number;
  minutes: number;
  second: number;
}

export default function Timer() {
  const [firstTimeStart, setFirstTimeStart] = useState<number>(1); // second input
  const [secondTime, setSecondTime] = useState<number>(firstTimeStart);
  const [enable, setEnable] = useState<any>();
  const [timePending, setTimePending] = useState<boolean>(false);
  const [notify, setNotify] = useState<boolean>(false);
  const [time, setTime] = useState<Time>({
    hours: 0,
    minutes: 0,
    second: 0,
  });

  const formatTime = (time: number) => {
    const minutes = Math.floor(time / 60);
    const second = time - minutes * 60;
    const hours = Math.floor(time / 3600);

    const newObj = {
      hours,
      minutes,
      second,
    };

    return newObj;
  };

  const separateTimer = (time: any) => {
    let element = ('00' + time).slice(-2);
    return element;
  };

  const reset = useCallback(() => {
    if (enable) {
      clearInterval(enable);
      setEnable(undefined);
    }
  }, [enable]);

  const startCountdown = () => {
    const times = Object.values(time);
    const cal = times
      .reverse()
      .reduce((prev, curr: any, i) => prev + curr * Math.pow(60, i), 0);

    if (secondTime <= 1) setSecondTime(cal);
    
    if (!enable) {
      const countDownTimer = setInterval(() => {
        setSecondTime((val) => val - 1);
      }, 100);
      setEnable(countDownTimer);
      setTimePending(true);
    }
  };

  const pauseCountdown = () => {
    reset();
  };

  const handleSelectTime = (timer: number) => {
    //setFirstTimeStart(timer);
    //setSecondTime(timer);
    setTime({
      ...time,
      second: time.second + timer,
    });
    //reset();
  };

  const handleChangeTime = (e: ChangeEvent<HTMLInputElement>) => {
    setTime({
      ...time,
      [e.target.name]: e.target.value,
    });
    reset();
  };

  // reset timer
  const resetTimer = () => {
    setEnable(false);
    setNotify(false);
    setTimePending(false);
    setTime({
      hours: 0,
      minutes: 0,
      second: 0,
    });
  };

  const getDiff = useCallback(() => {
    let diff = secondTime;
    if (diff < 0) diff = 0;
    return diff;
  }, [secondTime]);

  useEffect(() => {
    let diff = getDiff();
    setTime(formatTime(diff));
  }, [getDiff, secondTime]);

  useEffect(() => {
    if (secondTime === 0) {
      reset();
      setNotify(true);
      setTimePending(false);
    }
  }, [reset, secondTime]);

  return (
    <div>
      {notify && <p>Ring ring ring...</p>}
      <div>
        <input
          type="number"
          name="hours"
          value={time.hours}
          onChange={handleChangeTime}
        />
        <input
          type="number"
          name="minutes"
          value={time.minutes}
          onChange={handleChangeTime}
        />
        <input
          type="number"
          name="second"
          value={time.second}
          onChange={handleChangeTime}
        />
      </div>
      <div>
        {separateTimer(time.hours)}:{separateTimer(time.minutes)}:
        {separateTimer(time.second)}
      </div>
      <div>
        <select onChange={(e) => handleSelectTime(Number(e.target.value))}>
          <option value="1">1s</option>
          <option value="15">15s</option>
          <option value="30">30s</option>
          <option value="45">45s</option>
          <option value="60">1m</option>
          <option value="120">2m</option>
        </select>
      </div>

      {timePending ? (
        <button onClick={pauseCountdown}>Stop Timer</button>
      ) : (
        <button onClick={startCountdown}>Start Timer</button>
      )}
      {secondTime === 0 && <button onClick={resetTimer}>Reset Timer</button>}
    </div>
  );
}

// su dung secondTime de co the countdown, vi nhan vao se bao gom gio, phut, giay
// tu do se calculate thanh tong so giay
