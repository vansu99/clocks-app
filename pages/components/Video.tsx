import React from 'react';
import ReactPlayer from 'react-player/lazy';

interface VideoProps {
  videoSrc: string;
  repeat?: boolean;
  isPlaying?: boolean;
}

function Video({ videoSrc, repeat = false, isPlaying = false }: VideoProps) {
  return (
    <ReactPlayer
      width={480}
      height={300}
      loop={repeat}
      url={videoSrc}
      controls={true}
      playing={isPlaying}
    />
  );
}

export default React.memo(Video);
