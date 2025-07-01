import { useTweetContext } from "@/providers/TweetContext";
import { TweetProp } from "../components/CreateTweetForm";
import { useQueryClient } from "@tanstack/react-query";

export const useTweets = () => {
  const { tweets, setTweets } = useTweetContext();
  const queryClient = useQueryClient();

  console.log(tweets);

  const fetchTweets = async () => {
    return new Promise((resolve, reject) => {
      // const success = Math.random() > 0.5;
      setTimeout(() => {
        // if (success) {
        // console.log("Success ");
        resolve(tweets);
        // } else {
        // console.log("Error");
        // reject(new Error("Failed to fetch tweets"));
        // }
      }, 1000);
    });
  };

  const postTweet = async (newTweet: {
    title: string;
    description: string;
  }) => {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        const finalTweets: TweetProp[] = [
          { ...newTweet, id: Date.now() },
          ...tweets,
        ];
        setTweets(finalTweets);
        resolve(finalTweets);
        queryClient.invalidateQueries({ queryKey: ["tweets"] });
      }, 1000);
    });
  };
  return { fetchTweets, postTweet };
};
