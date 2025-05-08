import { sqliteTable as table } from 'drizzle-orm/sqlite-core';
import * as t from 'drizzle-orm/sqlite-core';

export const users = table(
	'users',
	{
		id: t
			.text('id')
			.primaryKey()
			.notNull()
			.$defaultFn(() => crypto.randomUUID()),
		username: t.text('username').notNull(),
		phone_no: t.int('phone_no'),
		email: t.text().notNull().notNull(),
		password: t.text('passwd')
	},
	(table) => [t.uniqueIndex('email_idx').on(table.email)]
);

export const reviews = table(
	'reviews',
	{
		id: t
			.text('id')
			.primaryKey()
			.notNull()
			.$defaultFn(() => crypto.randomUUID()),
		reviewer: t.text().references(() => users.id),
		content: t.text(),
		likes: t.numeric()
	}
)
