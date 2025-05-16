<script lang="ts">
	import type { PageProps } from './$types';
	import { enhance } from '$app/forms';

	const { data }: PageProps = $props();
	const topfour = $state({
		one: data.topfour?.one ?? '',
		two: data.topfour?.two ?? '',
		three: data.topfour?.three ?? '',
		four: data.topfour?.four ?? ''
	});

	const albumCounts = ['one', 'two', 'three', 'four'] as const;
</script>

<div class="ml-5 mt-5">
	<h3 class="text-xl font-semibold text-gray-700 mb-2">Edit Profile</h3>
	<div class="text-gray-500 mb-1">Username: {data.username}</div>
	<div class="text-gray-500 mb-6">Email: {data.email}</div>
</div>

<h2 class="text-xl font-medium mx-auto md:max-w-2/3 w-4/5 text-gray-700 mb-6">Update</h2>

<form
	method="POST"
	class="space-y-6 mx-auto md:max-w-2/3 w-4/5"
	action="?/albumsupdate"
	use:enhance={() => {
		return async ({ result }) => {
			console.log(result.status);
			if (result.type === 'success') {
				alert('Update!');
			}
		};
	}}
>
	<div class="space-y-1">
		<label for="displayName" class="block text-sm font-medium text-gray-600">Display Name</label>
		<input
			id="displayName"
			name="displayName"
			type="text"
			value={data.displayname}
			class="w-full px-4 py-2 border border-gray-200 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-300 focus:border-blue-300 transition"
			required
		/>
	</div>

	{#each albumCounts as albumcount, index}
		<div class="space-y-1">
			<label for={`album${index}`} class="block text-sm font-medium text-gray-600"
				>Top Album #{index + 1}</label
			>
			<input
				name={`album${index + 1}`}
				id={`album${index}`}
				bind:value={topfour[albumcount]}
				type="text"
				class="w-full px-4 py-2 border border-gray-200 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-300 focus:border-blue-300 transition"
			/>
		</div>
	{/each}

	<div class="pt-2">
		<button
			type="submit"
			class="w-full sm:w-auto px-6 py-2 bg-gray-800 text-white rounded-md hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500 transition"
		>
			Save Changes
		</button>
	</div>

	<!--
  {#if form?.message}
    <p class="mt-4 text-sm text-green-600">{form.message}</p>
  {/if}
  -->
</form>
