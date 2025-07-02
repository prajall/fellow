"use client";

import { useTweetContext } from "@/providers/TweetContext";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import React from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { useTweets } from "../hooks/tweetHook";
import { zodResolver } from "@hookform/resolvers/zod";

export type TweetProp = {
  title: string;
  description: string;
  id: number;
};

const CreateTweetForm = () => {
  const { postTweet } = useTweets();
  const queryClient = useQueryClient();

  const { mutate, isPending } = useMutation({
    mutationKey: ["tweets"],
    mutationFn: postTweet,
    onSuccess: (finalTweets) => {
      // alert("Successfuly posted tweet");
      // queryClient.invalidateQueries({ queryKey: ["tweets"] });
      queryClient.setQueryData(["tweets"], finalTweets);
      reset();
    },
  });

  const formSchema = z.object({
    title: z.string().min(3, "Minimim 3 characters"),
    description: z.string().min(3),
  });
  type FormType = z.infer<typeof formSchema>;

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<FormType>({
    reValidateMode: "onChange",
    shouldFocusError: true,
    resolver: zodResolver(formSchema),
  });

  const submitHandler = async (data: FormType) => {
    console.log("formdata", data);
    mutate(data);
  };

  console.log("Errors", errors);

  return (
    <div className="w-full max-w-xl mx-auto p-4 rounded-2xl shadow-lg border border-[var(--foreground)]/70">
      <form
        className="flex flex-col gap-4"
        onSubmit={handleSubmit(submitHandler)}
      >
        <h2 className="text-xl font-bold">Post a Tweet</h2>

        <div className="">
          <input
            {...register("title")}
            type="text"
            name="title"
            placeholder="What's the title?"
            className="p-3 w-full rounded-md bg-transparent border border-[var(--foreground)]/10 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          {errors?.title && (
            <p className="text-red-500 mt-2 text-xs">{errors.title.message}</p>
          )}
        </div>

        <div>
          <textarea
            {...register("description")}
            name="description"
            placeholder="What's happening?"
            className="p-3 w-full rounded-md bg-transparent border border-[var(--foreground)]/10 h-32 resize-none focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          {errors?.description && (
            <p className="text-red-500 mt-2 text-xs">
              {errors.description.message}
            </p>
          )}
        </div>

        <button
          type="submit"
          className="self-end disabled:opacity-70 cursor-not-allowed bg-blue-500 px-6 py-2 rounded-full hover:bg-blue-600 transition cursor-pointer"
          disabled={isPending}
        >
          Tweet
        </button>
      </form>
    </div>
  );
};

export default CreateTweetForm;
