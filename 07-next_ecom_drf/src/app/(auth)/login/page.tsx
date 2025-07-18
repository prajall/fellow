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

const formSchema = z.object({
  name: z
    .string()
    .min(3, "Name must be atleast 3 characters")
    .max(50, "Name must be less than 50 characters"),
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

  const router = useRouter();

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    console.log("submitting", values);
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

  return (
    <FullScreenWrapper className="w-full h-[80vh] flex justify-between items-center">
      <DynamicForm
        size="lg"
        formTitle="Welcome to Flora 👋"
        formSubTitle="Register a new account"
        formSchema={formSchema}
        fields={formFields}
        onSubmit={onSubmit}
        submitText="Login"
        disableSubmit={false}
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
