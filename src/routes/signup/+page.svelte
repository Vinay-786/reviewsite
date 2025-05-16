<script>
	// No need for special scripts here for basic form posting
	const { form } = $props();
</script>

<div class="flex items-center justify-center py-12 px-4 bg-gray-100 min-h-screen">
	<div class="bg-white p-8 rounded-2xl shadow-lg w-full max-w-md">
		<h2 class="text-2xl font-semibold mb-6 text-center">Create an Account</h2>

		{#if form?.success}
			<div class="mb-6 p-3 bg-green-50 border border-green-200 text-green-700 rounded-lg text-sm">
				{form.success}
			</div>
		{/if}

		<form method="POST">
			<div class="space-y-4">
				<div>
					<label for="email" class="block text-sm font-medium text-gray-700 mb-1">
						Email Address
					</label>
					<input
						id="email"
						name="email"
						type="email"
						placeholder="Enter your email address"
						required
						class="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition-all"
					/>
				</div>

				<div>
					<label for="password" class="block text-sm font-medium text-gray-700 mb-1">
						Password
					</label>
					<input
						id="password"
						name="password"
						type="password"
						placeholder="Create a strong password"
						required
						class="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition-all"
					/>
					<p class="mt-1 text-xs text-gray-500">Password must be at least 8 characters</p>
				</div>

				<button
					type="submit"
					class="w-full bg-purple-600 text-white py-3 rounded-lg hover:bg-purple-700 transition-colors font-medium mt-4"
				>
					Create Account
				</button>
			</div>

			<div class="mt-6 text-center text-sm text-gray-600">
				Already have an account?
				<a href="/signin" class="text-purple-600 hover:text-purple-800 font-medium"> Sign in </a>
			</div>
		</form>
	</div>
</div>
