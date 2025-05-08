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

<a class="album-link" href={`/album/${album.id}`}>
	<div class="album-card">
		<h3>ID: <span>{album.id}</span></h3>
		<h3>Album Name: <span>{album.title}</span></h3>
		<h3>Release Date: <span>{album['first-release-date'] || 'N/A'}</span></h3>
		<h3>
			Record Type:
			<span>
				{album['primary-type']}
				{album['secondary-types']?.length ? ` (${album['secondary-types'].join(', ')})` : ''}
			</span>
		</h3>
		<h3>Artist: <span>{album['artist-credit'][0]?.name}</span></h3>
	</div>
</a>

<style>
	.album-link {
		text-decoration: none;
		color: inherit;
		display: block;
	}

	.album-card {
		margin-left: auto;
		margin-right: auto;
		margin-bottom: 1rem;
		padding: 1.5rem;
		border: 1px solid #ccc;
		border-radius: 8px;
		background-color: #f9f9f9;
		box-shadow: 0 2px 6px rgba(0, 0, 0, 0.05);
		font-family: sans-serif;
		max-width: 500px;
		transition:
			transform 0.2s,
			box-shadow 0.2s;
	}

	.album-card:hover {
		transform: translateY(-2px);
		box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
	}

	h3 {
		margin: 0.5rem 0;
		color: #333;
		font-weight: normal;
	}

	span {
		font-weight: bold;
		color: #111;
	}
</style>
