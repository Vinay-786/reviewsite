<script lang="ts">
	const { data } = $props();
</script>

<main class="max-w-4xl mx-auto px-4 py-8">
	<!-- Profile Header -->
	<div class="text-center mb-12">
		<h1 class="text-3xl font-light text-gray-800 mb-2">Profile</h1>
		<h2 class="text-xl text-gray-600 font-medium">{data.user?.displayname}</h2>
		<p class="text-gray-500">@{data.user?.username}</p>
		<a class="text-blue-800 font-bold" href={`/${data.user?.username}/edit`}> Edit</a>
	</div>

	<!-- Reviews Section -->
	<div class="border-t border-gray-100 pt-8">
		<h3 class="text-xl font-light text-gray-700 mb-6">Reviews</h3>

		{#if !data.reviews}
			<p class="text-gray-400 text-center py-12">No reviews yet</p>
		{:else}
			<div class="space-y-4">
				{#each data.reviews as review}
					<a
						href={`/album/${review.albumid}`}
						data-sveltekit-preload-data="off"
						class="block hover:bg-gray-50 transition-colors duration-150"
					>
						<div class="border border-gray-100 rounded-lg p-6 hover:shadow-sm">
							<div class="flex justify-between items-start mb-2">
								<h4 class="font-medium text-gray-800">{review.albumname}</h4>
								<time class="text-sm text-gray-400">
									{new Date(review.date).toLocaleDateString()}
								</time>
							</div>
							<p class="text-gray-600 mb-3">{review.content}</p>
							<div class="flex items-center text-sm text-gray-400">
								<svg
									xmlns="http://www.w3.org/2000/svg"
									class="h-4 w-4 mr-1"
									fill="none"
									viewBox="0 0 24 24"
									stroke="currentColor"
								>
									<path
										stroke-linecap="round"
										stroke-linejoin="round"
										stroke-width="2"
										d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
									/>
								</svg>
								<span>{review.likes}</span>
							</div>
						</div>
					</a>
				{/each}
			</div>
		{/if}
	</div>
</main>
