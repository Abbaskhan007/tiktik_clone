import Image from "next/image";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { user } from "../types/user";

import { BASE_URL } from "../utils/constants";
import Axios from "axios";

export default function SuggestedAccounts() {
  const [users, setUsers] = useState([]);
  const fetchUsers = async () => {
    const { data } = await Axios.get(`${BASE_URL}/api/allUsers`);
    setUsers(data);
  };
  useEffect(() => {
    fetchUsers();
  }, []);
  return (
    <div className="xl:border-b-2 border-gray-200 pb-4">
      <div className="text-gray-500 font-semibold m-3 mt-4 hidden xl:block">
        Suggested Accounts
      </div>
      {users.map((user: user) => (
        <Link href={`/profile/${user._id}`} key={user._id}>
          <div className="flex gap-3 hover:bg-primary p-2 cursor-pointer font-semibold rounded items-center">
            <Image
              src={user.profileImage}
              width={34}
              height={34}
              alt="profile-Image"
              className="rounded-full"
            />
            <p className="text-md font-semibold lowercase hidden xl:block">{user.name}</p>
          </div>
        </Link>
      ))}
    </div>
  );
}
