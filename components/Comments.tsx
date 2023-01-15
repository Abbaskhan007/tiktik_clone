import Image from "next/image";
import React, { Dispatch, SetStateAction } from "react";
import { comment } from "../types/video";
import NoResult from "./NoResult";
import { useRouter } from "next/router";

interface iProps {
  comments: comment[];
  comment: string;
  setComment: Dispatch<SetStateAction<string>>;
  isCommenting: boolean;
  addComment: () => void;
}

const Comments = ({
  comment,
  setComment,
  isCommenting,
  addComment,
  comments,
}: iProps) => {
  const router = useRouter();
  console.log("Comments", comments);
  return (
    <div>
      <div className="border-t-2 border-b-2 border-gray-200 pt-4 px-10 bg-[#f8f8f8] lg:pb-0 pb-[100px]">
        <div className="overflow-y-scroll lg:h-[475px]">
          {comments.length ? (
            comments.map(cmt => (
              <div className="flex flex-row items-center space-x-3 mt-4">
                <Image
                  width={40}
                  height={40}
                  className="rounded-full cursor-pointer"
                  alt="profileImage"
                  src={cmt.commentedBy.profileImage}
                  onClick={() => router.push(`/profile/${cmt.commentedBy._id}`)}
                />
                <div className="">
                  <p className="text-md font-medium">{cmt.commentedBy.name}</p>
                  <p className="text-gray-400 text-sm">{cmt.comment}</p>
                </div>
              </div>
            ))
          ) : (
            <NoResult text="No comments yet" />
          )}
        </div>
      </div>
      <div className="flex flex-row items-center space-x-4 mt-4">
        <input
          type="text"
          placeholder="Add a comment"
          value={comment}
          onChange={e => setComment(e.target.value)}
          className="bg-primary px-4 py-3 text-md font-medium border-2 border-gray-100 focus:border-gray-300 focus:outline-none focus:border-2 rounded-lg flex-1"
        />
        <button
          onClick={addComment}
          className="text-md font-medium bg-[#f51997] px-5 py-3 text-white rounded"
        >
          {isCommenting ? "Commenting..." : "Comment"}
        </button>
      </div>
    </div>
  );
};

export default Comments;
