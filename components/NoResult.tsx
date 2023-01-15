import React from "react";
import { MdOutlineVideocamOff } from "react-icons/md";
import { BiCommentX } from "react-icons/bi";

const NoResult = ({ text }: { text: string }) => {
  return (
    <div className="flex flex-col items-center justify-center h-full w-full">
      <p className="text-4xl">
        {text === "No comments yet" ? <BiCommentX /> : <MdOutlineVideocamOff />}
      </p>
      <p className="text-2xl text-center">{text}</p>
    </div>
  );
};

export default NoResult;
