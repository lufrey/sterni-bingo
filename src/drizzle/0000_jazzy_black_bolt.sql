CREATE TABLE `entries` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`createdAt` integer NOT NULL,
	`value` integer NOT NULL
);
--> statement-breakpoint
CREATE TABLE `users` (
	`createdAt` integer NOT NULL,
	`username` text PRIMARY KEY NOT NULL
);
