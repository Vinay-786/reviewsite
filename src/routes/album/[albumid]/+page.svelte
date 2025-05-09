<script lang="ts">
	import { enhance } from "$app/forms";
  import { invalidate } from '$app/navigation';
  import { page } from "$app/state"
  import { type SelectReviews } from "../../../db/schema";

  export let data: {
    albumreviews:  SelectReviews[]
    };
</script>

<h2>Album page</h2>
<div>
  <main>
    <h3>Reviews</h3>
    <div class="container">
      <form method="POST" use:enhance={()=> {    		
					return async({result}) => {
						if (result.type === "success"){
							await invalidate(`api:reviews:${page.params.albumid}`);
							alert('Success')
						}else {
							alert('not logged in')
						}
					}
      	}}
      	class="review-form"
      >
      	<div style="flex: auto; flex-direction: row;">
        <textarea name="review" id="review" rows="5" cols="50"></textarea>
        <button type="submit">Submit</button>
        <div>
      </form>
    </div>
    <div class="reviews-container">
  {#each data.albumreviews as $reviews}
    <div class="review-card">
      <p class="review-content">{$reviews.content}</p>
      <p class="review-meta">
        <span>👍 {$reviews.likes} Likes</span> • 
        <span>👤 Reviewer: {$reviews.reviewer}</span>
      </p>
    </div>
  {/each}
</div>
  </main>
</div>

<style>
	 .review-form {
    display: flex;
    flex-direction: column;
    gap: 10px;
    max-width: 500px;
    margin: 0 auto;
  }

  .review-form textarea {
    width: 100%;
    padding: 10px;
    border: 1px solid #ccc;
    border-radius: 5px;
    resize: vertical;
    font-size: 14px;
  }

  .review-form button {
    padding: 10px 15px;
    background-color: #0278ff;
    border: none;
    color: white;
    border-radius: 5px;
    cursor: pointer;
    font-size: 14px;
  }

  .review-form button:hover {
    background-color: #005fcc;
  }

	main {
		flex: 2;
		padding: 1.5rem;
		background-color: #fff;
		box-shadow: 0 2px 8px rgba(0, 0, 0, 0.03);
	}

	h2,
	h3 {
		margin-top: 0;
		color: #2c3e50;
	}

	p {
		margin: 0.25rem 0;
		color: #444;
		font-size: 0.95rem;
	}

	 .reviews-container {
    display: flex;
    flex-direction: column;
    gap: 15px;
    margin-top: 20px;
  }

  .review-card {
    padding: 15px;
    border: 1px solid #ddd;
    border-radius: 8px;
    background-color: #fafafa;
  }

  .review-content {
    font-size: 15px;
    margin-bottom: 10px;
    color: #333;
  }

  .review-meta {
    font-size: 13px;
    color: #777;
    display: flex;
    justify-content: space-between;
  }

  .review-meta span {
    display: inline-block;
  }
</style>
