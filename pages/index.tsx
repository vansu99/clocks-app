import type { NextPage } from 'next';
import axios from 'axios';
import moment from 'moment';
import Head from 'next/head';
import { ITime } from './types';
import hours from './mocks/hours';
import minutes from './mocks/minutes';
import { useDebounce } from './hooks';
import Clock from './components/Clock';
import Testing from './components/Testing';
import { ChangeEvent, useEffect, useState, useCallback, useRef } from 'react';
import {
  Box,
  Container,
  Select,
  MenuItem,
  TextField,
  Stack,
  Button,
} from '@mui/material';

const Home: NextPage = () => {
  const [targetTime, setTargetTime] = useState<any>({
    hours: 0,
    minutes: 0,
  });
  const [countdownTime, setCountDownTime] = useState<ITime>({
    hours: 0,
    minutes: 0,
    second: 0,
  });

  const [[hrs, mins, secs], setTime] = useState([
    countdownTime.hours,
    countdownTime.minutes,
    countdownTime.second,
  ]);

  const [enable, setEnable] = useState<boolean>(false);
  const [videoSrc, setVideoSrc] = useState<string>(
    'https://www.youtube.com/embed/ySk3mj-A3is'
  );
  const [searchText, setSearchText] = useState<string>('');
  const [alarmTriggered, setAlarmTriggered] = useState<boolean>(false);
  const delaySearchTerm = useDebounce<string>(searchText, 600);
  const videoRef = useRef<HTMLIFrameElement>(null);

  const handleActionVideo = (type: string) => {
    if (videoRef.current?.src !== null) {
      switch (type) {
        case 'play':
          const newVideoLinkPlay = videoRef.current?.src + '?autoplay=1';
          setVideoSrc(newVideoLinkPlay);
          break;

        case 'stop':
          const newVideoLinkStop = videoRef.current?.src + '?autoplay=0';
          setVideoSrc(newVideoLinkStop);

        default:
          return;
      }
    }
  };

  useEffect(() => {
    if (delaySearchTerm) {
      const getVideo = async () => {
        await axios
          .get(
            `https://youtube.googleapis.com/youtube/v3/search?part=snippet&maxResults=25&q=${delaySearchTerm}&key=${process.env.YOUTUBE_API_KEY}`
          )
          .then((res) => {
            setVideoSrc(
              `https://www.youtube.com/embed/${res.data.items[0]?.id?.videoId}`
            );
          });
      };
      getVideo();
    } else {
      setVideoSrc(`https://www.youtube.com/embed/ySk3mj-A3is`);
    }
  }, [delaySearchTerm]);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setSearchText(e.target.value);
  };

  const resetCountDownTime = useCallback(
    () => setTime([countdownTime.hours, countdownTime.minutes, countdownTime.second]),
    [countdownTime.hours, countdownTime.minutes, countdownTime.second]
  );

  const tick = useCallback(() => {
    if (hrs === 0 && mins === 0 && secs === 0) resetCountDownTime();
    else if (mins === 0 && secs === 0) {
      setTime([hrs - 1, 59, 59]);
    } else if (secs === 0) {
      setTime([hrs, mins - 1, 59]);
    } else {
      setTime([hrs, mins, secs - 1]);
    }
  }, [hrs, mins, resetCountDownTime, secs]);

  // set interval for countdown
  useEffect(() => {
    let timeInterval: any = null;
    if (enable) {
      timeInterval = setInterval(() => tick(), 1000);
    } else {
      clearInterval(timeInterval);
    }

    return () => clearInterval(timeInterval);
  }, [enable, hrs, mins, secs, tick]);

  const handleChangeTime = (e: any, type: string) => {
    switch (type) {
      case 'hours':
        setTargetTime({
          ...targetTime,
          hours: Number(e.target.value),
        });
        break;
      case 'minutes':
        setTargetTime({
          ...targetTime,
          minutes: Number(e.target.value),
        });
        break;

      default:
        return;
    }
  };

  // handle Snooze
  const handleSnooze = () => {};

  // handle turn off alarm
  const handleTurnOffAlarm = () => {
    handleActionVideo('stop');
    setAlarmTriggered(false);
  };

  // handle enable alarm clock
  const startAlarm = () => {
    const now = moment(new Date(), 'HH:mm:ss');
    const target = moment(Object.values(targetTime).join(':') + ':00', 'HH:mm:ss');
    const durations = moment.duration(now.diff(target));

    setCountDownTime({
      hours: Math.abs(durations.hours()),
      minutes: Math.abs(durations.minutes()),
      second: Math.abs(durations.seconds()),
    });
    setEnable(true);
  };

  // reset alarm clock
  const resetAlarm = useCallback(() => {
    setEnable(false);
    setSearchText('');
    resetCountDownTime();
    setTargetTime({ hours: 0, minutes: 0 });
    setCountDownTime({ hours: 0, minutes: 0, second: 0 });
  }, [resetCountDownTime]);

  // check countdown
  useEffect(() => {
    const today = moment(new Date()).format('hh:mm');
    const currentCD = moment(Object.values(targetTime).join(':'), 'hh:mm').format(
      'hh:mm'
    );

    if (today === currentCD) {
      resetAlarm();
      setTime([0, 0, 0]);
      setAlarmTriggered(true);
      handleActionVideo('play');
    }
  }, [secs, hrs, mins, targetTime, resetAlarm]);

  return (
    <div>
      <title>Clocks App</title>
      <Head>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Container
        sx={{
          paddingTop: '30px',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}
      >
        <Clock>
          <Testing
            enable={enable}
            hoursMinSecs={{
              hours: hrs,
              minutes: mins,
              seconds: secs,
            }}
          />
        </Clock>
        {<h3 className="countdown">{/* <Countdown millisecond={millisecond} /> */}</h3>}
        <Box sx={{ marginTop: '30px' }}>
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <h2>Wake me up at</h2>
            <Stack
              direction="row"
              justifyContent="center"
              alignItems="center"
              spacing={2}
              sx={{ marginLeft: '30px' }}
            >
              <div>
                <Select
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  value={targetTime.hours}
                  onChange={(e) => handleChangeTime(e, 'hours')}
                >
                  {hours.map((hour, index) => (
                    <MenuItem key={index} value={hour}>
                      {hour}
                    </MenuItem>
                  ))}
                </Select>
              </div>
              <span style={{ fontWeight: 'bold', fontSize: '21px' }}>:</span>
              <div>
                <Select
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  value={targetTime.minutes}
                  onChange={(e) => handleChangeTime(e, 'minutes')}
                >
                  {minutes.map((minute, index) => (
                    <MenuItem key={index} value={minute}>
                      {minute}
                    </MenuItem>
                  ))}
                </Select>
              </div>
            </Stack>
          </Box>
        </Box>
        <Box sx={{ marginTop: '30px' }}>
          <Stack direction="row" alignItems="center" spacing={2}>
            <span>with</span>
            <TextField
              placeholder="Youtube URL or Search Term"
              value={searchText}
              onChange={handleChange}
              sx={{ width: 300 }}
            />
          </Stack>
        </Box>

        {/* Video */}
        <Box sx={{ marginTop: 5 }}>
          <iframe
            ref={videoRef}
            width="460"
            height="270"
            src={videoSrc}
            title="YouTube video player"
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          ></iframe>
        </Box>

        {/* Button trigger alarm clock */}
        {enable ? (
          <Button
            sx={{
              marginTop: 3,
              textTransform: 'capitalize',
              fontWeight: 'bold',
              fontSize: '20px',
            }}
            size="large"
            variant="contained"
            onClick={resetAlarm}
          >
            Disable Alarm
          </Button>
        ) : (
          <Button
            sx={{
              marginTop: 3,
              textTransform: 'capitalize',
              fontWeight: 'bold',
              fontSize: '20px',
            }}
            size="large"
            variant="contained"
            onClick={startAlarm}
          >
            Enable Alarm
          </Button>
        )}

        {alarmTriggered && (
          <Stack direction="row" sx={{ marginTop: 10 }}>
            <Button
              sx={{
                marginRight: 10,
                textTransform: 'capitalize',
                fontWeight: 'bold',
                fontSize: '20px',
              }}
              size="large"
              variant="contained"
              onClick={handleTurnOffAlarm}
            >
              Turn off alarm
            </Button>
            <Button
              sx={{
                textTransform: 'capitalize',
                fontWeight: 'bold',
                fontSize: '20px',
              }}
              size="large"
              variant="contained"
              onClick={handleSnooze}
            >
              Snooze
            </Button>
          </Stack>
        )}
      </Container>
    </div>
  );
};

export default Home;
