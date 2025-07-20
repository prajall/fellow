"use client";

import DynamicForm from "@/components/forms/DynamicForm";
import FullScreenWrapper from "@/components/FullScreenWrapper";
import { FormFieldProp } from "@/types";
import { zodResolver } from "@hookform/resolvers/zod";
import Cookies from "js-cookie";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { loginApi, signupApi } from "../api";
import toast from "react-hot-toast";

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

const defaultValues = {
  name: "",
  email: "",
  password: "",
  confirm_password: "",
  address: "",
  contact: "",
};

const SignupPage = () => {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const router = useRouter();

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      const response = await signupApi(values);
      console.log(response);
      if (response.status == 201) {
        console.log("Loggin in");
        const loginResponse = await loginApi(values); // login after signup
        if (loginResponse.status == 200) {
          const refreshToken = loginResponse.data?.refresh;
          const accessToken = loginResponse.data?.access;

          Cookies.set("access", accessToken);
          Cookies.set("refresh", refreshToken, { expires: 2592000 });
          console.log("Redirecting");
          router.push("/");
        }
      }
    } catch (error: any) {
      console.log("Error Logging in", error);
      const formError = error.response?.data;
      if (formError) {
        Object.keys(formError).forEach((key: any) => {
          console.log("Setting error", key, formError[key][0]);
          form.setError(key, { message: formError[key][0] });
          toast.error(formError[key][0]);
        });
      } else {
        toast.error("Failed to SignUp");
      }
    }
  };

  const formFields: FormFieldProp[] = [
    {
      label: "Name",
      type: "text",
      name: "name",
      placeholder: "Full Name",
      width: "full",
    },

    {
      label: "Email",
      type: "text",
      name: "email",
      placeholder: "me@example.com",
      width: "full",
    },
    {
      label: "Address",
      type: "text",
      name: "address",
      placeholder: "kathmandu",
      width: "1/2",
    },
    {
      label: "Contact",
      type: "text",
      name: "contact",
      placeholder: "9800000000",
      width: "1/2",
    },
    {
      label: "Password",
      type: "password",
      name: "password",
      placeholder: "********",
      width: "1/2",
    },
    {
      label: "ConfirmPassword",
      type: "password",
      name: "confirm_password",
      placeholder: "********",
      width: "1/2",
    },
  ];

  return (
    <FullScreenWrapper className="w-full h-[80vh] flex justify-between items-center">
      <DynamicForm
        form={form}
        size="lg"
        formTitle="Welcome to Flora 👋"
        formSubTitle="Register a new account"
        formSchema={formSchema}
        fields={formFields}
        onSubmit={onSubmit}
        submitText="Signup"
        disableSubmit={false}
        defaultValues={defaultValues}
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

export default SignupPage;
