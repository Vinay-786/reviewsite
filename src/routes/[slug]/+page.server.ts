import { error, isRedirect, redirect } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';
import { useDrizzle } from '../../db/dbinit';
import { reviews, users } from '../../db/schema';
import { eq } from 'drizzle-orm';
import { isLoggedin } from '$lib';

export const load: PageServerLoad = async (event) => {
	//{
	//   id: 'ZDhmY2I0MTMtOWE1Yi00NzEwLTk2MzQtMWE2NDY3NzBkOWZi',
	//   iat: 1746623866,
	//   iss: 'cfsvelte',
	//   aud: 'reviewer.vinrar.in',
	//   exp: 1746624166
	// }

	try {
		const res = await isLoggedin(event);
		if (res.status === 200) {
			const sqlite = useDrizzle(event);
			const [user, userreviews] = await Promise.all([await sqlite
				.select({ id: users.id, username: users.username })
				.from(users)
				.where(eq(users.username, event.params.slug)).then((res) => res[0]),

			await sqlite.select().from(reviews).where(eq(reviews.reviewer, String(res.userId)))
			])

			if (user) {
				return {
					user: user,
					reviews: userreviews
				};
			}
		} else {
			throw redirect(307, "signin")
		}
	} catch (e) {
		if (isRedirect(e)) {
			throw redirect(e.status, e.location)
		}
		//@ts-ignore
		error(404, e.code); //ERR_JWT_EXPIRED
	}
};

