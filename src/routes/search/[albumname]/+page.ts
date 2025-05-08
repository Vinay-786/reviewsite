import { error } from '@sveltejs/kit';
import type { PageLoad } from './$types';

export const load: PageLoad = async ({ params }) => {
	const res = await fetch(
		`https://musicbrainz.org/ws/2/release-group/?query=release:${encodeURIComponent(params.albumname)}&fmt=json`
	);
	const data = await res.json();

	return {
		//@ts-ignore
		albums: data['release-groups'] ?? [],
		album: params.albumname
	};
};
