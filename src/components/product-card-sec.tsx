import { Card, CardContent } from "@/components/ui/card";
import { API_URL } from "@/lib/pocketbase";
import { formatVND } from "@/lib/utils";

interface ProductCardProps {
  thumbnail?: string;
  id?: string;
  name?: string;
  price?: number;
}

function ProductCard({ id, name, price = 0, thumbnail }: ProductCardProps) {
  const src = thumbnail
    ? `${API_URL}/api/files/products/${id}/${thumbnail}`
    : "/empty.png";

  return (
    <Card className="rounded-md border-none shadow-none overflow-hidden">
      <img
        src={src}
        loading="lazy"
        decoding="async"
        height={176}
        alt="product_image"
        className="aspect-square w-full rounded-lg bg-gray-200 object-cover group-hover:opacity-75 xl:aspect-7/8"
      />
      <CardContent>
        <p className="text-lg font-bold line-clamp-2">{name}</p>
        <p className="font-semibold mt-2">{formatVND(price)}</p>
      </CardContent>
    </Card>
  );
}

export default ProductCard;
