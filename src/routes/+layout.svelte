<script lang="ts">
	import Modal from '../components/Modal.svelte';
	let { children } = $props();
	let showModal = $state(false);
</script>

<nav>
	<a href="/">Home</a>
	<!-- <a href="/itsvinay.inaXRzdmluYXkuaW4="> profile</a> -->
	<a href="/signin"> SignIn</a>
	<a href="#search" onclick={() => (showModal = true)} style="cursor: grab"> Search</a>
</nav>

{@render children()}

<Modal bind:showModal>
	{#snippet header()}
		<h2>Search Album</h2>
	{/snippet}

	<div>search your album</div>
</Modal>
