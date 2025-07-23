import React, { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button, buttonVariants } from "@/components/ui/button";
import toast from "react-hot-toast";
import { useQueryClient } from "@tanstack/react-query";
import { Trash } from "lucide-react";
import { api } from "@/lib/api";
import { cn } from "@/lib/utils";

const DeleteProduct = ({ productId }: { productId: number }) => {
  const [open, setOpen] = useState(false);
  const queryClient = useQueryClient();

  const deleteProduct = async (productId: number) => {
    try {
      const response = await api.delete(`/product/${productId}/`);
      if (response.status == 204) {
        toast.success("Product deleted successfully");
        queryClient.invalidateQueries({ queryKey: ["products"] });
      }
    } catch (err) {
      console.log("Error deleting product", err);
    }
  };
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger
        className={cn(
          buttonVariants({ variant: "ghost" }),
          "text-red-500 hover:text-red-500"
        )}
      >
        <Trash size={20} />
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Delete Product ?</DialogTitle>
          <DialogDescription>
            Are you sure you want to delete this product ?
          </DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <Button onClick={() => setOpen(false)} variant="secondary">
            Cancel
          </Button>
          <Button
            onClick={() => {
              deleteProduct(productId);
              setOpen(false);
            }}
          >
            Confirm
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default DeleteProduct;
