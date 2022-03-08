import React, { useEffect, useRef } from 'react';
import ReactPlayer from 'react-player/lazy';
import BaseReactPlayer from 'react-player/base';

interface VideoProps {
  videoSrc: string;
  repeat?: boolean;
  isPlaying?: boolean;
  isReplay?: boolean;
}

function Video({
  videoSrc,
  repeat = false,
  isPlaying = false,
  isReplay = false,
}: VideoProps) {
  const playerRef = useRef<BaseReactPlayer<any>>(null);

  useEffect(() => {
    if (isReplay) {
      return playerRef.current?.seekTo(0, 'seconds');
    }
  }, [isReplay]);

  return (
    <ReactPlayer
      width={480}
      height={300}
      loop={repeat}
      url={videoSrc}
      controls={true}
      ref={playerRef}
      playing={isPlaying}
    />
  );
}

export default React.memo(Video);
