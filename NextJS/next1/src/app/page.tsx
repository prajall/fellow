import Query from "@/components/Query";
import QueryProvider from "@/providers/QueryProvider";

export default function Home() {
  return (
    <>
      <QueryProvider>
        <Query />
      </QueryProvider>
    </>
  );
}
