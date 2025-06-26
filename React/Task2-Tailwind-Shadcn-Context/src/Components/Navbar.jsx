import { ShoppingCart } from "lucide-react";
import { Button } from "../components/ui/button";
import FullScreenWrapper from "../utils/components/FullScreenWrapper";
import SidebarContent from "./SidebarContent";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";

const Navbar = () => {
  return (
    <div className="shadow-sm py-4">
      <FullScreenWrapper notop className="flex justify-between">
        <div className="logo">
          <img
            className="w-10"
            src="https://png.pngtree.com/png-vector/20240722/ourmid/pngtree-lotus-flower-logo-vector-png-image_13160738.png"
            alt="Logo"
          />
        </div>
        <div className="flex gap-2 items-center">
          <Sheet>
            <SheetTrigger className="hover:bg-neutral-100 w-10 h-10 flex items-center justify-center cursor-pointer rounded">
              <ShoppingCart size={20} />
            </SheetTrigger>
            <SheetContent className="gap-0">
              <SheetHeader>
                <SheetTitle>Cart</SheetTitle>
              </SheetHeader>
              <SidebarContent />
            </SheetContent>
          </Sheet>

          <Button className="w-20" onClick={() => {}}>
            Login
          </Button>
          <Button variant="outline" className={"w-20"}>
            Signup
          </Button>
        </div>
      </FullScreenWrapper>
    </div>
  );
};

export default Navbar;
