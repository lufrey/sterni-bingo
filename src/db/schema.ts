import { InferSelectModel, relations } from "drizzle-orm";
import { integer, sqliteTable, text } from "drizzle-orm/sqlite-core";

export const users = sqliteTable("users", {
    createdAt: integer("createdAt", { mode: "timestamp" }).notNull(),
    username: text("username").primaryKey(),
});

export const entries = sqliteTable("entries", {
    id: integer("id", { mode: "number" }).primaryKey({ autoIncrement: true }),
    createdAt: integer("createdAt", { mode: "timestamp" }).notNull(),
    value: integer("value", { mode: "number" }).notNull(),
    username: text("username").notNull(),
});

export const userRelations = relations(users, ({ many }) => ({
    entries: many(entries),
}));

export const entryRelations = relations(entries, ({ one }) => ({
    user: one(users, {
        fields: [entries.username],
        references: [users.username],
    }),
}));

export type Entry = InferSelectModel<typeof entries>;
