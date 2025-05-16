import { sqliteTable as table } from 'drizzle-orm/sqlite-core';
import * as t from 'drizzle-orm/sqlite-core';
import { relations, sql, type InferSelectModel } from 'drizzle-orm';

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

export const userinfo = table('userinfo', {
	id: t
		.text('id')
		.primaryKey()
		.notNull()
		.$defaultFn(() => crypto.randomUUID()),
	displayname: t.text(),
	topfour: t
		.text({ mode: 'json' })
		.$type<{ one: string; two: string; three: string; four: string }>(),
	user: t
		.text()
		.notNull()
		.references(() => users.id, { onDelete: 'cascade' })
});

export const likedalbum = table('likedalbum', {
	id: t
		.text('id')
		.primaryKey()
		.notNull()
		.$defaultFn(() => crypto.randomUUID()),
	album_id: t.text(),
	user: t.text().references(() => users.id, { onDelete: 'cascade' })
});

export const reviews = table('reviews', {
	id: t
		.text('id')
		.primaryKey()
		.notNull()
		.$defaultFn(() => crypto.randomUUID()),
	reviewer: t
		.text()
		.references(() => users.id, { onDelete: 'cascade' })
		.notNull(),
	albumid: t.text().notNull(),
	albumname: t.text().notNull(),
	content: t.text().notNull(),
	likes: t.int().notNull().default(0),
	date: t
		.int('order_date', { mode: 'number' })
		.default(sql`(unixepoch() * 1000)`)
		.notNull()
});

export const usersRelations = relations(users, ({ one }) => ({
	profileInfo: one(userinfo)
}));

export type SelectReviews = InferSelectModel<typeof reviews>;
