import React, { useState, useRef } from "react";
import { useRouter } from "next/router";
import { FaCloudUploadAlt } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import Axios from "axios";
import { BASE_URL, topics } from "../utils/constants";
import { useSelector } from "react-redux";

export default function upload() {
  const [typeError, setTypeError] = useState(false);
  const [loading, setLoading] = useState(false);
  const [caption, setCaption] = useState("");
  const [ctg, setCtg] = useState(topics[0].name);
  const [videoUrl, setVideoUrl] = useState("");
  const user = useSelector((state: any) => state?.user?.user);
  const router = useRouter();

  const videoUploadRef = useRef<HTMLInputElement>(null);
  const onVideoUpload = async (e: any) => {
    setLoading(true);
    const selectedFile = e.target.files[0];
    const fileTypes = ["video/mp4", "video/webm", "video/ogg"];
    const checkType = fileTypes.includes(selectedFile.type);
    console.log("check type", checkType);
    if (!checkType) {
      setTypeError(true);
      return;
    }
    const imageData = new FormData();
    imageData.append("file", selectedFile);
    imageData.append("upload_preset", "sanitary");
    imageData.append("cloud_name", "dlxyvl6sb");
    imageData.append("folder", "tiktik");
    const response = await Axios.post(
      "https://api.cloudinary.com/v1_1/dlxyvl6sb/video/upload",
      imageData
    );
    setVideoUrl(response.data.url);
    setLoading(false);

    console.log("Video Uploaded", response.data.url);
  };

  const onDiscard = () => {
    setCaption("");
    setCtg("");
  };

  const onPost = async () => {
    const post = await Axios.post(`${BASE_URL}/api/posts`, {
      caption,
      video: videoUrl,
      postedBy: user._id,
      category: ctg,
    });
    if (post.status == 200) {
      alert("Video Uploaded Successfully");
      router.push("/");
    }
  };

  console.log("-----", caption, "----", ctg);

  return (
    <div className="flex flex-row bg-white sm:w-[600px] lg:[740px] w-[90%] mx-auto gap-10 mt-8">
      <div>
        <div>
          <p className="text-2xl font-bold">Upload Video</p>
          <p className="text-gray-400 text-md mt-1">
            Post a video to your account
          </p>
        </div>

        <div className="relative border-dashed rounded-xl border-4 border-gray-200 flex flex-col w-[260px] h-[460px] p-10 cursor-pointer hover:border-red-300 hover:bg-gray-100 items-center justify-center mt-10">
          {videoUrl ? (
            <div className="absolute">
              <video src={videoUrl} controls className="w-full h-full" />
            </div>
          ) : loading ? (
            <h2 className="text-3xl font-medium text-gray-500">Uploading...</h2>
          ) : (
            <div className="flex flex-col items-center justify-between">
              <p className="font-bold text-xl ">
                <FaCloudUploadAlt className="text-gray-300 text-6xl" />
              </p>
              <p className="text-xl font-semibold">Upload Video</p>
              <p className="text-gray-400 text-center mt-10 text-sm leading-8">
                Mp4 or WebM or ogg <br />
                720x1080p or higher <br />
                Up to 10 minutes <br />
                Less than 2GB
              </p>
              <button
                onClick={() => videoUploadRef?.current?.click()}
                className="bg-[#f51997] mt-10 rounded text-white text-md font-medium outline-none p-2 w-52"
              >
                Select Video
              </button>
              <input
                onChange={onVideoUpload}
                type="file"
                name="upload-video"
                className="hidden"
                ref={videoUploadRef}
              />
            </div>
          )}
        </div>
      </div>
      <div className="flex-1 flex flex-col justify-center ">
        <label className="text-md font-medium">Caption</label>
        <input
          value={caption}
          onChange={e => setCaption(e.target.value)}
          type="text"
          className="border-2 border-gray-200 rounded outline-none text-md capitalize lg:p-2 p-1 w-full"
        />
        <label className="text-md font-medium mb-[2px] mt-4">
          Choose a category
        </label>
        <select
          onChange={e => setCtg(e.target.value)}
          className="border-2 border-gray-200 rounded outline-none text-md capitalize lg:p-2 p-1 w-full"
        >
          {topics.map(topic => (
            <option value={topic.name} className="bg-red-200" key={topic.name}>
              {topic.name}
            </option>
          ))}
        </select>
        <div className="flex gap-6 mt-10 justify-between items-center">
          <button
            onClick={onDiscard}
            className="flex-1 rounded border-gray-300 border-2 text-md font-medium p-2"
          >
            Discard
          </button>
          <button
            onClick={onPost}
            className="bg-[#f51997] flex-1 rounded text-white text-md font-medium p-2"
          >
            Post
          </button>
        </div>
      </div>
    </div>
  );
}
