import React, { useCallback, useEffect, useState } from 'react';
import { Button, Stack, Box, Typography } from '@mui/material';
import { formatTimer, padTime } from '../utils';

interface ITime {
  hours: number;
  seconds: number;
  minutes: number;
  millisecond: number;
}

interface IStep {
  fulltime: ITime;
  diffTime: ITime;
  miliTime: number;
}

export default function Stopwatch() {
  const [isStart, setIsStart] = React.useState<boolean>(true);
  const [isPending, setIsPending] = React.useState<boolean>(false);
  const [steps, setSteps] = useState<IStep[]>([]);
  const [enable, setEnable] = useState<any>();
  const [miliTime, setMiliTime] = useState<number>(0);
  const [time, setTime] = useState<ITime>({
    millisecond: 0,
    seconds: 0,
    minutes: 0,
    hours: 0,
  });

  const resetInterval = useCallback(() => {
    if (enable) {
      clearInterval(enable);
      setEnable(undefined);
    }
  }, [enable]);

  const startTime = () => {
    if (!enable) {
      const timeInterval = setInterval(() => {
        tick();
      }, 10);
      setEnable(timeInterval);
    }
    setIsStart(false);
    setIsPending(true);
  };

  const pauseTime = () => {
    resetInterval();
    setMiliTime(miliTime);
    setIsStart(true);
    setIsPending(false);
  };

  const resetTime = () => {
    resetInterval();
    setMiliTime(0);
    setSteps([]);
  };

  const tick = () => {
    setMiliTime((prev) => prev + 10);
  };

  const lapTime = () => {
    const previousStep = steps[steps.length - 1];
    let previousTime = 0;
    if (previousStep) previousTime = previousStep.miliTime ? previousStep.miliTime : 0;

    const diff = miliTime - previousTime;

    const newStep: IStep = {
      miliTime: miliTime,
      fulltime: formatTimer(miliTime),
      diffTime: formatTimer(diff),
    };

    setSteps((prev) => [...prev, newStep]);
  };

  useEffect(() => {
    setTime(formatTimer(miliTime));
  }, [miliTime]);

  return (
    <Stack direction="column" alignItems="center" justifyContent="center">
      <Box
        bgcolor="#1976d2"
        marginY={6}
        sx={{
          width: '300px',
          height: '100px',
          lineHeight: '100px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          color: '#fff',
          borderRadius: '4px',
        }}
      >
        <Typography variant="h4">{padTime(time.hours)}</Typography>{' '}
        <Typography variant="body1" sx={{ fontSize: '20px', marginX: '2px' }}>
          :
        </Typography>
        <Typography variant="h4">{padTime(time.minutes)}</Typography>{' '}
        <Typography variant="body1" sx={{ fontSize: '20px', marginX: '2px' }}>
          :
        </Typography>
        <Typography variant="h4">{padTime(time.seconds)}</Typography>
        <Typography variant="body1" sx={{ fontSize: '20px', marginX: '2px' }}>
          .
        </Typography>
        <Typography variant="h6">{padTime(time.millisecond, 3)}</Typography>
      </Box>
      {isStart && (
        <Button onClick={startTime} variant="contained">
          Start
        </Button>
      )}
      {isPending && (
        <Stack direction="row">
          <Button onClick={lapTime} variant="contained">
            Lap
          </Button>
          <Button onClick={pauseTime} variant="outlined" sx={{ marginLeft: 2 }}>
            Pause
          </Button>
        </Stack>
      )}
      <Box marginTop={5}>
        <Stack direction="column" rowGap={2}>
          {steps
            .slice(0)
            .reverse()
            .map((step, index) => (
              <Stack direction="row" gap={3} key={index}>
                <Box
                  sx={{
                    width: '100px',
                    color: '#fff',
                    textAlign: 'center',
                    lineHeight: '30px',
                    backgroundColor: '#1976d2',
                  }}
                >
                  Lap {steps.length - index}
                </Box>
                <Typography variant="h6">
                  + {padTime(step.diffTime.hours)}:{padTime(step.diffTime.minutes)}:
                  {padTime(step.diffTime.seconds)}:{padTime(step.diffTime.millisecond, 3)}
                </Typography>
                <Typography variant="h6">
                  {padTime(step.fulltime.hours)}:{padTime(step.fulltime.minutes)}:
                  {padTime(step.fulltime.seconds)}:{padTime(step.fulltime.millisecond, 3)}
                </Typography>
              </Stack>
            ))}
        </Stack>
      </Box>
    </Stack>
  );
}
