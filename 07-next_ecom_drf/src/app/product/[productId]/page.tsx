"use client";

import FullScreenWrapper from "@/components/FullScreenWrapper";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

import { fetchProductDetail } from "@/actions/product";
import { useAuth } from "@/contexts/AuthContext";
import { useCart } from "@/contexts/CartContext";
import { ProductImageProps } from "@/types";
import { useQuery } from "@tanstack/react-query";
import { CreditCard, ShoppingCart, Star } from "lucide-react";
import Image from "next/image";
import { useParams, useRouter } from "next/navigation";
import { useState } from "react";
import toast from "react-hot-toast";
import BuyNowComponent from "./BuyNowComponent";

export default function ProductDetailPage() {
  const [selectedImage, setSelectedImage] = useState<string>("");
  const { cartItems, setCartItems } = useCart();
  const { user } = useAuth();
  const router = useRouter();

  const params = useParams();

  const {
    data: product,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["product", params.productId],
    queryFn: async () => {
      return fetchProductDetail(params.productId as string);
    },
  });

  if (!product) return null;

  const handleCart = () => {
    const existingItem = cartItems.find((item) => item.id == product?.id);

    if (!existingItem) {
      setCartItems((prev) => [...prev, { ...product, quantity: 1 }]);
      toast.success("Product added to cart");
    } else {
      setCartItems((prev) =>
        prev.map((item) => {
          if (item.id != product.id) return item;
          else {
            return {
              ...item,
              quantity: item.quantity + 1 || 1,
            };
          }
        })
      );
      toast("Item already exist. Added Quantity +1");
    }
  };

  if (isLoading) {
    return <p>loading...</p>;
  }

  if (error || !product) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">
            Product not found
          </h1>
        </div>
      </div>
    );
  }

  const discountedPrice =
    product.discount !== "0.00"
      ? (parseFloat(product.price) - parseFloat(product.discount)).toFixed(2)
      : product.price;

  const hasDiscount = product.discount !== "0.00";

  const handleBuyNow = () => {
    router.push("/login");
  };

  return (
    <FullScreenWrapper notop className="flex justify-center">
      <div className="flex flex-col lg:flex-row gap-8 w-full py-4">
        <div className="space-y-4 w-full min-w-[300px] sm:w-1/2  md:w-2/3 lg:w-1/3 ">
          <div className="aspect-[3/4] relative overflow-hidden rounded-lg">
            {product.images.length > 0 ? (
              <Image
                src={selectedImage || product.images[0]?.image}
                alt={product.name}
                fill
                className="object-cover"
                priority
              />
            ) : product.image ? (
              <Image
                src={product.image}
                alt={product.name}
                fill
                className="object-cover"
                priority
              />
            ) : (
              <div className="flex items-center justify-center h-full bg-gray-100">
                <span className="text-gray-400">No image available</span>
              </div>
            )}
          </div>

          {product.images.length > 0 && (
            <div className="grid grid-cols-4 gap-2">
              {product.images
                .sort(
                  (a: ProductImageProps, b: ProductImageProps) =>
                    a.index - b.index
                )
                .map((image: ProductImageProps) => (
                  <div
                    key={image.id}
                    className={`aspect-square relative overflow-hidden rounded border-2 cursor-pointer transition-all ${
                      selectedImage === image.image ||
                      (!selectedImage && image.index === 1)
                        ? "border-primary"
                        : "border-gray-200 hover:border-gray-300"
                    }`}
                    onClick={() => setSelectedImage(image.image)}
                  >
                    <Image
                      src={image.image || "/placeholder.svg"}
                      alt={`${product.name} ${image.index}`}
                      fill
                      className="object-cover"
                    />
                  </div>
                ))}
            </div>
          )}
        </div>

        <div className="space-y-4 max-w-2xl">
          <Badge variant="secondary" className="w-fit">
            {product.category.name}
          </Badge>

          <h1 className="text-2xl font-bold text-gray-900">{product.name}</h1>

          <div className="flex items-center gap-2">
            <div className="flex">
              {[...Array(5)].map((_, i) => (
                <Star
                  key={i}
                  className="h-5 w-5 fill-yellow-400 text-yellow-400"
                />
              ))}
            </div>
            <span className="text-sm text-gray-600">(5.0)</span>
          </div>

          <div className="space-y-2">
            <div className="flex items-center gap-3">
              <span className="text-lg font-bold text-gray-900">
                ${discountedPrice}
              </span>
              {hasDiscount && (
                <span className="text-xl text-gray-500 line-through">
                  ${product.price}
                </span>
              )}
            </div>
            {hasDiscount && (
              <Badge variant="destructive">Save ${product.discount}</Badge>
            )}
          </div>

          <div className="flex items-center gap-2">
            <div
              className={`h-3 w-3 rounded-full ${
                product.stock && product.stock > 0
                  ? "bg-green-500"
                  : "bg-red-500"
              }`}
            ></div>
            <span
              className={`text-sm font-medium ${
                product.stock && product.stock > 0
                  ? "text-green-700"
                  : "text-red-700"
              }`}
            >
              {product.stock && product.stock > 0 ? `In stock` : "Out of stock"}
            </span>
          </div>

          <div className="space-y-2">
            <h3 className="text- font-semibold">Description:</h3>
            <p className="text-gray-600 leading-relaxed">
              {product.description}
            </p>
          </div>

          <div className="flex gap-4 space-y-3 mt-4">
            {user && <BuyNowComponent product={product} />}
            {!user && (
              <Button
                size="lg"
                disabled={product.stock === 0 || !product.is_active}
                onClick={handleBuyNow}
              >
                <CreditCard className="h-5 w-5 mr-2" />
                Buy Now
              </Button>
            )}

            <Button
              variant="outline"
              className=""
              size="lg"
              onClick={handleCart}
            >
              <ShoppingCart className="h-5 w-5 mr-2" />
              Add to Cart
            </Button>
          </div>
        </div>
      </div>
    </FullScreenWrapper>
  );
}
