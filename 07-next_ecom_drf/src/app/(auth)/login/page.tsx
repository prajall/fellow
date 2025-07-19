"use client";

import DynamicForm from "@/components/forms/DynamicForm";
import FullScreenWrapper from "@/components/FullScreenWrapper";
import { API_URL } from "@/lib/api";
import { FormFieldProp } from "@/types";
import { zodResolver } from "@hookform/resolvers/zod";
import axios from "axios";
import Cookies from "js-cookie";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { loginApi } from "../api";
import { useEffect, useTransition } from "react";
import toast from "react-hot-toast";

const formSchema = z.object({
  email: z.email(),
  password: z.string().min(8, {
    message: "Password must be atleast 8 characters",
  }),
});
const defaultValues = {
  email: "",
  password: "",
};
const LoginPage = () => {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: defaultValues,
  });

  const [isLoading, loginTransition] = useTransition();

  const router = useRouter();

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    loginTransition(async () => {
      console.log("submitting", values);
      try {
        const response = await loginApi(values);
        console.log(response);
        if (response.status == 200) {
          const refreshToken = response.data?.refresh;
          const accessToken = response.data?.access;

          Cookies.set("access", accessToken);
          Cookies.set("refresh", refreshToken, { expires: 2592000 });
          toast.success("Logged in successfully");

          router.push("/");
        }
      } catch (error: any) {
        console.log("Error Logging in", error.response.status, error);
        if (error.response?.status == 401) {
          console.log("Setting error");
          form.setError("email", { message: "Invalid credentials provided" });
          form.setError("password", {
            message: "Invalid credentials provided",
          });
        }
      }
    });
  };

  const formFields: FormFieldProp[] = [
    {
      label: "Email",
      type: "text",
      name: "email",
      placeholder: "me@example.com",
      required: true,
      width: "full",
    },

    {
      label: "Password",
      type: "password",
      name: "password",
      placeholder: "********",
      required: true,
      width: "full",
    },
  ];

  useEffect(() => {
    console.log("Is loading", isLoading);
  }, [isLoading]);

  return (
    <FullScreenWrapper className="w-full h-[80vh] flex justify-between items-center">
      <DynamicForm
        form={form}
        defaultValues={defaultValues}
        // size="lg"
        formTitle="Welcome Back 👋"
        formSubTitle="Login to continue"
        formSchema={formSchema}
        fields={formFields}
        onSubmit={onSubmit}
        submitText="Login"
        disableSubmit={isLoading}
        footer={
          <p className="text-sm mt-4 text-center text-muted-foreground">
            Not registered?{" "}
            <Link href={"/signup"} className="underline text-neutral-900">
              Signup
            </Link>
          </p>
        }
      />
    </FullScreenWrapper>
  );
};

export default LoginPage;
