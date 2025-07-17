"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import React from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import FullScreenWrapper from "@/components/FullScreenWrapper";
import axios from "axios";
import Cookies from "js-cookie";

const formSchema = z.object({
  email: z.email(),
  password: z.string().min(8, {
    message: "Password must be atleast 8 characters",
  }),
});

const LoginPage = () => {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    console.log("submitting");
    try {
      const response = await axios.post("http://localhost:8000/user/login/", {
        email: values.email,
        password: values.password,
      });
      console.log(response);
      if (response.status == 200) {
        const refreshToken = response.data?.refresh;
        const accessToken = response.data?.access;

        Cookies.set("access", accessToken);
        Cookies.set("refresh", refreshToken);
      }
    } catch (error: any) {
      console.log("Error Logging in", error);
      if (error.response?.status == 401) {
        form.setError("email", { message: "Invalid credentials provided" });
        form.setError("password", { message: "Invalid credentials provided" });
      }
    }
  };

  return (
    <FullScreenWrapper className="w-full h-[95vh] flex justify-between items-center">
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="space-y-8 w-full max-w-md p-4 pt-6 border mx-auto rounded-md"
        >
          <h2 className="text-3xl font-semibold text-center mb-1">
            Welcome Back
          </h2>
          <h2 className="text-md text-muted-foreground text-center ">
            Login to continue
          </h2>
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input placeholder="me@example.com" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Password</FormLabel>
                <FormControl>
                  <Input type="password" placeholder="********" {...field} />
                </FormControl>

                <FormMessage />
              </FormItem>
            )}
          />
          <Button type="submit" className="w-full">
            Login
          </Button>
        </form>
      </Form>
    </FullScreenWrapper>
  );
};

export default LoginPage;
