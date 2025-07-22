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
import ProductForm from "./components/ProductForm";

export default function ProductsPage() {
  const { products, isPending, metaData, isError } = useProduct();

  console.log("Products", products);

  if (isPending) {
    return <div>Loading...</div>;
  }

  const columns = [
    {
      title: "Id",
      accesor: "id",
    },
    {
      title: "Image",
      accesor: "image",
    },
    {
      title: "Name",
      accesor: "name",
    },
    {
      title: "Category",
      accesor: "category",
    },
    {
      title: "Price",
      accesor: "price",
    },
    {
      title: "Stock",
      accesor: "stock",
    },
    {
      title: "Status",
      accesor: "status",
    },
    {
      title: "Actions",
      accesor: "actions",
    },
  ];

  const data = products?.map((product: ProductProps) => ({
    id: product.id,
    name: product.name,
    category: product.category.name,
    price: product.price,
    stock: product.stock,
    image: (
      <>
        <img
          src={product.image || ""}
          alt={product.name}
          className="w-10 h-10 object-cover rounded-sm shadow-md"
        />
      </>
    ),
    status: (
      <>
        {product.is_active && (
          <Badge variant={"secondary"} className="text-green-500 bg-green-50">
            Active
          </Badge>
        )}
        {!product.is_active && (
          <Badge variant={"secondary"} className="text-red-500 bg-red-50">
            Inactive
          </Badge>
        )}
      </>
    ),
    actions: (
      <div className="flex gap-2">
        <Button variant="ghost" size="sm" asChild>
          <Link href={`/admin/products/${product.id}`}>
            <Eye className="h-4 w-4" />
          </Link>
        </Button>
        <Button variant="ghost" size="sm" asChild>
          <Link href={`/admin/products/${product.id}/edit`}>
            <Edit className="h-4 w-4" />
          </Link>
        </Button>
      </div>
    ),
  }));

  return (
    <FullScreenWrapper notop>
      <div className="space-y-4">
        <div className="flex justify-between items-center">
          <h2 className="text-2xl font-bold">Products Management</h2>
          <FormModal
            title="Add a new Product"
            trigger={
              <>
                <Plus className="h-4 w-4 mr-2" />
                Add Product
              </>
            }
          >
            {({ setOpen }) => <ProductForm setOpen={setOpen} />}
          </FormModal>
        </div>
        {isError && (
          <p className="text-red-500 text-center">Something went wrong.</p>
        )}

        <div className="border rounded-lg">
          <TableComponent columns={columns} data={data} metaData={metaData} />
        </div>
      </div>
    </FullScreenWrapper>
  );
}
