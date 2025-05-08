<script lang="ts">
	import Album from '../../../components/Album.svelte';
	export let data: {
		albums: any[];
		album: string;
	};
</script>

<h1>Album search: {data.album}</h1>

{#if data.albums.length === 0}
	<p>No albums found.</p>
{:else}
	{#each data.albums as album}
		<Album {album} />
	{/each}
{/if}
