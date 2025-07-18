"use client";

import DynamicForm from "@/components/forms/DynamicForm";
import { PasswordField } from "@/components/forms/PasswordField";
import { TextField } from "@/components/forms/TextField";
import FullScreenWrapper from "@/components/FullScreenWrapper";
import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import { FormFieldProp } from "@/types";
import { zodResolver } from "@hookform/resolvers/zod";
import axios from "axios";
import Cookies from "js-cookie";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { z } from "zod";

const API_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

const formSchema = z
  .object({
    name: z.string().min(3, "Name must be at least 3 characters"),
    email: z.email().min(1, "Email is required"),
    address: z.string().min(1, "Address is required"),
    contact: z
      .string()
      .min(1, "Contact is required")
      .regex(/^\d{7,15}$/, "Contact must be a valid phone number"),
    password: z.string().min(8, "Password must be at least 8 characters"),
    confirm_password: z
      .string()
      .min(8, "Confirm Password must be at least 8 characters"),
  })
  .refine((data) => data.password === data.confirm_password, {
    path: ["confirm_password"],
    message: "Passwords do not match",
  });

const LoginPage = () => {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const router = useRouter();

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    console.log("submitting", values);
    try {
      const response = await axios.post(`${API_URL}/user/login/`, {
        email: values.email,
        password: values.password,
      });
      console.log(response);
      if (response.status == 200) {
        const refreshToken = response.data?.refresh;
        const accessToken = response.data?.access;

        Cookies.set("access", accessToken);
        Cookies.set("refresh", refreshToken, { expires: 2592000 });

        router.push("/");
      }
      // const response = await api.get("/order/");
      // console.log("Response", response);
    } catch (error: any) {
      console.log("Error Logging in", error);
      if (error.response?.status == 401) {
        form.setError("email", { message: "Invalid credentials provided" });
        form.setError("password", { message: "Invalid credentials provided" });
      }
    }
  };

  const formFields: FormFieldProp[] = [
    {
      label: "Name",
      type: "text",
      name: "name",
      placeholder: "Full Name",
      required: true,
      width: "full",
    },

    {
      label: "Email",
      type: "text",
      name: "email",
      placeholder: "me@example.com",
      required: true,
      width: "full",
    },
    {
      label: "Address",
      type: "text",
      name: "address",
      placeholder: "kathmandu",
      required: true,
      width: "1/2",
    },
    {
      label: "Contact",
      type: "text",
      name: "contact",
      placeholder: "9800000000",
      required: true,
      width: "1/2",
    },
    {
      label: "Password",
      type: "password",
      name: "password",
      placeholder: "********",
      required: true,
      width: "1/2",
    },
    {
      label: "ConfirmPassword",
      type: "password",
      name: "confirm_password",
      placeholder: "********",
      required: true,
      width: "1/2",
    },
  ];

  return (
    <FullScreenWrapper className="w-full h-[80vh] flex justify-between items-center">
      <DynamicForm
        size="xl"
        formTitle="Welcome to Flora 👋"
        formSubTitle="Register a new account"
        formSchema={formSchema}
        fields={formFields}
        onSubmit={onSubmit}
        submitText="Signup"
        disableSubmit={false}
        footer={
          <p className="text-sm mt-4 text-center text-muted-foreground">
            Already registered?{" "}
            <Link href={"/login"} className="underline text-neutral-900">
              Login
            </Link>
          </p>
        }
      />
    </FullScreenWrapper>
  );
};

export default LoginPage;
