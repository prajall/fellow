"use client";
import { useQuery } from "@tanstack/react-query";
import React from "react";
import { useTweets } from "../hooks/tweetHook";
import { TweetProp } from "./CreateTweetForm";
import TweetCard from "./TweetCard";

const ShowTweets = () => {
  const { fetchTweets } = useTweets();

  const { data, isPending, isFetching, isSuccess, isError, error }: any =
    useQuery({
      queryKey: ["tweets"],
      queryFn: fetchTweets,
      // staleTime: 30 * 1000,
      refetchInterval: 10 * 1000,
    });

  if (isError) {
    console.log("Error ", error);
  }

  if (data)
    return (
      <div>
        {data.map((tweet: TweetProp) => (
          <TweetCard tweet={tweet} key={tweet.title} />
        ))}
      </div>
    );

  return null;
};

export default ShowTweets;
