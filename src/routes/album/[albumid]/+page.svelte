<script lang="ts">
	import { enhance } from "$app/forms";
	export let data: {
		album: any[];
		albumid: string;
		coverarturl: string;
	};
</script>

<h2>Album page</h2>
<div class="container">
	<aside>
		{#if data.album.length === 0}
			<p>No albums found.</p>
		{:else}
			{#each data.album as album}
				<img src={data.coverarturl} alt="" />
				<!-- <p>{album.id}</p> -->
				<p style="font-weight: bold;">{album.title}</p>
				<p>{album['first-release-date']}</p>
				<p>{album['primary-type']}</p>
				{#each album['artist-credit'] as artist}
					<p>{artist.name}</p>
				{/each}
				{#each album.tags as tags}
					<span>{tags.name + ' '}</span>
				{/each}
			{/each}
		{/if}
	</aside>
	<main>
		<h3>Reviews</h3>
		<div>
		<form method="post" action="?/submitreview" use:enhance>
		<textarea name="review" id="review" rows="10" cols="50"></textarea>
		<button type="submit"> Submit </button>
		</form>
		</div>
	</main>
</div>

<style>
	.container {
		display: flex;
		gap: 2rem;
		padding: 2rem;
	}

	aside {
		flex: 1;
		background-color: #f9f9f9;
		padding: 1.5rem;
		border-radius: 12px;
		box-shadow: 0 4px 12px rgba(0, 0, 0, 0.05);
		max-width: 300px;
	}

	main {
		flex: 2;
		padding: 1.5rem;
		background-color: #fff;
		border-radius: 12px;
		border: 1px solid #ddd;
		box-shadow: 0 2px 8px rgba(0, 0, 0, 0.03);
	}

	img {
		width: 100%;
		object-fit: cover;
		border-radius: 8px;
		margin-bottom: 1rem;
	}

	h2,
	h3 {
		margin-top: 0;
		color: #2c3e50;
	}

	p {
		margin: 0.25rem 0;
		color: #444;
		font-size: 0.95rem;
	}

	span {
		background-color: #eee;
		color: #555;
		padding: 0.2rem 0.5rem;
		margin-right: 0.3rem;
		border-radius: 6px;
		font-size: 0.8rem;
		display: inline-block;
	}
</style>
