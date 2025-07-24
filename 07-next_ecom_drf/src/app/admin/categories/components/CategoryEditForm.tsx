import DynamicForm from "@/components/forms/DynamicForm";
import { useCategory } from "@/hooks/useCategory";
import { api } from "@/lib/api";
import { FormFieldProp } from "@/types";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import z from "zod";

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

const CategoryEditForm = ({
  setOpen,
  categoryId,
}: {
  setOpen: (value: boolean) => void;
  categoryId: number;
}) => {
  const { formSchema, updateCategory } = useCategory();

  console.log("CategoryId", categoryId);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: { name: "", description: "" },
  });

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    console.log("Category Values", values);
    const updatedValues = { ...values, categoryId: categoryId };
    setOpen(false);
    updateCategory(updatedValues);
  };

  useEffect(() => {
    const fetchDetail = async () => {
      try {
        const response = await api.get(`/product/category/${categoryId}/`);
        if (response.status == 200) {
          const categoryDetail = response.data;
          form.reset(categoryDetail || {});
        }
      } catch (error) {
        console.log(error);
        toast.error("Error fetching category detail");
      }
    };
    fetchDetail();
  }, [categoryId]);

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

export default CategoryEditForm;
