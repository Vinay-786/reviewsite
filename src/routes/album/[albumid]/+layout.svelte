<script lang="ts">
  import { onMount } from "svelte";
  import {page} from "$app/state"

  let album: any[];
  let coverarturl: string | null = null;
  let loading = true;
  
  onMount(async () => {
    loading = true;
    const [res, coverartRes] = await Promise.all([
      fetch(`https://musicbrainz.org/ws/2/release-group/?query=rgid:${page.params.albumid}&fmt=json`)
        .then((res) => res.json()),
      fetch(`https://coverartarchive.org/release-group/${page.params.albumid}/front-250`)
    ]);
    coverarturl = coverartRes.ok ? coverartRes.url : null;
    //@ts-ignore
    album = res['release-groups'] ?? [];
    loading = false;
  });
</script>

<div class="page-container">
  <aside>
    {#if loading}
      <p>Loading album details...</p>
    {:else if album.length === 0}
      <p>No albums found.</p>
    {:else}
      {#each album as album}
        <img src={coverarturl} alt="" />
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
    <slot />
  </main>
</div>

<style>
	.page-container {
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
