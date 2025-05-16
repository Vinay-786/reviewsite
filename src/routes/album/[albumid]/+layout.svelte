<script lang="ts">
	import { onMount } from 'svelte';
	import { enhance } from '$app/forms';
	import { invalidate } from '$app/navigation';
	import { page } from '$app/state';

	let album: any[];
	let coverarturl: string | null = null;
	let loading = true;

	onMount(async () => {
		loading = true;
		const res = await fetch(
			`https://musicbrainz.org/ws/2/release-group/?query=rgid:${page.params.albumid}&fmt=json`
		).then((res) => res.json());

		const coverartRes = await fetch(
			`https://coverartarchive.org/release-group/${page.params.albumid}/front-250`
		);
		coverarturl = coverartRes.ok ? coverartRes.url : null;
		//@ts-ignore
		album = res['release-groups'] ?? [];
		loading = false;
	});
</script>

<div class="p-4 md:p-8">
	<!-- Mobile album info (shows only on small screens) -->
	<div class="md:hidden mb-6 bg-gray-50 p-4 rounded-xl shadow-sm">
		{#if loading}
			<p class="text-gray-600">Loading album details...</p>
		{:else if album.length === 0}
			<p class="text-gray-600">No albums found.</p>
		{:else}
			{#each album as album}
				<div class="flex flex-col items-center">
					<img
						src={coverarturl}
						alt="Album cover"
						class="w-48 h-48 object-cover rounded-lg mb-4 shadow-md"
					/>
					<div class="text-center">
						<p class="font-bold text-gray-800 text-lg mb-1">{album.title}</p>
						<p class="text-gray-600 mb-1">{album['first-release-date']}</p>
						<p class="text-gray-600 mb-2">{album['primary-type']}</p>

						<div class="mb-2">
							{#each album['artist-credit'] as artist}
								<p class="text-gray-700">{artist.name}</p>
							{/each}
						</div>

						<div class="flex flex-wrap justify-center gap-2 mt-2">
							{#if album.tags}
								{#each album.tags.slice(0, 5) as tags}
									<span class="bg-gray-200 text-gray-600 px-2 py-1 rounded-md text-xs">
										{tags.name}
									</span>
								{/each}
							{/if}
						</div>
					</div>
				</div>
			{/each}
		{/if}
	</div>

	<div class="flex flex-col md:flex-row gap-8">
		<!-- Sidebar for md screens and up - fixed, not scrollable -->
		<aside class="hidden md:block bg-gray-50 p-6 rounded-xl shadow-sm flex-none w-72">
			{#if loading}
				<p class="text-gray-600">Loading album details...</p>
			{:else if album.length === 0}
				<p class="text-gray-600">No albums found.</p>
			{:else}
				{#each album as album}
					<img
						src={coverarturl}
						alt="Album cover"
						class="w-full aspect-square object-cover rounded-lg mb-4 shadow-md"
					/>
					<p class="font-bold text-gray-800 mb-1">{album.title}</p>
					<p class="text-gray-600 mb-1">{album['first-release-date']}</p>
					<p class="text-gray-600 mb-3">{album['primary-type']}</p>

					<div class="mb-3">
						{#each album['artist-credit'] as artist}
							<p class="text-gray-700">{artist.name}</p>
						{/each}
					</div>

					<div class="flex flex-wrap gap-2 mt-3">
						{#each album.tags as tags}
							<span class="bg-gray-200 text-gray-600 px-2 py-1 rounded-md text-xs">
								{tags.name}
							</span>
						{/each}
					</div>
				{/each}
			{/if}
		</aside>

		<!-- Main content area - scrollable -->
		<main
			class="flex-grow bg-white p-6 rounded-xl border border-gray-200 shadow-sm md:h-[calc(100vh-4rem)] md:overflow-y-auto"
		>
			<div>
				<section>
					<h3 class="text-xl font-semibold text-gray-700 mb-4">Reviews</h3>
					<div class="mb-8">
						<form
							method="POST"
							use:enhance={() => {
								return async ({ result }) => {
									if (result.type === 'success') {
										await invalidate(`api:reviews:${page.params.albumid}`);
										alert('Success');
									} else {
										alert('not logged in');
									}
								};
							}}
							class="mb-8"
						>
							<div class="space-y-3">
								<textarea
									name="review"
									id="review"
									rows="4"
									placeholder="Write your review..."
									class="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-gray-700 resize-y"
								></textarea>

								{#if album && album.length > 0}
									<input hidden name="albumname" value={album[0].title} />
								{/if}

								<div class="flex justify-end">
									<button
										type="submit"
										class="px-5 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors shadow-sm font-medium"
									>
										Post Review
									</button>
								</div>
							</div>
						</form>
					</div>
					<slot />
				</section>
			</div>
		</main>
	</div>
</div>
