CREATE TABLE `reviews` (
	`id` text PRIMARY KEY NOT NULL,
	`reviewer` text,
	`content` text,
	`likes` numeric,
	FOREIGN KEY (`reviewer`) REFERENCES `users`(`id`) ON UPDATE no action ON DELETE no action
);
