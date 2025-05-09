<script lang="ts">
	const { data } = $props();
</script>

<main>
	<h4>Hello from profile</h4>
	<h4>{data.user?.id}</h4>
	<h4>{data.user?.username}</h4>
	{#if !data.userreviews}
		<p> No reviews</p>
	{:else}
	{#each data.userreviews as review}
		<p> {review.id}</p>
		<p> {review.content}</p>
		<p> {review.likes}</p>
	{/each}
	{/if}
</main>
