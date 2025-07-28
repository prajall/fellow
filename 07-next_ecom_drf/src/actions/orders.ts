"use server";
import { api } from "@/lib/serverApi";
import z from "zod";
import { withRetry } from "./utils";

export const fetchOrders = async ({ page = "1" }: { page: string }) => {
  return await withRetry(async () => {
    const response = await api.get(`/order/?page=${page}`);
    return response.data;
  });
};

export const addOrder = async (newOrders: z.infer<any>) => {
  return await withRetry(async () => {
    const response = await api.post("/order/", { items: newOrders });
    return response.data;
  });
};

export const updateOrderStatus = async (orderId: string, status: string) => {
  return await withRetry(async () => {
    if (!orderId) throw new Error("Order Id not found");
    const response = await api.patch(
      `http://localhost:8000/order/status/${orderId}/`,
      {
        status,
      }
    );
    return response.data;
  });
};
