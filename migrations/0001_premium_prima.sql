PRAGMA foreign_keys=OFF;--> statement-breakpoint
CREATE TABLE `__new_users` (
	`id` text PRIMARY KEY NOT NULL,
	`username` text NOT NULL,
	`phone_no` integer,
	`email` text NOT NULL,
	`passwd` text
);
--> statement-breakpoint
INSERT INTO `__new_users`("id", "username", "phone_no", "email", "passwd") SELECT "id", "username", "phone_no", "email", "passwd" FROM `users`;--> statement-breakpoint
DROP TABLE `users`;--> statement-breakpoint
ALTER TABLE `__new_users` RENAME TO `users`;--> statement-breakpoint
PRAGMA foreign_keys=ON;--> statement-breakpoint
CREATE UNIQUE INDEX `email_idx` ON `users` (`email`);