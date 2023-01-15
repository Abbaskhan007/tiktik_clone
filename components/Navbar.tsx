import Image from "next/image";
import React, { useState } from "react";
import logo from "../utils/tiktik-logo.png";
import { useSelector } from "react-redux";
import { BiLogOutCircle } from "react-icons/bi";
import { useRouter } from "next/router";
import Link from "next/link";
import { BiSearch } from "react-icons/bi";

export default function Navbar() {
  const router = useRouter();
  const [search, setSearch] = useState("");
  const user = useSelector((state: any) => state.user?.user);
  console.log("user", user);

  const handleSubmit = (e: { preventDefault: () => void }) => {
    e.preventDefault();
    router.push(`/search/${search}`);
  };

  return (
    <div className="w-full flex justify-between items-center border-b border-gray-200 py-2 px-4">
      <div onClick={() => router.push("/")} className="w-[100px] md:w-[130px]">
        <Image
          src={logo}
          alt="tiktik-logo"
          layout="responsive"
          className="cursor-pointer"
        />
      </div>
      <div className="hidden md:block">
        <form onSubmit={handleSubmit} className="flex items-center relative ">
          <input
            placeholder="Search accounts and videos"
            value={search}
            onChange={e => setSearch(e.target.value)}
            className="bg-primary p-3 md:text-md font-medium border-2
           border-gray-100 focus:outline-none focus:border-2 focus:border-gray-300 w-[300px] md:w-[350px] rounded-full md:top-0"
          />
          <div className="absolute md:right-5 right-6 top-4 border-l-2 border-gray-300 pl-4 text-2xl text-gray-400">
            <BiSearch />
          </div>
        </form>
      </div>
      {user?.name ? (
        <div className="flex items-center gap-8">
          <Link
            href={`/profile/${user._id}`}
            className="relative w-[40px] h-[40px] rounded-full cursor-pointer overflow-hidden"
          >
            <Image src={user.profileImage} alt="Profile-Image" fill />
          </Link>
          <Link
            href="/upload"
            className="bg-[#f51997] text-white px-6 py-[6px] rounded cursor-pointer text-md font-medium"
          >
            upload
          </Link>
          <BiLogOutCircle
            size={28}
            color="#f51997"
            className="text-md font-medium"
          />
        </div>
      ) : (
        <div
          onClick={() => router.push("/login")}
          className="bg-[#f51997] text-white px-6 py-[6px] rounded cursor-pointer text-md font-medium"
        >
          Login
        </div>
      )}
    </div>
  );
}
