PRAGMA foreign_keys=OFF;--> statement-breakpoint
CREATE TABLE `__new_userinfo` (
	`id` text PRIMARY KEY NOT NULL,
	`displayname` text,
	`topfour` text,
	`user` text NOT NULL,
	FOREIGN KEY (`user`) REFERENCES `users`(`id`) ON UPDATE no action ON DELETE cascade
);
--> statement-breakpoint
INSERT INTO `__new_userinfo`("id", "displayname", "topfour", "user") SELECT "id", "displayname", "topfour", "user" FROM `userinfo`;--> statement-breakpoint
DROP TABLE `userinfo`;--> statement-breakpoint
ALTER TABLE `__new_userinfo` RENAME TO `userinfo`;--> statement-breakpoint
PRAGMA foreign_keys=ON;--> statement-breakpoint
ALTER TABLE `reviews` ADD `albumname` text NOT NULL;--> statement-breakpoint
ALTER TABLE `reviews` ADD `order_date` integer DEFAULT (unixepoch() * 1000) NOT NULL;