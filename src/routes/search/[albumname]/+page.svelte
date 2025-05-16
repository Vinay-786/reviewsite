<script lang="ts">
	import Album from '../../../components/Album.svelte';
	import { page } from '$app/state';

	export let data: {
		albums: any[];
		album: string;
	};

	const pageparam = Number(page.url.searchParams.get('page'))
	const nextpage = data.albums.length < 25 ? null : pageparam + 1
</script>

<div class="max-w-4xl mx-auto px-4 py-8">
	<header class="mb-8 text-center">
		<h1 class="text-3xl font-bold text-gray-800 dark:text-gray-100 mb-2">
			Searching for "<span class="text-blue-600 dark:text-blue-400">{data.album}</span>"
		</h1>
		<div class="w-16 h-1 bg-blue-500 mx-auto mb-4"></div>

		{#if data.albums.length === 0}
			<p
				class="text-lg text-gray-600 dark:text-gray-300 mt-6 bg-gray-100 dark:bg-gray-800 py-4 px-6 rounded-lg inline-block shadow-sm"
			>
				No albums found matching your search.
			</p>
		{:else}
			<p class="text-gray-600 dark:text-gray-300">
				Found {data.albums.length}
				{data.albums.length === 1 ? 'album' : 'albums'}
			</p>
		{/if}
	</header>

	{#if data.albums.length > 0}
		<div class="grid gap-6 md:grid-cols-2">
			{#each data.albums as album}
				<Album {album} />
			{/each}
		</div>
	{/if}

	{#if nextpage}
		<div class="flex justify-center my-8 font-semibold">
			<a 
				data-sveltekit-reload 
				href={`/search/${encodeURIComponent(page.params.albumname)}?page=${nextpage}`} 
				class="text-xl text-blue-600 hover:text-blue-700 transition-colors underline"
			>
				Next Page →
			</a>
		</div>
	{/if}
</div>
