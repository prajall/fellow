"use client";
import { ShoppingCart, Sidebar } from "lucide-react";
import { Button, buttonVariants } from "../../components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Menu } from "lucide-react";

import FullScreenWrapper from "@/components/FullScreenWrapper";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { useAuth } from "@/contexts/AuthContext";
import UserIcon from "./UserIcon";
import { useState } from "react";
import SidebarContent from "../admin/components/SidebarContent";

const Navbar = () => {
  const { user } = useAuth();
  const [open, setOpen] = useState(false);

  return (
    <div className="shadow-sm py-4">
      <FullScreenWrapper notop className="flex justify-between">
        <div className="flex items-center gap-1">
          <Sheet open={open} onOpenChange={setOpen}>
            <SheetTrigger asChild className="lg:hidden">
              {/* <Button variant="ghost" size="icon" className="bg-red-600"> */}
              <Sidebar size={24} className="text-neutral-700" />
              {/* </Button> */}
            </SheetTrigger>
            <SheetContent side="left" className="w-64 p-0">
              <SidebarContent />
            </SheetContent>
          </Sheet>
          <Link href={"/"} className="logo">
            <img
              className="w-10"
              src="https://png.pngtree.com/png-vector/20240722/ourmid/pngtree-lotus-flower-logo-vector-png-image_13160738.png"
              alt="Logo"
            />
          </Link>
        </div>
        <div className="flex gap-2 items-center">
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
