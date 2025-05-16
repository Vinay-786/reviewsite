<script lang="ts">
	type ImageType = {
		title: string;
		id: string;
		img: string;
	};

	export let headername: string;
	export let images: ImageType[];
</script>

<div class="flex flex-col">

	<h1 
  class="text-blue-600 m-5 p-2 rounded-lg shadow-sm border-b-4 border-blue-500" 
  style="
    font-family: 'Poppins', sans-serif; 
    font-size: clamp(1.5rem, 2.5vw + 1rem, 3.5rem);
  "
>
  {headername}
</h1>
		<div class="grid grid-cols-4 gap-2 md:gap-6 p-1 md:p-5">
			{#each images as {title, id, img}}
				<a class="shrink-0" href={`/album/${id}`}>
					<img loading="lazy" class="rounded-xl" src={img} alt={title}>
				</a>
			{/each}
	</div>
</div>
