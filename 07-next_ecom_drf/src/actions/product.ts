"use server";
import { api } from "@/lib/serverApi";
import z from "zod";

export const fetchProducts = async ({ page = "1" }: { page: string }) => {
  const response = await api.get(`/product/?page=${page}`);
  return response.data;
};

export const addProduct = async (newProduct: z.infer<any>) => {
  const formData = new FormData();

  formData.append("name", newProduct.name);
  formData.append("description", newProduct.description);
  formData.append("price", newProduct.price);
  formData.append("discount", newProduct.discount);
  formData.append("stock", newProduct.stock);
  formData.append("category", newProduct.category);
  formData.append("is_active", String(newProduct.is_active));

  newProduct.images.forEach((image: File) => {
    formData.append("images", image);
  });

  console.log("Submittinggggggg", formData);

  try {
    const response = await api.post("/product/", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    return response.data;
  } catch (error: any) {
    console.log("Error adding product", error.response.data);
    throw error;
  }
};

export const editProduct = async (values: z.infer<any>) => {
  console.log("Editing product", values);
  const formData = new FormData();
  Object.keys(values).forEach((key: string) => {
    if (key != "images" && key != "image" && key != "id") {
      formData.append(key, values[key]);
    }
    const images: File[] = values.images || [];
    images.forEach((image) => {
      formData.append("images", image);
    });
  });
  console.log("Updating on url:", `/product/${values.id}/`);
  console.log("Form data:", formData);
  try {
    const response = await api.patch(`/product/${values.id}/`, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    return response.data;
  } catch (error: any) {
    console.log("Error updating product", error.response.data);
    throw error;
  }
};
