import React from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Badge } from "@/components/ui/badge";
import { ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { useOrder } from "@/hooks/useOrder";

const ConfirmDialog = ({
  orderId,
  trigger,
  status,
}: {
  orderId: string;
  trigger: React.ReactNode;
  status: string;
}) => {
  const [open, setOpen] = React.useState(false);
  const { updateStatusMutation } = useOrder();

  const updateStatus = updateStatusMutation(orderId);

  const handleUpdate = async () => {
    updateStatus.mutate({ status });
    setOpen(false);
  };
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger className="cursor-pointer">{trigger}</DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Confirm update status?</DialogTitle>
          <DialogDescription>
            Are you Sure you want to update status to
            <span className="font-semibold">"{status}"</span>
          </DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <Button variant={"secondary"} onClick={() => setOpen(false)}>
            Cancel
          </Button>
          <Button className="bg-neutral-800" onClick={handleUpdate}>
            Update
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export const getStatusColor = (status: string) => {
  switch (status.toLowerCase()) {
    case "pending":
      return "border bg-cyan-100 text-cyan-500";
    case "confirmed":
      return "border bg-blue-100 text-blue-500";
    case "delivered":
      return "border bg-green-100 text-green-500";
    case "cancelled":
      return "border bg-red-100 text-red-500";
    default:
      return "border bg-neutral-100 text-blue-500 text-black";
  }
};
const Status = ({ status, orderId }: { status: string; orderId: string }) => {
  const statusList = ["pending", "confirmed", "delivered", "cancelled"];
  const filteredList = statusList.filter((item) => item != status);

  return (
    <DropdownMenu>
      <DropdownMenuTrigger>
        <Badge className={getStatusColor(status)}>
          {status}
          <ChevronDown className="ml h-4 w-4" />
        </Badge>
      </DropdownMenuTrigger>
      <DropdownMenuContent className=" flex flex-col gap-1 bg-neutral-50">
        {filteredList.map((item) => (
          <ConfirmDialog
            orderId={orderId}
            key={item}
            status={item}
            trigger={
              <Badge className={cn(getStatusColor(item), "w-full")}>
                {item}
              </Badge>
            }
          />
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default Status;
