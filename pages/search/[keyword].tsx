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
  accounts: user[];
  videos: videos[];
}

const Search = ({ accounts, videos }: iProps) => {
  const [isAccounts, setIsAccounts] = useState(false);
  const activeStyles = "border-b-2 border-black";
  return (
    <div>
      <div className="flex gap-10 my-10 border-b-2 border-gray-200 bg-white w-full">
        <p
          onClick={() => setIsAccounts(true)}
          className={`text-xl font-semibold cursor-pointer mt-2 -mb-[2px] ${
            isAccounts ? activeStyles : "text-gray-400"
          }`}
        >
          Accounts
        </p>
        <p
          onClick={() => setIsAccounts(false)}
          className={`text-xl font-semibold cursor-pointer mt-2 -mb-[2px] ${
            !isAccounts ? activeStyles : "text-gray-400"
          }`}
        >
          Videos
        </p>
      </div>
      {isAccounts ? (
        accounts?.length ? (
          accounts.map(account => (
            <Link
              href={`/profile/${account._id}`}
              key={account._id}
              className="flex items-center cursor-pointer space-x-3 py-2 border border-gray-200 px-4 hover:bg-gray-100 rounded-md mb-2"
            >
              <Image
                src={account.profileImage}
                alt="profile-Image"
                width={40}
                height={40}
                className="rounded-full"
              />
              <p className="text-md font-medium">{account.name}</p>
            </Link>
          ))
        ) : (
          <NoResult text="No Account Presents" />
        )
      ) : videos?.length ? (
        videos.map(post => <Videocard key={post._id} post={post} />)
      ) : (
        <NoResult text="No Video Present" />
      )}
    </div>
  );
};

export default Search;

export const getServerSideProps = async ({
  params,
}: {
  params: { keyword: string };
}) => {
  const { keyword } = params;
  const searchData = await Axios.get(`${BASE_URL}/api/search/${keyword}`);
  console.log("Profile Data", searchData.data);
  return {
    props: {
      accounts: searchData.data.accounts,
      videos: searchData.data.videos,
    },
  };
};
