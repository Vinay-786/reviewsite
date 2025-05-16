<script lang="ts">
	export let album: {
		id: string;
		title: string;
		'first-release-date'?: string;
		'primary-type'?: string;
		'secondary-types'?: string[];
		'artist-credit': { name: string }[];
	};
</script>

<a
	class="block no-underline text-inherit hover:transform hover:-translate-y-0.5 transition-all duration-200 mx-2"
	href={`/album/${album.id}`}
>
	<div
		class="max-w-lg mx-auto mb-4 p-3 bg-gray-50 dark:bg-gray-700 border border-gray-200 dark:border-gray-700 rounded-lg shadow-sm hover:shadow-md transition-shadow duration-200"
	>
		<h3 class="my-2 text-gray-700 dark:text-gray-300 font-normal">
			Album Name: <span class="font-bold text-gray-900 dark:text-white">{album.title}</span>
		</h3>
		<h3 class="my-2 text-gray-700 dark:text-gray-300 font-normal">
			Release Date: <span class="font-bold text-gray-900 dark:text-white"
				>{album['first-release-date'] || 'N/A'}</span
			>
		</h3>
		<h3 class="my-2 text-gray-700 dark:text-gray-300 font-normal">
			Record Type:
			<span class="font-bold text-gray-900 dark:text-white">
				{album['primary-type']}
				{album['secondary-types']?.length ? ` (${album['secondary-types'].join(', ')})` : ''}
			</span>
		</h3>
		<h3 class="my-2 text-gray-700 dark:text-gray-300 font-normal">
			Artist: <span class="font-bold text-gray-900 dark:text-white"
				>{album['artist-credit'][0]?.name}</span
			>
		</h3>
	</div>
</a>
