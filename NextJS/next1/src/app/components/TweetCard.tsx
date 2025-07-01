import React from "react";
import { TweetProp } from "./CreateTweetForm";
import { AiOutlineHeart } from "react-icons/ai";
import { BiRepost } from "react-icons/bi";
import { BsChatDots } from "react-icons/bs";
import Link from "next/link";

const TweetCard = ({ tweet }: { tweet: TweetProp }) => {
  return (
    <div className="max-w-xl mx-auto my-5 p-4  rounded-xl shadow-lg border border-[var(--foreground)]/30">
      <div className="flex items-center mb-3">
        <img
          src="https://cdn.pixabay.com/photo/2023/02/18/11/00/icon-7797704_640.png"
          alt="Profile Picture"
          className="w-12 h-12 rounded-full mr-3 object-cover border border-gray-100"
        />
        <div className="flex flex-col">
          <span className="font-bold text-base">Twitter User</span>
          <span className="text-sm text-gray-500">@user</span>
        </div>
      </div>
      <div className="mb-3">
        <h3 className="text-lg font-semibold mb-1">{tweet.title}</h3>
        <p className="text-base leading-relaxed">{tweet.description}</p>
      </div>
      <div className="flex justify-end">
        <Link href={`/${tweet.id}`} className="hover:underline ">
          Learn More
        </Link>
      </div>
      {/* <div className="flex justify-start text-sm text-gray-500">
        <span className="flex items-center mr-4">
          <AiOutlineHeart className="w-4 h-4 mr-1" />
          1.2K
        </span>
        <span className="flex items-center mr-4">
          <BiRepost className="w-4 h-4 mr-1" />
          345
        </span>
        <span className="flex items-center">
          <BsChatDots className="w-4 h-4 mr-1" />
          89
        </span>
      </div> */}
    </div>
  );
};

export default TweetCard;
