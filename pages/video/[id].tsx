import React, { useState, useEffect, useRef } from "react";
import { useRouter } from "next/router";
import Link from "next/link";
import Image from "next/image";
import { GoVerified } from "react-icons/go";
import { MdOutlineCancel } from "react-icons/md";
import { BsFillPlayFill, BsFillPauseFill } from "react-icons/bs";
import { HiVolumeUp, HiVolumeOff } from "react-icons/hi";
import Axios from "axios";
import { video } from "../../types/video";
import { BASE_URL } from "../../utils/constants";
import { AiOutlineCloseCircle } from "react-icons/ai";

import LikeButton from "../../components/LikeButton";
import { useSelector } from "react-redux";
import Comments from "../../components/Comments";

export default function videoDetail({ videoPost }: video) {
  const router = useRouter();
  const [isPlayed, setIsPlayed] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [isHover, setIsHover] = useState(false);
  const [post, setPost] = useState(videoPost);
  const videoRef = useRef<HTMLVideoElement>(null);
  const user = useSelector((state: any) => state?.user?.user);
  const [isLiked, setIsLiked] = useState(false);
  const [comment, setComment] = useState("");
  const [isCommenting, setIsCommenting] = useState(false);

  const addComment = async () => {
    const { data } = await Axios.put(`${BASE_URL}/api/posts`, {
      userId: user._id,
      comment,
      postId: router.query.id,
    });
    setPost(data);
    console.log("Data--- of comment", data);
    setComment("");
  };

  const onVideoPress = () => {
    console.log("------");
    if (isPlayed) {
      videoRef?.current?.pause();
      setIsPlayed(false);
    } else {
      videoRef?.current?.play();
      setIsPlayed(true);
    }
  };

  useEffect(() => {
    if (post) {
      setIsPlayed(true);
      videoRef?.current?.play();
    }
  }, []);

  useEffect(() => {
    const isLike = post.likes.find((like: string) => like === user?._id);
    setIsLiked(isLike);
  }, []);

  const handleLikePost = async () => {
    const { data } = await Axios.put(`${BASE_URL}/api/likes`, {
      postId: post._id,
      userId: user._id,
      isLiked,
    });
    console.log("Updated Post-----", data);
    setPost(data);
    setIsLiked(prev => !prev);
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 h-[100vh] w-full absolute left-0 right-0 ">
      <div className="relative col-span-2 bg-black ">
        <AiOutlineCloseCircle
          onClick={() => router.back()}
          size={28}
          className="text-white absolute top-5 left-5 cursor-pointer z-20"
        />
        <video ref={videoRef} className="w-full h-full  ">
          <source src={post.video} />
        </video>
        <div className="absolute left-[47%] md:left-[49%] right-[49%] md:top-[49%] top-[47%] ">
          {isPlayed ? (
            <BsFillPauseFill
              onClick={onVideoPress}
              className="text-white text-4xl lg:text-6xl cursor-pointer "
            />
          ) : (
            <BsFillPlayFill
              onClick={onVideoPress}
              className="text-white text-4xl lg:text-6xl cursor-pointer "
            />
          )}
        </div>
      </div>
      <div className="flex-1 mx-6 py-10 ">
        <div className="flex items-center space-x-2">
          <Image
            alt="profile-image"
            src={post.postedBy.profileImage}
            width={50}
            height={50}
            className="rounded-full"
          />
          <p className="text-lg font-medium">{post.postedBy.name}</p>
        </div>
        <p className="font-light text-gray-400 mt-2">{post.caption}</p>
        <LikeButton
          likes={post?.likes?.length}
          isLiked={isLiked}
          handleLikePost={handleLikePost}
        />
        <Comments
          addComment={addComment}
          comment={comment}
          setComment={setComment}
          comments={post.comments}
          isCommenting={isCommenting}
        />
      </div>
    </div>
  );
}

export const getServerSideProps = async (context: {
  params: { id: string };
}) => {
  const { id } = context.params;
  const { data } = await Axios.get(`${BASE_URL}/api/posts/${id}`);

  console.log("Posts", data);
  return {
    props: {
      videoPost: data,
    },
  };
};
