"use client";

import FullScreenWrapper from "@/components/FullScreenWrapper";
import { Badge } from "@/components/ui/badge";

import { useProduct } from "@/hooks/useProduct";
import { ProductProps } from "@/types";
import { Edit, Plus } from "lucide-react";
import FormModal from "../components/FormModal";
import TableComponent from "../components/TableComponent";
import DeleteProduct from "./components/DeleteProduct";
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
        {product.image && (
          <img
            src={product.image || ""}
            alt={product.name}
            className="w-10 h-10 object-cover rounded-sm shadow-md"
          />
        )}
        {!product.image && (
          <img
            src="/images/placeholder.png"
            alt="Placeholder"
            className="w-10 h-10 object-cover rounded-sm "
          />
        )}
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
      <div className="flex items-center">
        {/* <Button variant="ghost" size="sm" asChild>
          <Link href={`/admin/products/${product.id}`}>
            <Eye className="h-4 w-4 " />
          </Link>
        </Button> */}
        <FormModal
          nobg
          title="Edit Product"
          trigger={
            <>
              <Edit className="h-4 w-4 text-blue-500  " />
            </>
          }
        >
          {({ setOpen }) => (
            <ProductForm setOpen={setOpen} productId={product.id} />
          )}
        </FormModal>
        <DeleteProduct productId={product.id} />
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
