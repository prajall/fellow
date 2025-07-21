import FullScreenWrapper from "@/components/FullScreenWrapper";
import Image from "next/image";
import Link from "next/link";
import ShowProducts from "./components/homepage/ShowProducts";

export default function Home() {
  return (
    <div>
      <FullScreenWrapper notop>
        <ShowProducts />
      </FullScreenWrapper>
    </div>
  );
}
