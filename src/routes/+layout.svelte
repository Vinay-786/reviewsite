<script lang="ts">
	import '../app.css';
	import Modal from '../components/Modal.svelte';
	let { data, children } = $props();
	let showModal = $state(false);
</script>

<nav class="bg-white shadow-md p-4 flex gap-5 items-center justify-center rounded-lg mx-5 mt-5">
	<a class="text-xl text-gray-700 hover:text-blue-500 transition duration-200" href="/"> Home </a>
	<!-- <a href="/itsvinay.inaXRzdmluYXkuaW4="> profile</a> -->
	{#if data.logstatus === 200}
		<a
			data-sveltekit-reload
			class="text-xl text-gray-700 hover:text-blue-500 transition duration-200"
			href={`/${data.user}`}
		>
			Profile
		</a>
	{:else}
		<a
			data-sveltekit-reload
			class="text-xl text-gray-700 hover:text-blue-500 transition duration-200"
			href="/signin"
		>
			SignIn
		</a>
	{/if}
	<a
		class="text-xl text-gray-700 hover:text-blue-500 transition duration-200 cursor-pointer"
		href="#search"
		onclick={() => (showModal = true)}
	>
		Search
	</a>
</nav>

{@render children()}

<Modal bind:showModal>
	{#snippet header()}
		<h2>Search Album</h2>
	{/snippet}
</Modal>
