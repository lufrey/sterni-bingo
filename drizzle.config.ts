import type { Config } from "drizzle-kit";

export default {
    schema: "./src/db/schema.ts",
    out: "./src/drizzle",
    driver: "turso",
    dbCredentials: {
        url: `file:${process.env.DB_URL}`,
    },
    dialect: "sqlite",
} satisfies Config;
