import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ShoppingBagIcon } from "lucide-react";

function Basket() {
  return (
    <a href="/cart">
      <Button size="icon" variant="ghost" className="relative">
        <ShoppingBagIcon />
        <Badge
          variant="destructive"
          className="absolute top-0 right-0 h-4 w-4 rounded-full p-0.5 font-mono tabular-nums"
        >
          8
        </Badge>
      </Button>
    </a>
  );
}

export default Basket;
