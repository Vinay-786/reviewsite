import { isLoggedin } from '$lib';
import type { LayoutServerLoad } from './$types';

export const load: LayoutServerLoad = async (event) => {
	const { status, user } = await isLoggedin(event);

	console.log('is it updating...', user);

	if (user) {
		return {
			logstatus: status,
			user: String(user)
		};
	}

	return {
		logstatus: status,
		user: null
	};
};
