<script>
	import { enhance } from '$app/forms';
	import { goto } from '$app/navigation';
	// No need for special scripts here for basic form posting
	const { form } = $props();
</script>

<h2> Sign In</h2>

<form method="POST" use:enhance={() => {
		return async({result}) => {
		console.log(result.status)
			if (result.type === "redirect"){
				goto(result.location)
			}
		}
	}}>
	<div
		style="
			display: flex;
			flex-direction: column;
			gap: 1rem;
			background: rebeccapurple;
			width: fit-content;
			padding: 1rem;
			border-radius: 1rem;
		"
	>
		<div>
			<label for="email"> Email</label>
			<input name="email" placeholder="Enter your email" required />
		</div>
		<div>
			<label for="password"> Password</label>
			<input name="password" type="password" placeholder="password" required />
		</div>
		<button type="submit">Submit</button>
	</div>
	Don't have an account yet? <a href="/signup">Signup</a>
</form>

{#if form?.error}
	<pre>{form.error}</pre>
{/if}
 
