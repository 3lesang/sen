import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
  type CarouselApi,
} from "@/components/ui/carousel";
import { API_URL, pb } from "@/lib/pocketbase";
import { cn } from "@/lib/utils";
import {
  QueryClient,
  QueryClientProvider,
  queryOptions,
  useSuspenseQuery,
} from "@tanstack/react-query";
import Autoplay from "embla-carousel-autoplay";
import { useEffect, useState } from "react";

const queryClient = new QueryClient();

export const bannersQueryOptions = queryOptions({
  queryKey: ["banners"],
  queryFn: () => pb.collection("banners").getFullList({ perPage: 5 }),
});

function BannerList() {
  const [api, setApi] = useState<CarouselApi>();
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    if (!api) {
      return;
    }

    setCurrent(api.selectedScrollSnap() + 1);

    api.on("select", () => {
      setCurrent(api.selectedScrollSnap() + 1);
    });
  }, [api]);

  const bannersQuery = useSuspenseQuery(bannersQueryOptions);
  const banners = bannersQuery.data;

  if (!banners?.length) return;

  const handleClick = (index: number) => {
    api?.scrollTo(index);
  };

  return (
    <Carousel
      setApi={setApi}
      className="w-full px-4 pt-4 bg-gray-50 rounded-md"
      plugins={[
        Autoplay({
          delay: 10000,
        }),
      ]}
    >
      <CarouselContent>
        {banners?.map((item, index) => (
          <CarouselItem key={index} className="">
            <a href="/product">
              <img
                loading="lazy"
                src={`${API_URL}/api/files/banners/${item?.id}/${item?.image}`}
                alt=""
                className="h-96 rounded-md w-full object-cover"
              />
            </a>
          </CarouselItem>
        ))}
      </CarouselContent>
      <CarouselPrevious className="border-none" />
      <CarouselNext className="border-none" />
      <div className="flex justify-center gap-1.5">
        {Array.from({ length: Number(banners?.length) })?.map(
          (_, index: number) => (
            <button
              key={index}
              onClick={() => handleClick(index)}
              className="py-4"
            >
              <div
                className={cn(
                  "h-0.5 w-6 rounded-md",
                  index == current - 1 ? "bg-blue-600" : "bg-gray-200"
                )}
              />
            </button>
          )
        )}
      </div>
    </Carousel>
  );
}

function BannerCarousel() {
  return (
    <QueryClientProvider client={queryClient}>
      <BannerList />
    </QueryClientProvider>
  );
}

export default BannerCarousel;
