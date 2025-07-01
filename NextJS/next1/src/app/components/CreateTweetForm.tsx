"use client";

import { useTweetContext } from "@/providers/TweetContext";
import { useMutation } from "@tanstack/react-query";
import React from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { useTweets } from "../hooks/tweetHook";

export type TweetProp = {
  title: string;
  description: string;
};

const CreateTweetForm = () => {
  const { postTweet } = useTweets();

  const { mutate } = useMutation({
    mutationKey: ["tweets"],
    mutationFn: postTweet,
  });

  const formSchema = z.object({
    title: z.string().min(3, "Minimim 3 characters"),
    description: z.string().min(3),
  });
  type FormType = z.infer<typeof formSchema>;

  const { register } = useForm<FormType>({
    reValidateMode: "onChange",
    shouldFocusError: true,
  });

  return (
    <div className="w-full max-w-xl mx-auto p-4 rounded-2xl shadow-lg border border-[var(--foreground)]/70">
      <form className="flex flex-col gap-4">
        <h2 className="text-xl font-bold">Post a Tweet</h2>

        <input
          {...register("title")}
          type="text"
          name="title"
          placeholder="What's the title?"
          className="p-3 rounded-md bg-transparent border border-[var(--foreground)]/10 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />

        <textarea
          {...register("title")}
          name="description"
          placeholder="What's happening?"
          className="p-3 rounded-md bg-transparent border border-[var(--foreground)]/10 h-32 resize-none focus:outline-none focus:ring-2 focus:ring-blue-500"
        />

        <button
          type="submit"
          className="self-end bg-blue-500 px-6 py-2 rounded-full hover:bg-blue-600 transition cursor-pointer"
        >
          Tweet
        </button>
      </form>
    </div>
  );
};

export default CreateTweetForm;
