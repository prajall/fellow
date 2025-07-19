"use client";
import { ShoppingCart } from "lucide-react";
import { Button, buttonVariants } from "../../components/ui/button";
// import SidebarContent from "./SidebarContent";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import FullScreenWrapper from "@/components/FullScreenWrapper";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { useAuth } from "@/contexts/AuthContext";
import UserIcon from "./UserIcon";

const Navbar = () => {
  const { user } = useAuth();

  return (
    <div className="shadow-sm py-4">
      <FullScreenWrapper notop className="flex justify-between">
        <Link href={"/"} className="logo">
          <img
            className="w-10"
            src="https://png.pngtree.com/png-vector/20240722/ourmid/pngtree-lotus-flower-logo-vector-png-image_13160738.png"
            alt="Logo"
          />
        </Link>
        <div className="flex gap-2 items-center">
          {/* <Sheet>
            <SheetTrigger className="hover:bg-neutral-100 relative w-10 h-10 flex items-center justify-center cursor-pointer rounded">
              {cartItems.length > 0 && (
                <p className="absolute top-0 right-0 bg-black text-white rounded-full w-4 h-4 text-xs flex items-center justify-center font-semibold">
                  {cartItems.length}
                </p>
              )}
              <ShoppingCart size={20} />
            </SheetTrigger>
            <SheetContent className="gap-0">
              <SheetHeader>
                <SheetTitle>Cart</SheetTitle>
              </SheetHeader>
              <SidebarContent />
            </SheetContent>
          </Sheet> */}

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
