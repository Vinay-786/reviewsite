CREATE TABLE `userinfo` (
	`id` text PRIMARY KEY NOT NULL,
	`displayname` text,
	`topfour` text,
	`user` text,
	FOREIGN KEY (`user`) REFERENCES `users`(`id`) ON UPDATE no action ON DELETE cascade
);
