import React, { useState, useEffect } from "react";
import { MdFavoriteBorder, MdFavorite } from "react-icons/md";
import { useSelector } from "react-redux";
import Axios from "axios";

interface iProps {
  handleLikePost: () => void;
  isLiked: boolean;
  likes: number;
}

const LikeButton = ({ handleLikePost, isLiked, likes }: iProps) => {
  const user = useSelector((state: any) => state?.user?.user);

  return (
    <div className="flex">
      <div className="flex flex-col items-center justify-center mt-4">
        {isLiked ? (
          <MdFavorite
            className="bg-gray-100 p-2 rounded-full"
            size={34}
            onClick={handleLikePost}
            color="#f51997"
          />
        ) : (
          <MdFavoriteBorder
            className="bg-gray-100 p-2 rounded-full"
            size={34}
            onClick={handleLikePost}
          />
        )}
        <p className="">{likes}</p>
      </div>
    </div>
  );
};

export default LikeButton;
