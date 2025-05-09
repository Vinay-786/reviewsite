import { drizzle } from 'drizzle-orm/d1';
import * as schema from './schema';
import type { RequestEvent } from '@sveltejs/kit';

export const useDrizzle = (e: RequestEvent) => {
	return drizzle(e.platform?.env.DB!, { schema: schema });
};
