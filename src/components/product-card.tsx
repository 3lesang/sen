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
    <Card className="rounded-md shadow-none border-none overflow-hidden">
      <img
        src={src}
        loading="lazy"
        alt={name}
        className="h-44 w-full object-cover"
      />
      <CardContent>
        <p className="text-sm line-clamp-2">{name}</p>
        <p className="font-semibold mt-2">{formatVND(price)}</p>
      </CardContent>
    </Card>
  );
}

export default ProductCard;
