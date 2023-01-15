import React, { useEffect, useRef, useState } from "react";
import { NextPage } from "next";
import Image from "next/image";
import Link from "next/link";
import { HiVolumeUp, HiVolumeOff } from "react-icons/hi";
import { BsFillPlayFill, BsFillPauseFill } from "react-icons/bs";
import { GoVerified } from "react-icons/go";
import { BsPlay } from "react-icons/bs";
import { video } from "../types/video";

const Videocard = ({ post }: video) => {
  const [isPlayed, setIsPlayed] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [isHover, setIsHover] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);

  const onVideoPress = (e: any) => {
    e.stopPropagation();
    e.nativeEvent.stopImmediatePropagation();
    console.log("------ clicking ------");
    if (isPlayed) {
      videoRef?.current?.pause();
      setIsPlayed(false);
    } else {
      videoRef?.current?.play();
      setIsPlayed(true);
    }
  };

  const onSoundPress = (e: any) => {
    e.stopPropagation();
    e.nativeEvent.stopImmediatePropagation();
    if (isMuted) {
      setIsMuted(false);
      videoRef.current?.muted === false;
    } else {
      setIsMuted(true);
      videoRef.current?.muted === true;
    }
  };

  return (
    <div>
      <div className="flex gap-3 cursor-pointer font-semibold rounded items-center">
        <Link href={`/profile/${post.postedBy._id}`}>
          <div className="relative md:w-16 md:h-16 w-10 h-10 rounded-full overflow-hidden">
            <Image
              src={post.postedBy.profileImage}
              alt="tiktik-logo"
              layout="fill"
              className="cursor-pointer"
            />
          </div>
        </Link>
        <div>
          <p className=" md:text-md font-bold text-primary">
            {post.postedBy.name}
          </p>
          <p className="text-gray-400 font-normal">{post.caption}</p>
        </div>
      </div>
      <div className="lg:ml-20  relative">
        <div
          onMouseEnter={() => setIsHover(true)}
          onMouseLeave={() => setIsHover(false)}
          className="rounded-3xl"
        >
          <Link href={`/video/${post._id}`}>
            <video
              muted={isMuted}
              ref={videoRef}
              className="lg:w-[600px] w-[200px] h-[300px] md:h-[400px] lg:h-[530px] bg-gray-100 rounded-2xl cursor-pointer lg:mt-0 mt-4"
            >
              <source src={post.video} />
            </video>
          </Link>
        </div>
        {isHover && (
          <div
            onMouseEnter={() => setIsHover(true)}
            className=" absolute bottom-6 p-2 flex lg:w-[600px] w-[200px] justify-evenly"
          >
            {isPlayed ? (
              <BsFillPauseFill
                onClick={onVideoPress}
                className="text-black text-2xl lg:text-4xl"
              />
            ) : (
              <BsFillPlayFill
                onClick={onVideoPress}
                className="text-black text-2xl lg:text-4xl"
              />
            )}
            {isMuted ? (
              <HiVolumeOff
                onClick={onSoundPress}
                className="text-black text-2xl lg:text-4xl"
              />
            ) : (
              <HiVolumeUp
                onClick={onSoundPress}
                className="text-black text-2xl lg:text-4xl"
              />
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default Videocard;
