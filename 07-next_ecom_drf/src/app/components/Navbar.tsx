"use client";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Menu, ShoppingCart } from "lucide-react";
import { buttonVariants } from "../../components/ui/button";

import FullScreenWrapper from "@/components/FullScreenWrapper";
import { useAuth } from "@/contexts/AuthContext";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import SidebarContent from "../admin/components/SidebarContent";
import SidebarContentUser from "./SidebarContent";
import UserIcon from "./UserIcon";
import { useCart } from "@/contexts/CartContext";
import CartContent from "./CartContent";

const Navbar = () => {
  const { user } = useAuth();
  const [open, setOpen] = useState(false);
  const pathname = usePathname();
  const { cartItems } = useCart();

  return (
    <div className="shadow-sm py-4">
      <FullScreenWrapper notop className="flex justify-between">
        <div className="flex items-center gap-1">
          {pathname.startsWith("/admin") && (
            <Sheet open={open} onOpenChange={setOpen}>
              <SheetTrigger asChild className="lg:hidden">
                <Menu size={24} className="text-neutral-700" />
              </SheetTrigger>
              <SheetContent side="left" className="w-64 p-0">
                <SidebarContent />
              </SheetContent>
            </Sheet>
          )}
          {!pathname.startsWith("/admin") && (
            <Sheet open={open} onOpenChange={setOpen}>
              <SheetTrigger asChild className="lg:hidden">
                <Menu size={24} className="text-neutral-700" />
              </SheetTrigger>
              <SheetContent side="left" className="w-64 p-0">
                <SidebarContentUser />
              </SheetContent>
            </Sheet>
          )}

          <Link href={"/"} className="logo">
            <img
              className="w-10"
              src="https://png.pngtree.com/png-vector/20240722/ourmid/pngtree-lotus-flower-logo-vector-png-image_13160738.png"
              alt="Logo"
            />
          </Link>
        </div>
        <div className="flex gap-2 items-center">
          <Sheet>
            <SheetTrigger className="hover:bg-neutral-100 relative w-10 h-10 flex items-center justify-center cursor-pointer rounded">
              {cartItems && cartItems.length > 0 && (
                <p className="absolute top-0 right-0 bg-black text-white rounded-full w-4 h-4 text-xs flex items-center justify-center font-semibold">
                  {cartItems.length}
                </p>
              )}
              <ShoppingCart size={20} />
            </SheetTrigger>
            <SheetContent className="gap-0 p-4">
              <SheetHeader className="p-0">
                <SheetTitle>Cart</SheetTitle>
              </SheetHeader>
              <CartContent />
            </SheetContent>
          </Sheet>
          {!user && (
            <>
              <Link
                href={"/login"}
                className={cn("w-20", buttonVariants())}
                onClick={() => {}}
              >
                Login
              </Link>
              <Link
                href={"/signup"}
                className={cn("w-20", buttonVariants({ variant: "outline" }))}
              >
                Signup
              </Link>
            </>
          )}

          {user && <UserIcon user={user} />}
        </div>
      </FullScreenWrapper>
    </div>
  );
};

export default Navbar;
