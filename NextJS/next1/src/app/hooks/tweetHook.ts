import { useTweetContext } from "@/providers/TweetContext";

export const useTweets = () => {
  const { tweets } = useTweetContext();

  console.log(tweets);

  const fetchTweets = async () => {
    return new Promise((resolve, reject) => {
      const success = Math.random() > 0.5;
      setTimeout(() => {
        if (success) {
          console.log("Success ");
          resolve(tweets);
        } else {
          console.log("Error");
          reject(new Error("Failed to fetch tweets"));
        }
      }, 1000);
    });
  };

  const postTweet = async () => {};
  return { fetchTweets, postTweet };
};
