import type { PageServerLoad } from '../$types';
import { isLoggedin } from '$lib';
import { useDrizzle } from '../../../db/dbinit';
import { eq } from 'drizzle-orm';
import { userinfo, users } from '../../../db/schema';
import { isRedirect, redirect } from '@sveltejs/kit';
import type { Actions } from './$types';

export const load: PageServerLoad = async (event) => {
	try {
		const res = await isLoggedin(event);
		if (res.status === 200) {
			const sqlite = useDrizzle(event);
			const user = await sqlite
				.select({
					username: users.username,
					email: users.email,
					displayname: userinfo.displayname,
					topfour: userinfo.topfour
				})
				.from(users)
				.where(eq(users.username, event.params.slug))
				.leftJoin(userinfo, eq(userinfo.user, users.id))
				.then((res) => res[0]);

			// console.log(user)

			if (user) {
				return user;
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

export const actions = {
	albumsupdate: async (event) => {
		const data = await event.request.formData();
		const displayName = String(data.get('displayName'));
		const album1 = String(data.get('album1'));
		const album2 = String(data.get('album2'));
		const album3 = String(data.get('album3'));
		const album4 = String(data.get('album4'));

		try {
			const sqlite = useDrizzle(event);
			const nameandalbum = await sqlite.update(userinfo).set({
				displayname: displayName,
				topfour: { one: album1, two: album2, three: album3, four: album4 }
			});

			if (nameandalbum.success) {
				return { message: 'success' };
			}
		} catch (e) {
			throw e;
		}
	}
} satisfies Actions;
