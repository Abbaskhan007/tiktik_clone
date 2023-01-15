import Link from "next/link";
import React, { useState } from "react";
import Axios from "axios";
import { useSelector, useDispatch } from "react-redux";
import { useRouter } from "next/router";
import { login } from "../state";
import { BASE_URL } from "../utils/constants";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const dispatch = useDispatch();
  const router = useRouter();
  const onSubmit = async (e: any) => {
    setError("");
    e.preventDefault();
    console.log("------ url", BASE_URL);
    const response = await Axios.get(
      `${BASE_URL}/api/user?email=${email}&&password=${password}`
    );
    if (response.status == 200) {
      alert("Login Successfully");
      dispatch(login(response.data));
      router.push("/");
    } else {
      setError(response.data.message);
    }
  };
  return (
    <form
      onSubmit={onSubmit}
      className="flex flex-col justify-center  w-[400px] md:w-[520px] space-y-5 text-center mx-auto -mt-12 h-full"
    >
      <h3 className="text-3xl font-medium  text-[#f51997]">Login</h3>
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
      <button
        className="bg-[#f51997] rounded p-2 text-md font-medium text-white"
        type="submit"
      >
        Login
      </button>
      {error && (
        <p className="text-red-600 text-lg text-medium my-2">{error}</p>
      )}
      <div className=" text-gray-400">
        Don't have an account?{" "}
        <Link
          href="registeration"
          className="text-[#f51997] font-medium cursor-pointer underline"
        >
          Create Account
        </Link>
      </div>
    </form>
  );
}
