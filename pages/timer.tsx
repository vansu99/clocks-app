import React, { ChangeEvent, useCallback, useEffect, useState } from 'react';
import DateAdapter from '@mui/lab/AdapterMoment';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import { TextField } from '@mui/material';
import TimePicker from '@mui/lab/TimePicker';
import moment from 'moment';

interface Time {
  hours: number;
  minutes: number;
  second: number;
}

export default function Timer() {
  const [firstTimeStart, setFirstTimeStart] = useState<number>(1); // second input
  const [secondTime, setSecondTime] = useState<number>(firstTimeStart);
  const [enable, setEnable] = useState<any>();
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

      console.log(cal)
    if (secondTime <= 1) setSecondTime(firstTimeStart);

    const target = new Date(new Date().getTime() + firstTimeStart);

    if (!enable) {
      const countDownTimer = setInterval(() => {
        setSecondTime((val) => val - 1);
      }, 100);
      setEnable(countDownTimer);
    }
  };

  const pauseCountdown = () => {
    reset();
  };

  const handleSelectTime = (time: number) => {
    setFirstTimeStart(time);
    setSecondTime(time);

    reset();
  };

  const handleChangeTime = (e: ChangeEvent<HTMLInputElement>) => {
    //setFirstTimeStart(val?.toISOString());
    //setSecondTime(val?.toISOString());

    setTime({
      ...time,
      [e.target.name]: e.target.value,
    });
    reset();
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
    }
  }, [reset, secondTime]);

  return (
    <div>
      {notify && <p>Ring ring ring...</p>}
      {/* <LocalizationProvider dateAdapter={DateAdapter}>
        <TimePicker
          label="Time"
          value="x"
          onChange={handleChangeTime}
          renderInput={(params: any) => <TextField {...params} />}
        />
      </LocalizationProvider> */}
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
      <button onClick={startCountdown}>Start Timer</button>
      {enable && <button onClick={pauseCountdown}>Pause</button>}
    </div>
  );
}
