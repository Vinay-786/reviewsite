CREATE TABLE `users` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`username` text,
	`phone_no` integer NOT NULL,
	`email` text NOT NULL,
	`passwd` text
);
--> statement-breakpoint
CREATE UNIQUE INDEX `email_idx` ON `users` (`email`);