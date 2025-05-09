import { hashedpassword } from '$lib';
import { useDrizzle } from '../../db/dbinit';
import { users } from '../../db/schema';
import type { Actions } from './$types';

export const actions = {
	default: async (event) => {
		const data = await event.request.formData();
		const email = String(data.get('email'));
		const passwd = String(data.get('password'));

		//username
		const name = email?.slice(0, email.indexOf('@'));
		const username = name.concat(Buffer.from(name).toString('base64'));

		const passhash = await hashedpassword(passwd);
		// console.log('email&user:', email, passwd, name.concat(encodedString));
		const sqlite = useDrizzle(event);
		const [registeruser] = await sqlite
			.insert(users)
			.values({ email: email, password: passhash, username: username })
			.returning({ id: users.id });

		return { success: registeruser.id };
	}
} satisfies Actions;
