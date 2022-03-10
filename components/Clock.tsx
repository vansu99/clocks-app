import React, { useState, useEffect } from 'react';
import moment from 'moment';
import { Box, Typography } from '@mui/material';

interface ClockProps {
  children?: React.ReactElement;
}

export default function Clock({ children }: ClockProps) {
  const [currentTime, setCurrentTime] = useState<Date | string>('');

  useEffect(() => {
    const timeInterval = setInterval(() => {
      setCurrentTime(new Date().toISOString());
    }, 1000);

    return () => clearInterval(timeInterval);
  }, []);
  return (
    <Box
      sx={{
        width: 300,
        height: 100,
        textAlign: 'center',
        backgroundColor: 'blue',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      <Typography color="#fff" variant="h3">
        {currentTime && moment(currentTime).format('HH:mm:ss')}
      </Typography>
      <Typography color="#fff" variant="h6">
        {children}
      </Typography>
    </Box>
  );
}
