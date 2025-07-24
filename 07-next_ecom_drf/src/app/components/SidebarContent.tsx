"use client";
import React, { use } from "react";
import {
  Package,
  FolderOpen,
  ShoppingCart,
  Users,
  Menu,
  ShoppingBag,
  Target,
  Filter,
} from "lucide-react";
import { usePathname } from "next/navigation";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { useCategory } from "@/hooks/useCategory";

const SidebarContent = () => {
  const { categories } = useCategory();

  return (
    <div className="flex flex-col h-full">
      <div className="flex items-center gap-2 px-4 py-6 ">
        <span className="font-semibold text-lg tracking-wider font-serif">
          FEORA STORE
        </span>
      </div>

      <nav className="flex-1 p-4">
        <div className="space-y-2">
          <h3 className="text-sm flex items-center gap-2 font-medium text-neutral-950 mb-2">
            <Package size={14} />
            Categories
          </h3>
          {categories.map((category) => (
            <div
              key={category.id}
              className=" flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium duration-300 hover:bg-neutral-100 text-neutral-700"
            >
              <span>{category.name}</span>
            </div>
          ))}
          <h3 className="text-sm font-medium text-neutral-950 my-2 mt-4 flex gap-2 items-center">
            <span>
              <Filter size={14} />
            </span>
            Filters
          </h3>
          <Link
            href="#"
            className={cn(
              "flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium duration-300 hover:bg-neutral-100  text-neutral-700"
            )}
          >
            <span>Popular</span>
          </Link>
          <Link
            href="#"
            className={cn(
              "flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium duration-300 hover:bg-neutral-100 text-neutral-700"
            )}
          >
            <span>New Collections</span>
          </Link>
        </div>
      </nav>
    </div>
  );
};

export default SidebarContent;
