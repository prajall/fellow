import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { ProductProps } from "@/types";
import Image from "next/image";
import Link from "next/link";

const ProductCard = ({ product }: { product: ProductProps }) => {
  return (
    <Link
      href={`/product/${product.id}`}
      className="border max-w-[450px] mx-auto w-full "
    >
      <Card className="rounded-none shadow-none border-none px-0 py-3 h-full group cursor-pointer">
        <CardContent className="relative h-full overflow-hidden mx-3 px-0 ">
          <div className="w-full aspect-[3/4] relative">
            {product.image && (
              <Image
                className="w-full h-full object-cover group-hover:scale-105 group-hover:blur-sm duration-300"
                src={product.image as string}
                alt=""
                width={500}
                height={700}
              />
            )}
            {!product.image && (
              <div className="w-full aspect-[3/4] relative bg-neutral-100">
                <Image
                  className="w-full h-full object-cover group-hover:scale-105 group-hover:blur-sm duration-300"
                  src="/images/placeholder.png"
                  alt=""
                  width={100}
                  height={100}
                />
              </div>
            )}
          </div>
          <Button
            variant="outline"
            onClick={(e) => {
              e.stopPropagation();
            }}
            className="py-2 absolute z-50 hidden group-hover:flex top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-transparent hover:bg-black/70 hover:text-white group-hover:bg-black/40 border-white text-white duration-300  "
          >
            View Product
          </Button>
        </CardContent>
        <CardHeader className="px-3">
          <CardTitle className="truncate">{product.name}</CardTitle>
          <CardDescription className="text-clip">
            $ {product.price}
          </CardDescription>
        </CardHeader>
      </Card>
    </Link>
  );
};

export default ProductCard;
