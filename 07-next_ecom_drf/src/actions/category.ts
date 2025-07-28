"use server";

import { api } from "@/lib/serverApi";
import z from "zod";
import { withRetry } from "./utils";
import axios from "axios";

// Functions with retry
export const fetchCategories = async (page: string = "1") => {
  // return await withRetry(async () => {
  const response = await api.get(`/product/category/?page=${page}`);
  return response.data;
  // });
};

export const addCategory = async (newCategory: z.infer<any>) => {
  return await withRetry(async () => {
    try {
      const response = await api.post("/product/category/", newCategory);
      return response.data;
    } catch (err) {
      throw err;
    }
  });
};

export const fetchCategoryDetail = async (categoryId: string) => {
  // return await withRetry(async () => {
  const response = await api.get(`/product/category/${categoryId}`);
  return response.data;
  // });
};

export const editCategory = async (values: z.infer<any>) => {
  return await withRetry(async () => {
    const response = await api.patch(
      `/product/category/${values.categoryId}/`,
      values
    );
    return response.data;
  });
};
