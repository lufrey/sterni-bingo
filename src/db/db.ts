import { createClient } from "@libsql/client";
import { drizzle } from "drizzle-orm/libsql";
import * as schema from "./schema";

const db_url = process.env.DB_URL;

export const db = drizzle(
    createClient({
        url: `file:${db_url}`,
    }),
    {
        schema,
    }
);
