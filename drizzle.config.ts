import type { Config } from "drizzle-kit";

export default {
    schema: "./src/db/schema.ts",
    out: "./src/drizzle",
    driver: "turso",
    dbCredentials: {
        url: "file:src/db/sqlite.db",
    },
    dialect: "sqlite",
} satisfies Config;
