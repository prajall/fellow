"use client";
import { TweetProp } from "@/app/components/CreateTweetForm";
import React, {
  createContext,
  useContext,
  useState,
  ReactNode,
  useEffect,
} from "react";

import { tweets as dataTweets } from "@/components/data";

interface TweetContextType {
  tweets: TweetProp[];
  setTweets: React.Dispatch<React.SetStateAction<TweetProp[]>>;
}

const TweetContext = createContext<TweetContextType | undefined>(undefined);

export const TweetProvider = ({ children }: { children: ReactNode }) => {
  const [tweets, setTweets] = useState<TweetProp[]>(dataTweets);

  useEffect(() => {
    console.log("Tweets changed:", tweets);
  }, [tweets]);

  return (
    <TweetContext.Provider value={{ tweets, setTweets }}>
      {children}
    </TweetContext.Provider>
  );
};

export const useTweetContext = () => {
  const context = useContext(TweetContext);
  if (!context) {
    throw new Error("useTweetContext must be used within a TweetProvider");
  }
  return context;
};
