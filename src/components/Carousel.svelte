<script lang="ts">
	import { onMount } from 'svelte';

	type ImageType = {
		title: string;
		id: string;
		img: string;
	};

	export let images: ImageType[];
	let carousel: HTMLUListElement | null = null;

	onMount(() => {
  const scrollWidth = carousel ? carousel.scrollWidth / 2 : 0;
  const itemWidth = carousel?.children[0]?.clientWidth || 300; // Fallback width

  const interval = setInterval(() => {
    if (!carousel) return;
    const isNearEnd = carousel.scrollLeft >= scrollWidth - 2 * carousel.clientWidth;

    if (isNearEnd) {
      carousel.scrollTo({
        left: 0,
        behavior: 'auto'
      });
      setTimeout(() => {
        carousel?.scrollBy({ left: 1, behavior: 'smooth' });
      }, 10);
    } else {
      carousel.scrollBy({ left: itemWidth, behavior: 'smooth' });
    }
  }, 2000);

  return () => clearInterval(interval);
});
</script>

<ul
	bind:this={carousel}
	class="flex overflow-x-auto gap-4 snap-mandatory snap-x before:shrink-0 after:shrink-0 w-[95%] md:w-3/4 no-scrollbar"
>
	<!-- Normal Images -->
	{#each [...images,...images] as { id, title, img }, i}
		<a
			class="shrink-0 snap-start"
			href={`/album/${id}`}
			style="visibility: {i >= images.length ? 'hidden' : 'visible'};"
		>
			<img class="rounded-xl" {title} src={img} alt={id} />
		</a>
	{/each}
</ul>

<style>
	/* Optional: Hide scrollbar for a cleaner look */
	.no-scrollbar::-webkit-scrollbar {
		display: none;
	}
	.no-scrollbar {
		-ms-overflow-style: none; /* IE and Edge */
		scrollbar-width: none; /* Firefox */
	}
</style>
