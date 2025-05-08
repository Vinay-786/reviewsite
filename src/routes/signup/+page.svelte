<script>
	// No need for special scripts here for basic form posting
	const { form } = $props();
</script>

<h3> Signup</h3>
<form method="POST">
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
</form>

{#if form}
	<pre>{form.success}</pre>
{/if}
