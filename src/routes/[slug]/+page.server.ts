import { error, redirect } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';
import { useDrizzle } from '../../db/dbinit';
import { users } from '../../db/schema';
import { eq } from 'drizzle-orm';
import { jwtVerify } from 'jose';
import { env } from '$env/dynamic/private';
import { createSecretKey } from 'node:crypto';

export const load: PageServerLoad = async ({ params, platform, cookies }) => {
	const token = cookies.get('jwt-token') ?? ''
	if (!token) {
		throw redirect(307, '/signin');
	}

	const secretKey = createSecretKey(env.secretKey, 'utf-8')
	try {
		// verify token
		const { payload } = await jwtVerify(token, secretKey, {
			issuer: env.JWT_ISSUER, // issuer
			audience: env.JWT_AUDIENCE, // audience
		});

		console.log(payload);
		// log values to console
		//{
		//   id: 'ZDhmY2I0MTMtOWE1Yi00NzEwLTk2MzQtMWE2NDY3NzBkOWZi',
		//   iat: 1746623866,
		//   iss: 'cfsvelte',
		//   aud: 'reviewer.vinrar.in',
		//   exp: 1746624166
		// }

		const currentTime = Math.floor(Date.now() / 1000);
		if (payload.exp && payload.exp < currentTime) {
			throw redirect(307, "/signin")
			// console.log("Token expired")
		} else if (payload.exp && payload.exp > currentTime) {
			const sqlite = useDrizzle(platform?.env.DB!);
			const [user] = await sqlite
				.select({ id: users.id, username: users.username })
				.from(users)
				.where(eq(users.username, params.slug));

			if (user) {
				return user;
			}
		} else {
			console.log("Token is invalid");
		}
	} catch (e) {
		//@ts-ignore
		error(404, e.code); //ERR_JWT_EXPIRED
	}
};

