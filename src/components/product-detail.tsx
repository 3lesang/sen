import { Button, buttonVariants } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { pb } from "@/lib/pocketbase";
import { cn, formatVND } from "@/lib/utils";
import { queryClient } from "@/stores/query";
import "@/styles/global.css";
import { useStore } from "@nanostores/react";
import { useSuspenseQuery } from "@tanstack/react-query";
import { MinusIcon, PlusIcon, StarIcon } from "lucide-react";
import { useParams } from "react-router";

function ProductDetail() {
  const client = useStore(queryClient);
  const params = useParams();
  const slug = params.slug;
  const query = useSuspenseQuery(
    {
      queryKey: ["products", slug],
      queryFn: () =>
        pb.collection("products").getFirstListItem(`slug = "${slug}"`),
    },
    client
  );
  const product = query.data;
  console.log(product);

  return (
    <div className="grid grid-cols-12 gap-2">
      <div className="col-span-9">
        <div className="grid grid-cols-12 gap-2">
          <div className="grid col-span-12 grid-cols-12 gap-2">
            <div className="col-span-5 sticky top-24 h-96">
              <Card className="shadow-none border-none bg-gray-50 rounded-md">
                <CardContent>
                  <div className="bg-white rounded-md h-80"></div>
                </CardContent>
                <CardFooter>
                  <div className="h-16 w-16 bg-gray-100 rounded-md"></div>
                </CardFooter>
              </Card>
            </div>
            <div className="col-span-7">
              <div className="grid grid-cols-1 gap-2">
                <Card className="shadow-none border-none bg-gray-50 rounded-md">
                  <CardHeader>
                    <CardTitle>{product?.name}</CardTitle>
                    <CardDescription>Đã bán 12</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <p className="text-xl font-bold">
                      {formatVND(product?.price)}
                    </p>
                  </CardContent>
                </Card>
                <Card className="shadow-none border-none bg-gray-50 rounded-md">
                  <CardHeader>
                    <CardTitle>Thông tin vận chuyển</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p>
                      Giao đến Q. 9 - TP Thủ Đức, P. Tăng Nhơn Phú A, Hồ Chí
                      Minh
                    </p>
                  </CardContent>
                </Card>
                <Card className="shadow-none border-none bg-gray-50 rounded-md">
                  <CardHeader>
                    <CardTitle>Mô tả sản phẩm</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p>test</p>
                  </CardContent>
                </Card>
                <Card className="shadow-none border-none bg-gray-50 rounded-md">
                  <CardHeader>
                    <CardTitle>Sản phẩm tương tự</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-3 gap-2">
                      {/* {
                      products?.map((item, index: number) => (
                        <a
                          to="/product/$id"
                        >
                          <ProductCard
                            id={item?.id}
                            name={item?.name}
                            price={item?.price}
                            thumbnail={item?.gallery[0]}
                          />
                        </a>
                      ))
                    } */}
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
          <div className="col-span-12">
            <Card className="border-none shadow-none bg-gray-50 rounded-md">
              <CardHeader>
                <CardTitle>Khách hàng đánh giá</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex flex-col items-center justify-center gap-2">
                  <StarIcon />
                  <p className="text-center text-sm text-gray-600">
                    Chưa có đánh giá nào cho sản phẩm này
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
      <div className="col-span-3 sticky h-72 top-24">
        <Card className="shadow-none rounded-md border-0 bg-gray-50">
          <CardHeader>
            <div className="h-12 w-12 bg-gray-100 rounded-md"></div>
          </CardHeader>
          <CardContent>
            <p className="mb-2">Số lượng</p>
            <div className="flex items-center gap-2">
              <Button size="icon" variant="outline">
                <MinusIcon />
              </Button>
              <div className={cn(buttonVariants({ variant: "outline" }))}>
                1
              </div>
              <Button size="icon" variant="outline">
                <PlusIcon />
              </Button>
            </div>
            <div className="mt-4">
              <p className="mb-2">Tạm tính</p>
              <p className="text-xl font-semibold">262.500₫</p>
            </div>
          </CardContent>
          <CardFooter>
            <div className="w-full">
              <Button className="w-full" variant="outline">
                {" "}
                Thêm vào giỏ{" "}
              </Button>
              <div className="p-1"></div>
              <Button className="w-full">Mua ngay</Button>
            </div>
          </CardFooter>
        </Card>
      </div>
      <div className="col-span-12">
        <Card className="border-none shadow-none rounded-md bg-gray-50">
          <CardHeader>
            <CardTitle>Sản phẩm bạn đã xem</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-5 gap-2">
              {/* {
              products?.map((item, index: number) => (
                <a  href="/product/$id">
                  <ProductCard
                    id={item?.id}
                    name={item?.name}
                    price={item?.price}
                    thumbnail={item?.gallery[0]}
                  />
                </a>
              ))
            }  */}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

export default ProductDetail;
