"use client";

import DynamicForm from "@/components/forms/DynamicForm";
import FullScreenWrapper from "@/components/FullScreenWrapper";
import { api, API_URL } from "@/lib/api";
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
import { useAuth } from "@/contexts/AuthContext";
import { loginUser } from "@/actions/users";

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

  const { setUser } = useAuth();

  const [isLoading, loginTransition] = useTransition();

  const router = useRouter();

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    loginTransition(async () => {
      console.log("submitting", values);
      try {
        const response = await loginUser(values);
        console.log(response);
        if (response?.success) {
          toast.success("Logged in successfully");
          setUser(response.data);
          router.push("/");
        } else if (!response?.success && response?.status == 401) {
          form.setError("email", { message: "Invalid credentials provided" });
          form.setError("password", {
            message: "Invalid credentials provided",
          });
        }
      } catch (error: any) {
        console.log("Error logging in", error);
        toast.error("Error logging in");
      }
    });
  };

  const formFields: FormFieldProp[] = [
    {
      label: "Email",
      type: "text",
      name: "email",
      placeholder: "me@example.com",
      width: "full",
    },

    {
      label: "Password",
      type: "password",
      name: "password",
      placeholder: "********",
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
