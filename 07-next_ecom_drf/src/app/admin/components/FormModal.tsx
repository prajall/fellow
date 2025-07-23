import { buttonVariants } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import React from "react";

const FormModal = ({
  nobg = false,
  title,
  trigger,
  children,
}: {
  nobg?: boolean;
  title: string;
  trigger: React.ReactNode;
  children: (props: { setOpen: (value: boolean) => void }) => React.ReactNode;
}) => {
  const [open, setOpen] = React.useState<boolean>(false);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger
        className={`${buttonVariants({ variant: nobg ? "ghost" : "default" })}`}
      >
        {trigger}
      </DialogTrigger>
      <DialogContent showCloseButton={false} className=" w-3/4 max-w-xl p-0">
        <DialogTitle className="px-4 pt-4">{title}</DialogTitle>
        {children({ setOpen })}
      </DialogContent>
    </Dialog>
  );
};

export default FormModal;
