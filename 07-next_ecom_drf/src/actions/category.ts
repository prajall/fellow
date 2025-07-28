"use server";

import { api } from "@/lib/serverApi";
import z from "zod";
import { withRetry } from "./utils";

// API Callers
const fetchCategoriesFunction = async (page: string = "1") => {
  const response = await api.get(`/product/category/?page=${page}`);
  return response.data;
};
const addCategoryFunction = async (newCategory: z.infer<any>) => {
  try {
    const response = await api.post("/product/category/", newCategory);
    return response.data;
  } catch (err) {
    throw err;
  }
};
const fetchCategoryDetailFunction = async (categoryId: string) => {
  const response = await api.get(`/product/category/${categoryId}`);
  return response.data;
};

const editCategoryFunction = async (values: z.infer<any>) => {
  const response = await api.patch(
    `/product/category/${values.categoryId}/`,
    values
  );
  return response.data;
};

// Functions with retry
export const fetchCategories = async (page: string = "1") => {
  return await withRetry(async () => {
    const response = await api.get(`/product/category/?page=${page}`);
    return response.data;
  });
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
  return await withRetry(async () => {
    const response = await api.get(`/product/category/${categoryId}`);
    return response.data;
  });
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
