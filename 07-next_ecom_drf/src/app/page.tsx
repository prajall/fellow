import FullScreenWrapper from "@/components/FullScreenWrapper";
import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
    <div>
      <FullScreenWrapper notop>
        <Link href={"/admin"}>Admin</Link>
      </FullScreenWrapper>
    </div>
  );
}
