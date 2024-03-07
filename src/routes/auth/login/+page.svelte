<script lang="ts">
	import { page } from '$app/stores';
</script>

<div class="card">
	<h1>Login</h1>
	<form
		method="POST"
		action="?/login"
		class="flex flex-col justify-center items-start gap-4 w-full pt-4"
	>
		<input type="hidden" name="dest" value={$page.url.searchParams.get('dest')} />

		<label class="label" for="email">
			<span>Email</span>
			<input
				id="email"
				class="input"
				type="email"
				placeholder="example@email.com"
				name="email"
				autocomplete="email"
			/>
		</label>

		<label class="label" for="password">
			<span>Password</span>
			<input
				id="password"
				class="input"
				type="password"
				name="password"
				autocomplete="current-password"
			/>
		</label>

		<button class="btn variant-filled" type="submit">Submit</button>
	</form>
</div>

<br />

<div class="flex flex-col justify-center items-center">
	<p class="text-center">
		Forgot password?
		<a href="/auth/password/reset" class="underline">Reset Password</a>
	</p>

	<p class="text-center">Or</p>

	<p class="text-center">
		Don't have an account?
		<a href={`/auth/signup?dest=${$page.url.searchParams.get('dest')}`} class="underline">Sign up</a
		>
	</p>
</div>
