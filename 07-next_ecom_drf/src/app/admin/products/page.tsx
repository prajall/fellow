"use client";

import FullScreenWrapper from "@/components/FullScreenWrapper";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";

import { useProduct } from "@/hooks/useProduct";
import { ProductProps } from "@/types";
import { Edit, Eye, Plus } from "lucide-react";
import Link from "next/link";
import FormModal from "../components/FormModal";
import ProductForm from "./components/ProductForm";
import { metadata } from "@/app/layout";
import { useSearchParams } from "next/navigation";

export default function ProductsPage() {
  const { products, isFetching, isPending, metaData } = useProduct();
  const searchParams = useSearchParams();
  const page = searchParams.get("page") || "1";

  console.log("Products", products);

  if (isPending) {
    return <div>Loading...</div>;
  }

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

        <div className="border rounded-lg">
          <Table>
            <TableHeader className="bg-neutral-100">
              <TableRow>
                <TableHead>Name</TableHead>
                <TableHead>Category</TableHead>
                <TableHead>Price</TableHead>
                <TableHead>Stock</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            {products && Array.isArray(products) && products.length > 0 && (
              <TableBody className="text-neutral-700">
                {products?.map((product: ProductProps) => (
                  <TableRow key={product.id}>
                    <TableCell className="font-medium">
                      {product.name}
                    </TableCell>
                    <TableCell>{product.category.name}</TableCell>
                    <TableCell>${product.price}</TableCell>
                    <TableCell>{product.stock}</TableCell>
                    <TableCell>
                      {product.is_active && (
                        <Badge variant={"secondary"} className="text-green-500">
                          Active
                        </Badge>
                      )}
                      {!product.is_active && (
                        <Badge variant={"secondary"} className="text-red-500">
                          Inactive
                        </Badge>
                      )}
                    </TableCell>
                    <TableCell>
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
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            )}
          </Table>
          <Pagination>
            <PaginationContent>
              {metaData.previous && (
                <PaginationItem>
                  <PaginationPrevious href={`?page=${Number(page) - 1 || 1}`} />
                </PaginationItem>
              )}
              {Array.from(
                { length: metaData.count ? metaData.count / 12 + 1 : 1 },
                (_, index) => (
                  <PaginationItem key={index}>
                    {index + 1 === Number(page) && (
                      <PaginationLink href={`?page=${index + 1}`} isActive>
                        {index + 1}
                      </PaginationLink>
                    )}
                    {!(index + 1 === Number(page)) && (
                      <PaginationLink href={`?page=${index + 1}`}>
                        {index + 1}
                      </PaginationLink>
                    )}
                  </PaginationItem>
                )
              )}

              {metaData.next && (
                <PaginationItem>
                  <PaginationNext href={`?page=${Number(page) + 1 || 1}`} />
                </PaginationItem>
              )}
            </PaginationContent>
          </Pagination>
        </div>
      </div>
    </FullScreenWrapper>
  );
}
