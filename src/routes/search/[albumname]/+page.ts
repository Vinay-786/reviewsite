import type { PageLoad } from './$types';

export const load: PageLoad = async ({ params, url }) => {
	const pageno = Number(url.searchParams.get("page"));
	const offset = pageno ? (pageno - 1) : 0;
	const data = await fetch(
		`https://musicbrainz.org/ws/2/release-group/?query=release:${encodeURIComponent(params.albumname)}&offset=${offset}&fmt=json`
	).then((res) => res.json());

	return {
		//@ts-ignore
		albums: data['release-groups'] ?? [],
		album: params.albumname,
	};
};

// page 1 = first 25
// 
// page 2 = 
// page 3 = skip 25
