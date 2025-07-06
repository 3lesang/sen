import ProductCard from "@/components/product-card";
import { pb } from "@/lib/pocketbase";
import { queryClient } from "@/stores/query";
import { useStore } from "@nanostores/react";
import { useSuspenseQuery } from "@tanstack/react-query";

function LatestProductList() {
  const client = useStore(queryClient);
  const query = useSuspenseQuery(
    {
      queryKey: ["products"],
      queryFn: () =>
        pb.collection("products").getList(1, 8, {
          fields: "id,name,gallery,price,slug",
        }),
    },
    client
  );

  const products = query.data?.items;

  return products?.map((item, index: number) => (
    <a key={index} href={`/product/${item?.slug}`}>
      <ProductCard
        id={item?.id}
        name={item?.name}
        thumbnail={item?.gallery[0]}
        price={item?.price}
      />
    </a>
  ));
}

export default LatestProductList;
