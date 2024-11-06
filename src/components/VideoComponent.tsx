"use client";

import * as mp4s from "@/assets/videos/mp4";
import { useEffect, useRef } from "react";

type TKeyMp4 = keyof typeof mp4s;

export type TVideoComponentKey = TKeyMp4;

export type TVideoComponentProps = Omit<
  React.VideoHTMLAttributes<HTMLVideoElement>,
  "src"
> & {
  video: TVideoComponentKey;
  isPausing: boolean;
};

export const VideoComponent: React.FC<TVideoComponentProps> = (props) => {
  const { video, isPausing, ...others } = props;
  const Mp4 = mp4s[video as TKeyMp4];
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    if (isPausing) {
      if (videoRef.current) {
        videoRef.current.pause();
      }
    }
  }, [isPausing]);

  if (Mp4) {
    return (
      <video
        ref={videoRef}
        {...others}
        className={`video-component ${props.className || ""}`}
      >
        <source src={Mp4} type="video/mp4" />
      </video>
    );
  }
  return <div></div>;
};
