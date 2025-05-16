import { error, isRedirect, redirect } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';
import { useDrizzle } from '../../db/dbinit';
import { reviews, userinfo, users } from '../../db/schema';
import { eq } from 'drizzle-orm';
import { isLoggedin } from '$lib';

export const load: PageServerLoad = async (event) => {
	try {
		const res = await isLoggedin(event);
		if (res.status === 200) {
			const sqlite = useDrizzle(event);
			const [user, userreviews] = await Promise.all([
				await sqlite
					.select({ id: users.id, username: users.username, displayname: userinfo.displayname })
					.from(users)
					.where(eq(users.username, event.params.slug))
					.leftJoin(userinfo, eq(userinfo.user, users.id))
					.then((res) => res[0]),

				await sqlite
					.select()
					.from(reviews)
					.where(eq(reviews.reviewer, String(res.userId)))
			]);

			// console.log(user);

			if (user) {
				return {
					user: user,
					reviews: userreviews
				};
			}
		} else {
			throw redirect(307, 'signin');
		}
	} catch (e) {
		if (isRedirect(e)) {
			throw redirect(e.status, e.location);
		}
		//@ts-ignore
		error(404, e.code); //ERR_JWT_EXPIRED
	}
};
