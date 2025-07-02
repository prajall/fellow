import FullScreenWrapper from "@/components/FullScreenWrapper";
import Query from "@/components/Query";
import QueryProvider from "@/providers/QueryProvider";
import CreateTweetForm from "./components/CreateTweetForm";
import ShowTweets from "./components/ShowTweets";

export default function Home() {
  return (
    <>
      <QueryProvider>
        <FullScreenWrapper notop>
          <h1 className="text-center text-4xl font-bold mt-10 mb-5">Tweets</h1>
          <CreateTweetForm />
          <ShowTweets />
        </FullScreenWrapper>
      </QueryProvider>
    </>
  );
}
