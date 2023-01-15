import Link from "next/link";
import React, { useState } from "react";
import { AiFillHome, AiOutlineMenu } from "react-icons/ai";
import { ImCancelCircle } from "react-icons/im";
import Footer from "./Footer";
import Discover from "./Discover";
import SuggestedAccounts from "./SuggestedAccounts";
import { useSelector } from "react-redux";

export default function SideBar() {
  const [showSideBar, setShowSideBar] = useState(false);
  const user = useSelector((state: any) => state?.user?.user);

  const normalLink =
    "flex items-center gap-3 hover:bg-primary p-3 justify-center xl:justify-start cursor-pointer font-semibold text-[#F51997] rounded";
  return (
    <div className="h-full overflow-y-scroll">
      <div
        onClick={() => setShowSideBar(prev => !prev)}
        className="block  m-2 ml-4 mt-3 md:text-2xl text-lg cursor-pointer "
      >
        {showSideBar ? <ImCancelCircle /> : <AiOutlineMenu />}
      </div>
      {showSideBar && (
        <div className="xl:w-[400px] w-20 flex flex-col justify-start mb-10 border-r-2 border-gray-100 xl:border-0 p-3">
          <div className="xl:border-b-2 border-gray-200 xl:pb-4">
            <Link href="/">
              <div className={normalLink}>
                <p className="text-2xl ">
                  <AiFillHome />
                </p>
                <span className="text-xl hidden xl:block">For You</span>
              </div>
            </Link>
          </div>
          {!user && (
            <div className="px-2 py-4 hidden xl:block">
              <p className="text-gray-400">
                Log in to like and comment on videos
              </p>
              <button className="border-[1px] bg-white text-[#f51997] border-[#f51997] font-semibold px-6 py-3 rounded-md outline-none hover:bg-[#f51997] hover:text-white w-full mt-3 cursor-pointer">
                Log in
              </button>
            </div>
          )}
          <Discover />
          <SuggestedAccounts />
          <Footer />
        </div>
      )}
    </div>
  );
}
