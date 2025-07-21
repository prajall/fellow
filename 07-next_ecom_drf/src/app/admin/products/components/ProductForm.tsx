import DynamicForm from "@/components/forms/DynamicForm";
import { useCategory } from "@/hooks/useCategory";
import { useProduct } from "@/hooks/useProduct";
import { FormFieldProp } from "@/types";
import { zodResolver } from "@hookform/resolvers/zod";
import React from "react";
import { useForm } from "react-hook-form";
import z from "zod";

const defaultValues = {
  category: "2",
  images: [],
  name: "",
  description: "",
  price: "",
  discount: "0",
  stock: "0",
  is_active: true,
};

const ProductForm = ({ setOpen }: { setOpen: (value: boolean) => void }) => {
  const { formSchema, createProduct } = useProduct();
  const { categories } = useCategory();

  const categoryOptions =
    categories?.map((category: any) => ({
      label: category.name,
      value: category.id,
    })) || [];

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
    {
      label: "Price",
      name: "price",
      type: "text",
      width: "1/2",
    },
    {
      label: "Category",
      name: "category",
      type: "select",
      width: "1/2",
      options: categoryOptions,
    },

    {
      label: "Discount",
      name: "discount",
      type: "text",
      width: "1/2",
    },
    {
      label: "Stock",
      name: "stock",
      type: "text",
      width: "1/2",
    },
    {
      label: "Active ",
      name: "is_active",
      type: "switch",
      width: "1/2",
    },
  ];

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: defaultValues,
  });

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    console.log("Product Values", values);
    setOpen(false);
    createProduct(values);
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

export default ProductForm;
