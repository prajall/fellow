import DynamicForm from "@/components/forms/DynamicForm";
import { useCategory } from "@/hooks/useCategory";
import { useProduct } from "@/hooks/useProduct";
import { FormFieldProp } from "@/types";
import { zodResolver } from "@hookform/resolvers/zod";
import React from "react";
import { useForm } from "react-hook-form";
import z from "zod";

const defaultValues = {
  name: "",
  description: "",
};

const formFields: FormFieldProp[] = [
  {
    label: "Name",
    name: "name",
    type: "text",
  },
  {
    label: "Description",
    name: "description",
    type: "text-area",
  },
];

const CategoryForm = ({ setOpen }: { setOpen: (value: boolean) => void }) => {
  const { formSchema, createCategory } = useCategory();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues,
  });

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    console.log("Category Values", values);
    setOpen(false);
    createCategory(values);
  };

  return (
    <DynamicForm
      size="2xl"
      noBorder={true}
      form={form}
      formSchema={formSchema}
      submitText="Submit"
      disableSubmit={false}
      fields={formFields}
      onSubmit={onSubmit}
    />
  );
};

export default CategoryForm;
