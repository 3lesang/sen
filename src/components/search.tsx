import { Button } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { zodResolver } from "@hookform/resolvers/zod";
import { Search } from "lucide-react";
import { useForm } from "react-hook-form";
import { z } from "zod";

const schema = z.object({
  search: z.string().min(1),
});

type SearchType = z.infer<typeof schema>;

function SearchForm() {
  const form = useForm<SearchType>({
    resolver: zodResolver(schema),
    defaultValues: { search: "" },
  });

  const onSubmit = (values: SearchType) => {};

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="flex">
        <FormField
          control={form.control}
          name="search"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <Input
                  placeholder="Tìm kiếm sản phẩm"
                  className="w-96 bg-white border-none shadow-none focus-visible:ring-0 rounded-tr-none rounded-br-none"
                  {...field}
                />
              </FormControl>
            </FormItem>
          )}
        />
        <Button
          type="submit"
          size="icon"
          className="rounded-tl-none rounded-bl-none"
        >
          <Search />
        </Button>
      </form>
    </Form>
  );
}

export default SearchForm;
