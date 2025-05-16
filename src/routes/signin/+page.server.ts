import { hashedpassword } from '$lib';
import { and, eq } from 'drizzle-orm';
import { useDrizzle } from '../../db/dbinit';
import { users } from '../../db/schema';
import type { Actions } from './$types';
import { generateToken, refreshToken } from '$lib/jwtutil';
import { error, redirect } from '@sveltejs/kit';
import * as process from 'node:process';
import { user } from '../../stores/session';

export const actions = {
	default: async (event) => {
		const data = await event.request.formData();
		const email = String(data.get('email'));
		const passwd = String(data.get('password'));
		let userloggedin: { userid: string; username: string };

		try {
			const passhash = await hashedpassword(passwd);
			const sqlite = useDrizzle(event);
			const [loggeduser] = await sqlite
				.select({ id: users.id, user: users.username, email: users.email })
				.from(users)
				.where(and(eq(users.email, email), eq(users.password, passhash)));

			if (!loggeduser) {
				throw error(401, 'wrong credentials');
			}

			userloggedin = { userid: loggeduser.id, username: loggeduser.user };
		} catch (e) {
			throw error(401, 'error signing in');
		}

		const token = await generateToken(userloggedin.userid, userloggedin.username);
		event.cookies.set('jwt-auth-token', token, {
			path: '/',
			httpOnly: true,
			sameSite: 'strict',
			maxAge: 60 * 15,
			secure: process.env.NODE_ENV === 'production'
		});

		const refresh = await refreshToken(userloggedin.userid, userloggedin.username);
		event.cookies.set('jwt-ref-token', refresh, {
			path: '/',
			httpOnly: true,
			sameSite: 'strict',
			maxAge: 60 * 60 * 24 * 7,
			secure: process.env.NODE_ENV === 'production'
		});

		user.set({ userid: userloggedin.userid, username: userloggedin.username });
		throw redirect(303, `/${userloggedin.username}`);
	}
} satisfies Actions;

// console.log(env.PASSWORD)
