import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { AuthUserProps } from "@/types";
import { LogOut, ShieldUser, ShoppingBag, User } from "lucide-react";
import Link from "next/link";

const UserIcon = ({ user }: { user: AuthUserProps }) => {
  console.log("User in user icon", user);
  return (
    <div>
      <DropdownMenu>
        <DropdownMenuTrigger>
          <div className="flex items-center gap-2 p-1 rounded-full hover:bg-neutral-50">
            <Avatar>
              <AvatarImage src="https://github.com/shadcn.png" />
              <AvatarFallback>
                {user.email.charAt(0).toUpperCase()}
              </AvatarFallback>
            </Avatar>
            <div className="flex flex-col gap-4  justify-center">
              <p className=" text-left leading-1">{user.name}</p>
              <p className="text-muted-foreground text-left leading-0 text-xs">
                {user.email}
              </p>
            </div>
          </div>
        </DropdownMenuTrigger>
        <DropdownMenuContent>
          <DropdownMenuItem className="cursor-pointer">
            <User className="text-neutral-950" /> Profile
          </DropdownMenuItem>
          {user.role == "admin" && (
            <DropdownMenuItem asChild className="cursor-pointer">
              <Link href={"/admin"} className="">
                <ShieldUser className="text-neutral-950" /> Admin
              </Link>
            </DropdownMenuItem>
          )}
          {user.role == "customer" && (
            <DropdownMenuItem asChild className="cursor-pointer">
              <Link href={"/my-orders"} className="">
                <ShoppingBag className="text-neutral-950" /> My Orders
              </Link>
            </DropdownMenuItem>
          )}

          <DropdownMenuItem className="cursor-pointer">
            <button className="flex gap-2 items-center cursor-pointer ">
              <LogOut className="text-neutral-950" />
              Logout
            </button>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
};

export default UserIcon;
