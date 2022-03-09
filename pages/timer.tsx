import { Box, Stack, Button, TextField, Typography } from '@mui/material';
import { styled } from '@mui/material/styles';
import React, { ChangeEvent, useCallback, useEffect, useState } from 'react';

export interface Time {
  hours: number;
  minutes: number;
  second: number;
}

const StyledTextField = styled(TextField)({
  '&.MuiFormControl-root': {
    width: '60px',
    marginRight: '10px',
  },
  '& .MuiInputBase-input': {
    textAlign: 'center',
  },
});

export default function Timer() {
  const [firstTimeStart, setFirstTimeStart] = useState<number>(1); // second input
  const [secondTime, setSecondTime] = useState<number>(firstTimeStart);
  const [enable, setEnable] = useState<any>();
  const [timeStart, setTimeStart] = useState<boolean>(true);
  const [timeStop, setTimeStop] = useState<boolean>(false);
  const [timePending, setTimePending] = useState<boolean>(false);
  const [notify, setNotify] = useState<boolean>(false);
  const [time, setTime] = useState<Time>({
    hours: 0,
    minutes: 0,
    second: 1,
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
      //setTimePending(true);
      setTimeStart(false)
      setTimeStop(true)
    }
    //setTimeStart(true);
  };

  const pauseCountdown = () => {
    reset();
    setTimePending(false);
    setTimeStart(true);
    setTimeStop(false)
  };

  const handleSelectTime = (timer: number) => {
    setTime({
      ...time,
      second: time.second + timer,
    });
    setSecondTime((val) => val + timer);
    //setEnable(undefined);
    startCountdown();
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
    setEnable(undefined);
    setNotify(false);
    setTimePending(false);
    setTimeStop(false)
    setTimeStart(true)
    setSecondTime(1)
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
    if (time.hours === 0 && time.minutes === 0 && secondTime === 0) {
      reset();
      setNotify(true);
      setTimeStop(false);
      setTimePending(true);
    }
  }, [reset, secondTime, time.hours, time.minutes, time.second]);

  return (
    <Stack direction="column" alignItems="center" paddingY={10}>
      {notify ? (
        <Typography variant="h5" marginBottom={3}>
          Ring ring ring...
        </Typography>
      ) : null}

      <Box
        sx={{
          color: '#fff',
          fontSize: '36px',
          width: '260px',
          height: '100px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          borderRadius: '4px',
          backgroundColor: '#1976d2',
        }}
      >
        {separateTimer(time.hours)}:{separateTimer(time.minutes)}:
        {separateTimer(time.second)}
      </Box>

      {/* input timer */}
      <Box marginY={3}>
        <StyledTextField
          type="text"
          name="hours"
          value={time.hours}
          onChange={handleChangeTime}
        />
        <StyledTextField
          type="text"
          name="minutes"
          value={time.minutes}
          onChange={handleChangeTime}
        />
        <StyledTextField
          type="text"
          name="second"
          value={time.second}
          onChange={handleChangeTime}
        />
      </Box>

      {/* button add time */}
      <Stack direction="row">
        <Button
          onClick={() => handleSelectTime(Number(15))}
          variant="contained"
          sx={{
            textTransform: 'lowercase',
            borderRadius: '5px 0 0 5px',
          }}
        >
          +15s
        </Button>
        <Button
          onClick={() => handleSelectTime(Number(30))}
          variant="contained"
          sx={{
            textTransform: 'lowercase',
            borderRadius: 0,
          }}
        >
          +30s
        </Button>
        <Button
          onClick={() => handleSelectTime(Number(45))}
          variant="contained"
          sx={{
            textTransform: 'lowercase',
            borderRadius: 0,
          }}
        >
          +45s
        </Button>
        <Button
          onClick={() => handleSelectTime(Number(60))}
          variant="contained"
          sx={{
            textTransform: 'lowercase',
            borderRadius: '0 5px 5px 0',
          }}
        >
          +1m
        </Button>
      </Stack>

      <Box marginTop={3}>
        {timeStart && (
          <Button variant="contained" onClick={startCountdown}>
            Start Timer
          </Button>
        )}

        {timeStop && (
          <Button variant="contained" onClick={pauseCountdown}>
            Stop Timer
          </Button>
        )}

        {secondTime === 0 && timePending && (
          <Button variant="contained" onClick={resetTimer}>
            Reset Timer
          </Button>
        )}
      </Box>
    </Stack>
  );
}
