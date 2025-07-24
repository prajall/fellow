"use client";
import React from "react";
import {
  Package,
  FolderOpen,
  ShoppingCart,
  Users,
  Menu,
  Settings,
  ChartLine,
} from "lucide-react";
import { usePathname } from "next/navigation";
import Link from "next/link";
import { cn } from "@/lib/utils";

const SidebarContent = () => {
  const pathname = usePathname();
  const menuItems = [
    {
      title: "Dashboard",
      url: "#",
      icon: ChartLine,
    },
    {
      title: "Products",
      url: "/admin/products",
      icon: Package,
    },
    {
      title: "Categories",
      url: "/admin/categories",
      icon: FolderOpen,
    },
    {
      title: "Orders",
      url: "/admin/orders",
      icon: ShoppingCart,
    },
    {
      title: "Settings",
      url: "#",
      icon: Settings,
    },
  ];

  return (
    <div className="flex flex-col h-full">
      <div className="flex items-center gap-2 px-4 py-6 ">
        <Package className="h-6 w-6" />
        <span className="font-semibold text-lg">Admin Panel</span>
      </div>

      <nav className="flex-1 p-4">
        <div className="space-y-2">
          <h3 className="text-sm font-medium text-neutral-700 mb-2">
            General Management
          </h3>
          {menuItems.map((item) => (
            <Link
              key={item.title}
              href={item.url}
              className={cn(
                "flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium duration-300 hover:bg-neutral-100",
                pathname.startsWith(item.url)
                  ? "bg-neutral-100 text-neutral-950"
                  : "text-neutral-700"
              )}
            >
              <item.icon className="h-4 w-4" />
              <span>{item.title}</span>
            </Link>
          ))}
          {/* <h3 className="text-sm font-medium text-neutral-700 my-2 mt-4">
            User Management
          </h3>
          {userItems.map((item) => (
            <Link
              key={item.title}
              href={item.url}
              className={cn(
                "flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium duration-300 hover:bg-neutral-100",
                pathname.startsWith(item.url)
                  ? "bg-neutral-100 text-neutral-950"
                  : "text-neutral-700"
              )}
            >
              <item.icon className="h-4 w-4" />
              <span>{item.title}</span>
            </Link>
          ))} */}
        </div>
      </nav>
    </div>
  );
};

export default SidebarContent;
