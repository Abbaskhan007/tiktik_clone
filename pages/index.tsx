import { useEffect } from "react";
import type { NextPage } from "next";
import Videocard from "../components/Videocard";
import { GetServerSideProps } from "next";
import Axios from "axios";
import { videos } from "../types/video";
import { BASE_URL } from "../utils/constants";
import NoResult from "../components/NoResult";
import { useDispatch } from "react-redux";
import { login } from "../state";

const Home: NextPage = ({ posts }: videos[]) => {
  const dispatch = useDispatch();
  useEffect(() => {
    const initialUser = localStorage.getItem("tiktik-user")
      ? JSON.parse(localStorage.getItem("tiktik-user"))
      : null;
    if (initialUser) {
      dispatch(login(initialUser));
    }
  }, []);
  console.log(posts);
  return (
    <div className="mt-6">
      {posts.length ? (
        posts.map(post => <Videocard post={post} />)
      ) : (
        <NoResult text="No Video Present" />
      )}
    </div>
  );
};

export const getServerSideProps: GetServerSideProps = async (context: {
  query: { topic: string };
}) => {
  const topic = context.query?.topic;
  console.log("------------", topic);
  let data;
  if (topic) {
    data = await Axios.get(`${BASE_URL}/api/discover/${topic}`);
  } else {
    data = await Axios.get(`${BASE_URL}/api/posts`);
  }

  console.log("Posts", data);
  return {
    props: {
      posts: data.data,
    },
  };
};
export default Home;
