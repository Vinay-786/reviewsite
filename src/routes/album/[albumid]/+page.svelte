<script lang="ts">
	import { type SelectReviews } from '../../../db/schema';

	type AlbumReview = {
		reviews: SelectReviews;
		username: string;
	};
	export let data: {
		albumreviews: AlbumReview[];
	};
</script>

<div class="space-y-4">
	{#if data.albumreviews.length === 0}
		<div class="text-center py-6 bg-gray-50 rounded-lg">
			<p class="text-gray-500">No reviews yet. Be the first to write one!</p>
		</div>
	{:else}
		{#each data.albumreviews as $reviews}
			<div class="bg-gray-50 rounded-lg p-4 border border-gray-200 shadow-sm">
				<p class="text-gray-800 mb-3 whitespace-pre-line">{$reviews.reviews.content}</p>

				<div
					class="flex flex-wrap gap-x-4 gap-y-2 text-sm text-gray-600 pt-2 border-t border-gray-200"
				>
					<span class="flex items-center">
						<svg
							xmlns="http://www.w3.org/2000/svg"
							class="h-4 w-4 mr-1 text-blue-500"
							fill="none"
							viewBox="0 0 24 24"
							stroke="currentColor"
						>
							<path
								stroke-linecap="round"
								stroke-linejoin="round"
								stroke-width="2"
								d="M14 10h4.764a2 2 0 011.789 2.894l-3.5 7A2 2 0 0115.263 21h-4.017c-.163 0-.326-.02-.485-.06L7 20m7-10V5a2 2 0 00-2-2h-.095c-.5 0-.905.405-.905.905 0 .714-.211 1.412-.608 2.006L7 11v9m7-10h-2M7 20H5a2 2 0 01-2-2v-6a2 2 0 012-2h2.5"
							/>
						</svg>
						{$reviews.reviews.likes} Likes
					</span>

					<span class="flex items-center">
						<svg
							xmlns="http://www.w3.org/2000/svg"
							class="h-4 w-4 mr-1 text-gray-500"
							fill="none"
							viewBox="0 0 24 24"
							stroke="currentColor"
						>
							<path
								stroke-linecap="round"
								stroke-linejoin="round"
								stroke-width="2"
								d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
							/>
						</svg>
						{$reviews.username}
					</span>
				</div>
			</div>
		{/each}
	{/if}
</div>
