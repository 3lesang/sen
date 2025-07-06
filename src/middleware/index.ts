import PocketBase from "pocketbase";

import { API_URL } from "@/lib/pocketbase";
import { defineMiddleware } from "astro/middleware";

export const onRequest = defineMiddleware(
  async ({ locals, request }: any, next: () => any) => {
    locals.pb = new PocketBase(API_URL);

    return await next();
  }
);
