import MultiImageUploader from "@/app/components/MultiImageUploader";
import DynamicForm from "@/components/forms/DynamicForm";
import { useCategory } from "@/hooks/useCategory";
import { useProduct } from "@/hooks/useProduct";
import { api } from "@/lib/api";
import { FormFieldProp } from "@/types";
import { zodResolver } from "@hookform/resolvers/zod";
import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import z from "zod";

const defaultValues = {
  category: "",
  images: [],
  name: "",
  description: "",
  price: "",
  discount: "0",
  stock: "0",
  is_active: true,
};

const ProductForm = ({
  productId,
  setOpen,
}: {
  productId?: number;
  setOpen: (value: boolean) => void;
}) => {
  const { formSchema, createProduct, updateProduct } = useProduct();
  const { categories } = useCategory();

  console.log("Product id", productId);
  const categoryOptions =
    categories?.map((category: any) => ({
      label: category.name,
      value: category.id.toString(),
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
      width: "1/3",
    },
    {
      label: "Stock",
      name: "stock",
      type: "text",
      width: "1/3",
    },
    {
      label: "Active ",
      name: "is_active",
      type: "switch",
      width: "1/3",
    },
  ];

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: defaultValues,
  });

  const onSubmit = async (
    values: z.infer<typeof formSchema> & { id?: number }
  ) => {
    console.log("Product Values", values);
    setOpen(false);
    if (productId) {
      values.id = productId;
      updateProduct(values);
    } else {
      createProduct(values);
    }
  };

  useEffect(() => {
    const fetchDetail = async () => {
      try {
        const response = await api.get(`/product/${productId}/`);
        if (response.status == 200) {
          const productDetail = {
            ...response.data,
            category: response.data.category.id.toString(),
            stock: String(response.data.stock),
            price: String(response.data.price),
            images: [],
          };
          console.log("Product Detail on editing", productDetail);
          form.reset(productDetail || {});
        }
      } catch (error) {
        console.log(error);
        toast.error("Error fetching product detail");
      }
    };
    if (productId) {
      fetchDetail();
    }
  }, [productId]);

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
      footer_above={<MultiImageUploader />}
    />
  );
};

export default ProductForm;
