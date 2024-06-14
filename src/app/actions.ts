"use server";

import { db } from "@/db/db";
import { entries } from "@/db/schema";
import { actionClient } from "@/lib/safe-action";
import { and, eq } from "drizzle-orm";
import { revalidatePath } from "next/cache";
import { z } from "zod";

export const addEntry = actionClient
    .schema(
        z.object({
            username: z.string(),
            value: z.coerce.number().lt(100).gt(0),
        })
    )
    .action(async ({ parsedInput }) => {
        await db.insert(entries).values({
            username: parsedInput.username,
            value: parsedInput.value,
            createdAt: new Date(),
        });
        revalidatePath("/");
    });

export async function deleteEntry(username: string, id: number) {
    await db
        .delete(entries)
        .where(and(eq(entries.username, username), eq(entries.id, id)));
    revalidatePath("/");
}
