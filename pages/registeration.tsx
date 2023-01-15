import React, { useState, useRef } from "react";
import Image from "next/image";
import Axios from "axios";
import { useSelector, useDispatch } from "react-redux";
import { login } from "../state";
import Link from "next/link";
import { BASE_URL } from "../utils/constants";

export default function Registeration() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [localImage, setLocalImage] = useState("");
  const [profileImage, setProfileImage] = useState({
    file: "",
    url: "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png",
  });
  const imageRef = useRef<HTMLInputElement>(null);
  const dispatch = useDispatch();

  const onSubmit = async (e: any) => {
    e.preventDefault();

    try {
      if (!profileImage.file) {
        alert("Please Add Profile Image");
        return;
      }
      const imageData = new FormData();
      imageData.append("file", profileImage.file);
      imageData.append("upload_preset", "sanitary");
      imageData.append("cloud_name", "dlxyvl6sb");
      imageData.append("folder", "tiktik");
      const response = await Axios.post(
        "https://api.cloudinary.com/v1_1/dlxyvl6sb/image/upload",
        imageData
      );
      console.log("Image uploaded", response.data.url);

      const { data } = await Axios.post(
        `${BASE_URL}/api/user`,
        {
          name,
          email,
          password,
          profileImage: response.data.url,
        }
      );

      console.log("User created...", data);

      dispatch(login(data));
    } catch (err: any) {
      alert(err.message);
    }
  };

  const onChangeImage = (e: any) => {
    const objectUrl = URL.createObjectURL(e.target.files[0]);
    setProfileImage({ url: objectUrl, file: e.target.files[0] });
  };

  return (
    <form
      onSubmit={onSubmit}
      className="flex flex-col w-[400px] md:w-[520px] space-y-5 text-center mx-auto mt-12"
    >
      <h3 className="text-3xl font-medium  text-[#f51997]">Registeration</h3>
      <div className="relative w-[150px] h-[150px] rounded-full cursor-pointer overflow-hidden mx-auto">
        <Image
          onClick={() => imageRef?.current?.click()}
          src={profileImage.url}
          fill
          alt="profileImage"
          onChange={(e: any) => setLocalImage(e.target.files[0])}
        />
      </div>
      <p className="text-sm text-gray-400  -mt-12">
        Click to change profile Image
      </p>
      <input
        onChange={onChangeImage}
        ref={imageRef}
        type="file"
        className="hidden"
      />
      <input
        type="text"
        placeholder="Name"
        value={name}
        onChange={e => setName(e.target.value)}
        className="border-2 border-gray-200 rounded p-2 font-medium text-md"
      />
      <input
        type="email"
        placeholder="Email"
        value={email}
        onChange={e => setEmail(e.target.value)}
        className="border-2 border-gray-200 rounded p-2 font-medium text-md"
      />
      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={e => setPassword(e.target.value)}
        className="border-2 border-gray-200 rounded p-2 font-medium text-md"
      />
      <input
        type="password"
        placeholder="Confirm Password"
        value={confirmPassword}
        onChange={e => setConfirmPassword(e.target.value)}
        className="border-2 border-gray-200 rounded p-2 font-medium text-md"
      />
      <button
        className="bg-[#f51997] rounded p-2 text-md font-medium text-white"
        type="submit"
      >
        Register
      </button>
      <p className=" text-gray-400">
        Already have an account?{" "}
        <Link
          href="login"
          className="text-[#f51997] font-medium cursor-pointer underline"
        >
          Click to Login
        </Link>
      </p>
    </form>
  );
}
