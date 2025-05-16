<script lang="ts">
	import { goto } from '$app/navigation';
	let { showModal = $bindable(), header } = $props();

	let dialog = $state<HTMLDialogElement | undefined>(); // HTMLDialogElement

	$effect(() => {
		if (showModal) dialog!.showModal();
	});
</script>

<!-- svelte-ignore a11y_click_events_have_key_events, a11y_no_noninteractive_element_interactions -->
<dialog
	bind:this={dialog}
	onclose={() => (showModal = false)}
	onclick={(e) => {
		if (e.target === dialog) dialog.close();
	}}
	class="bg-transparent p-0 backdrop:bg-opacity-5 rounded-lg overflow-hidden outline-none"
>
	<div class="bg-white rounded-lg shadow-lg w-96 max-w-full overflow-hidden">
		<div class="p-4 font-medium text-lg text-gray-800">
			{@render header?.()}
		</div>

		<hr class="border-gray-200 dark:border-gray-700" />

		<div class="p-4">
			<form
				class="w-full"
				onsubmit={(e) => {
					e.preventDefault();
					const input = e.currentTarget.querySelector('input') as HTMLInputElement;
					goto(`/search/${encodeURIComponent(input.value)}?page=1`);
					input.value = '';
					dialog!.close();
				}}
			>
				<input
					type="text"
					placeholder="Search..."
					class="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
				/>
			</form>
		</div>

		<hr class="border-gray-200 dark:border-gray-700" />

		<div class="p-4 flex justify-end">
			<!-- svelte-ignore a11y_autofocus -->
			<button
				autofocus
				onclick={() => dialog!.close()}
				class="px-4 py-2 bg-gray-100 rounded-md transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500"
			>
				Close
			</button>
		</div>
	</div>
</dialog>

<style>
	dialog {
		margin: auto;
	}

	dialog::backdrop {
		animation: fade 0.2s ease-out;
	}

	dialog[open] {
		animation: zoom 0.2s ease-out;
	}

	@keyframes zoom {
		from {
			transform: scale(0.95);
		}
		to {
			transform: scale(1);
		}
	}

	@keyframes fade {
		from {
			opacity: 0;
		}
		to {
			opacity: 1;
		}
	}
</style>
