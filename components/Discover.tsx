import React from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import { topics } from "../utils/constants";

export default function Discover() {
  const router = useRouter();
  const { topic: currentTopic } = router.query;
  const activeTopicStyle =
    "xl:border-2 hover:bg-primary xl:border-[#F51997] px-3 py-2 rounded xl:rounded-full flex items-center gap-2 justify-center cursor-pointer text-[#F51997]";
  const topicStyle =
    "xl:border-2 hover:bg-primary xl:border-gray-300 px-3 py-2 rounded xl:rounded-full flex items-center gap-2 justify-center cursor-pointer text-black";

  const onTopicChange = (name: string) => {
    if (name === "clear") {
      router.push("/");
    } else {
      router.push(`/?topic=${name}`);
    }
  };

  return (
    <div className="xl:border-b-2 border-gray-200 pb-6">
      <p className="text-gray-500 font-semibold m-3 mt-4 hidden xl:block">
        Popular Topics
      </p>
      <div className="flex gap-3 flex-wrap">
        {topics.map(topic => (
          <div onClick={() => onTopicChange(topic.name)} key={topic.name}>
            <div
              className={
                currentTopic === topic.name ? activeTopicStyle : topicStyle
              }
            >
              <span className="font-bold text-2xl xl:text-md">
                {topic.icon}
              </span>
              <span className="font-medium text-md hidden xl:block capitalize">
                {topic.name}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
