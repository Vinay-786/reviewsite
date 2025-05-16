<script>
	import { enhance } from '$app/forms';
	import { goto, invalidateAll } from '$app/navigation';
	import { page } from '$app/state';
</script>

<div class="flex items-center justify-center py-12 px-4 bg-gray-100 min-h-screen">
	<div class="bg-white p-8 rounded-2xl shadow-lg w-full max-w-md">
		<h2 class="text-2xl font-semibold mb-6 text-center">Sign In</h2>

		<form
			method="POST"
			use:enhance={async () => {
				return async ({ result }) => {
					if (result.type === 'redirect') {
						goto(result.location, { invalidateAll: true });
					}
					if (result.type === 'error') {
						alert(`status ${result.status}:, ${result.error}`);
					}
				};
			}}
		>
			<div class="space-y-4">
				<div>
					<label for="email" class="block text-sm font-medium text-gray-700 mb-1"> Email </label>
					<input
						id="email"
						name="email"
						type="email"
						placeholder="Enter your email"
						required
						class="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
					/>
				</div>

				<div>
					<div class="flex justify-between items-center mb-1">
						<label for="password" class="block text-sm font-medium text-gray-700"> Password </label>
					</div>
					<input
						id="password"
						name="password"
						type="password"
						placeholder="Enter your password"
						required
						class="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
					/>
				</div>

				<button
					type="submit"
					class="w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 transition-colors font-medium"
				>
					Sign In
				</button>
			</div>

			<div class="mt-6 text-center text-sm text-gray-600">
				Don't have an account yet?
				<a href="/signup" class="text-blue-600 hover:text-blue-800 font-medium"> Sign up </a>
			</div>
		</form>
	</div>
</div>
