"use server";
import { api } from "@/lib/serverApi";
import z from "zod";
import { withRetry } from "./utils";

const fetchOrdersFunction = async ({ page = "1" }: { page: string }) => {
  const response = await api.get(`/order/?page=${page}`);
  return response.data;
};

export const fetchOrders = fetchOrdersFunction;

export const addOrder = async (newOrders: z.infer<any>) => {
  const response = await api.post("/order/", { items: newOrders });
  return response.data;
};
