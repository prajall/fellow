"use client";

import { TextField } from "@/components/forms/TextField";
import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import { cn } from "@/lib/utils";
import { DynamicFormProps, FormFieldProp } from "@/types";
import { Loader2 } from "lucide-react";
import { UseFormReturn } from "react-hook-form";
import { z } from "zod";
import { SelectField } from "./SelectField";
import { TextAreaField } from "./TextAreaField";
import { SwitchField } from "./SwitchForm";

const DynamicForm = ({
  noBorder = false,
  form,
  size = "lg",
  formSchema,
  onSubmit,
  formTitle,
  formSubTitle,
  fields = [],
  submitText,
  footer,
  disableSubmit,
  footer_above,
}: DynamicFormProps & {
  form: UseFormReturn<any>;
}) => {
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
            key={field.name}
            form={form}
            label={field.label}
            name={field.name}
            options={field.options}
            className={getClassName(field.width)}
            placeholder={"Select an option"}
          />
        );
      case "text-area":
        return (
          <TextAreaField
            key={field.name}
            form={form}
            label={field.label}
            name={field.name}
            className={getClassName(field.width)}
          />
        );
      case "switch":
        return (
          <SwitchField
            key={field.name}
            form={form}
            label={field.label}
            name={field.name}
            className={getClassName(field.width)}
          />
        );
      default:
        return <></>;
    }
  };

  const sizeMap = {
    sm: "max-w-sm",
    md: "max-w-md",
    lg: "max-w-lg",
    xl: "max-w-xl",
    full: "max-w-full",
  }[size];

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className={cn(
          `space-y-6 w-full  p-4 pt-6 ${
            noBorder ? "" : "border"
          } mx-auto rounded-lg`,
          sizeMap
        )}
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
          {footer_above}
          <Button
            type="submit"
            className="w-full disabled:bg-neutral-900 flex gap-0"
            disabled={disableSubmit}
          >
            {submitText}
            {disableSubmit && <Loader2 className="animate-spin ml-2" />}
          </Button>
          {footer}
        </div>
      </form>
    </Form>
  );
};

export default DynamicForm;
