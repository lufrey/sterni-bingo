import { db } from "@/db/db";
import { entries } from "@/db/schema";
import { eq } from "drizzle-orm";

export async function getBottleCapEntries(username: string) {
    const e = await db.query.entries.findMany({
        where: eq(entries.username, username),
    });
    return e;
}
