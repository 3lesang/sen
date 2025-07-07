import { buttonVariants } from "@/components/ui/button";
import { pb } from "@/lib/pocketbase";
import { cn } from "@/lib/utils";
import { queryClient } from "@/stores/query";
import { useStore } from "@nanostores/react";
import { useSuspenseQuery } from "@tanstack/react-query";

function CategoryList() {
  const client = useStore(queryClient);
  const query = useSuspenseQuery(
    {
      queryKey: ["categories"],
      queryFn: () =>
        pb.collection("categories").getFullList({ fields: "id,name,slug" }),
    },
    client
  );

  const categories = query.data;

  return categories?.map((item) => (
    <a
      key={item?.id}
      href={`/product/${item?.slug}`}
      className={cn(
        buttonVariants({ variant: "ghost" }),
        "md:w-full justify-start select-none text-black"
      )}
    >
      {item?.name}
    </a>
  ));
}

export default CategoryList;
