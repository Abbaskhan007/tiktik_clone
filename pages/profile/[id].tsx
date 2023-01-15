import React, { useState } from "react";
import Axios from "axios";
import Image from "next/image";
import Link from "next/link";
import { BASE_URL } from "../../utils/constants";
import { user } from "../../types/user";
import { video, videos } from "../../types/video";
import Videocard from "../../components/Videocard";
import NoResult from "../../components/NoResult";

interface iProps {
  user: user;
  likedPosts: videos[];
  userPosts: videos[];
}

const Profile = ({ user, likedPosts, userPosts }: iProps) => {
  const [isUserVideos, setIsUserVideos] = useState(false);
  const activeStyles = "border-b-2 border-black";
  return (
    <div>
      <div className="flex items-center space-x-3 mt-6">
        <div className="relative w-16 h-16 overflow-hidden rounded-full md:w-32 md:h-32">
          <Image src={user.profileImage} fill alt="profile-Image" />
        </div>
        <p className="text-md font-medium md:text-2xl">{user.name}</p>
      </div>
      <div className="flex gap-10 my-10 border-b-2 border-gray-200 bg-white w-full">
        <p
          onClick={() => setIsUserVideos(true)}
          className={`text-xl font-semibold cursor-pointer mt-2 -mb-[2px] ${
            isUserVideos ? activeStyles : "text-gray-400"
          }`}
        >
          Video
        </p>
        <p
          onClick={() => setIsUserVideos(false)}
          className={`text-xl font-semibold cursor-pointer mt-2 -mb-[2px] ${
            !isUserVideos ? activeStyles : "text-gray-400"
          }`}
        >
          Liked
        </p>
      </div>
      {isUserVideos ? (
        userPosts?.length ? (
          userPosts.map(post => <Videocard post={post} />)
        ) : (
          <NoResult text="No Video Posted" />
        )
      ) : likedPosts?.length ? (
        likedPosts.map(post => <Videocard post={post} />)
      ) : (
        <NoResult text="No Video Likes Yet" />
      )}
    </div>
  );
};

export const getServerSideProps = async ({
  params,
}: {
  params: { id: string };
}) => {
  const { id } = params;
  const profileData = await Axios.get(`${BASE_URL}/api/profile/${id}`);
  console.log("Profile Data", profileData.data);
  return {
    props: {
      user: profileData.data.user,
      likedPosts: profileData.data.likedPosts,
      userPosts: profileData.data.userPosts,
    },
  };
};

export default Profile;
