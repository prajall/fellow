"use client";

import FullScreenWrapper from "@/components/FullScreenWrapper";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

import { useProduct } from "@/hooks/useProduct";
import { ProductProps } from "@/types";
import { Edit, Eye, Plus } from "lucide-react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import FormModal from "../components/FormModal";
import TableComponent from "../components/TableComponent";
import { useCategory } from "@/hooks/useCategory";
import CategoryForm from "./components/CategoryForm";
import CategoryEditForm from "./components/CategoryEditForm";

export default function CategoryPage() {
  const { categories, isFetching, isPending, metaData } = useCategory();
  const searchParams = useSearchParams();
  const page = searchParams.get("page") || "1";

  console.log("Categories", categories);
  if (isPending) {
    return <div>Loading...</div>;
  }

  const columns = [
    {
      title: "Name",
      accesor: "name",
    },
    {
      title: "Description",
      accesor: "description",
    },
    {
      title: "Actions",
      accesor: "actions",
    },
  ];

  const data = categories?.map((category: any) => ({
    id: category.id,
    name: category.name,
    description: category.description,
    actions: (
      <div className="flex gap-2">
        <Button variant="ghost" size="sm" asChild>
          <Link href={`/admin/categories/${category.id}`}>
            <Eye className="h-4 w-4" />
          </Link>
        </Button>
        <Button variant="ghost" size="sm" asChild>
          <FormModal
            nobg
            title="Add New Category"
            trigger={
              // <Button variant="ghost" size="sm" asChild className="text-black">
              <Edit className="h-4 w-4" />
              // </Button>
            }
          >
            {({ setOpen }) => (
              <CategoryEditForm setOpen={setOpen} categoryId={category.id} />
            )}
          </FormModal>
        </Button>
      </div>
    ),
  }));

  return (
    <FullScreenWrapper notop>
      <div className="space-y-4">
        <div className="flex justify-between items-center">
          <h2 className="text-2xl font-bold">Category Management</h2>
          <FormModal
            title="Add New Category"
            trigger={
              <>
                <Plus className="h-4 w-4 mr-2" />
                Add Category
              </>
            }
          >
            {({ setOpen }) => <CategoryForm setOpen={setOpen} />}
          </FormModal>
        </div>

        <div className="border rounded-lg">
          <TableComponent columns={columns} data={data} metaData={metaData} />
        </div>
      </div>
    </FullScreenWrapper>
  );
}
