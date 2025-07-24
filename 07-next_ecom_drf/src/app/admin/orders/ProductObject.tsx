import { Card, CardContent } from "@/components/ui/card";
import Link from "next/link";

type ProductProps = {
  id: number;
  name: string;
  image: string;
};

type OrderItemProps = {
  product: ProductProps;
  price: number;
  quantity: number;
  id: number;
};

const ProductObject = ({ item }: { item: OrderItemProps }) => {
  return (
    <Card className="p-0 shadow-none text-xs border">
      <CardContent className="p-2 flex gap-2 items-center ">
        <div>
          <img
            src={item.product.image || ""}
            alt="Image"
            className="w-14 aspect-square rounded-md object-cover"
          />
        </div>
        <div className="px-2 truncate w-full">
          <Link
            href={`/product/${item.product.id}`}
            className="hover:underline"
          >
            {item.product.name}
          </Link>
          <p className=" text-muted-foreground">
            ${Number(item.price) * item.quantity}
          </p>
          <div className="flex items-center gap-2 text-xs">
            <p>Quantity:</p>

            <p>{item.quantity}</p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default ProductObject;
