import { HandCoins } from "lucide-react";

const AppPage = () => {
  return (
    <div className="flex flex-col items-center justify-center h-screen w-full">
      <h1 className="text-xl font-semibold flex gap-2 items-center tracking-[0.07em]">
        Welcome to
        <HandCoins className="size-6 " />
        PAYFAIR
      </h1>

      <p className="text-sm text-muted-foreground mt-2">
        Select or join a group to get started
      </p>
    </div>
  );
};

export default AppPage;
