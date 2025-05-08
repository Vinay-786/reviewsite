import { drizzle } from 'drizzle-orm/d1';
import * as schema from './schema';

export const useDrizzle = (DB: D1Database) => {
	return drizzle(DB, { schema: schema });
};
