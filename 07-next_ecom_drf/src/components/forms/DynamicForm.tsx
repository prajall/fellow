"use client";

import { PasswordField } from "@/components/forms/PasswordField";
import { TextField } from "@/components/forms/TextField";
import FullScreenWrapper from "@/components/FullScreenWrapper";
import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import { typeschemaResolver } from "@hookform/resolvers/typeschema";
import { zodResolver } from "@hookform/resolvers/zod";
import axios from "axios";
import Cookies from "js-cookie";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useForm, UseFormReturn } from "react-hook-form";
import { z } from "zod";
import { SelectField } from "./SelectField";
import { DynamicFormProps, FormFieldProp } from "@/types";

const DynamicForm = ({
  size = "lg",
  formSchema,
  onSubmit,
  formTitle,
  formSubTitle,
  defaultValues,
  fields = [],
  submitText,
  footer,
}: DynamicFormProps) => {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues,
  });

  const getClassName = (width: string = "full") => {
    switch (width) {
      case "full":
        console.log("Full");
        return "col-span-full";
      case "1/2":
        console.log("Half");
        return "col-span-full md:col-span-6";
      case "1/3":
        return "col-span-full md:col-span-4";
      case "1/4":
        return "col-span-full md:col-span-6 xl:col-span-3";
      default:
        return "col-span-full";
    }
  };

  const renderField = (
    form: UseFormReturn<z.infer<typeof formSchema>>,
    field: FormFieldProp
  ) => {
    switch (field.type) {
      case "text":
        return (
          <TextField
            key={field.name}
            form={form}
            label={field.label}
            name={field.name}
            placeholder={field.placeholder}
            type={field.type}
            className={getClassName(field.width)}
          />
        );
      case "password":
        return (
          <TextField
            key={field.name}
            form={form}
            label={field.label}
            name={field.name}
            type="password"
            placeholder={field.placeholder}
            className={getClassName(field.width)}
          />
        );
      case "email":
        return (
          <TextField
            key={field.name}
            form={form}
            label={field.label}
            name={field.name}
            placeholder={field.placeholder}
            type={field.type}
            className={getClassName(field.width)}
          />
        );
      case "select":
        return (
          <SelectField
            form={form}
            label={field.label}
            name={field.name}
            options={field.options}
            className={getClassName(field.width)}
          />
        );
      default:
        return <></>;
    }
  };

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className={`space-y-6 w-full max-w-${size} p-4 pt-6 border mx-auto rounded-lg`}
      >
        {formTitle && (
          <h2 className="text-2xl font-semibold text-center mb-0">
            {formTitle}
          </h2>
        )}
        {formSubTitle && (
          <h2 className="text-sm text-muted-foreground text-center ">
            {formSubTitle}
          </h2>
        )}
        <div className="grid grid-cols-12 gap-4  items-center">
          {fields.map((field: any) => renderField(form, field))}
        </div>
        <div>
          <Button type="submit" className="w-full">
            {submitText}
          </Button>
          {footer}
        </div>
      </form>
    </Form>
  );
};

export default DynamicForm;
