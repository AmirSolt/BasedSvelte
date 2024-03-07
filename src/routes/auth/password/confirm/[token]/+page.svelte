<script lang="ts">

	export let data;
	let { token } = data;
</script>

<div class="card-mod">
	<form
		method="POST"
		action="?/confirm"
		class="flex flex-col justify-center items-start gap-4 w-full"
	>
		<input type="hidden" name="token" value={token} />

		<label class="label" for="password1">
			<span>Password</span>
			<input
				id="password1"
				class="input"
				type="password"
				name="password1"
				autocomplete="new-password"
			/>
		</label>
		<label class="label" for="password2">
			<span>Confirm Password</span>
			<input
				id="password2"
				class="input"
				type="password"
				name="password2"
				autocomplete="new-password"
			/>
		</label>

		<button class="btn variant-filled" type="submit">Submit</button>
	</form>
</div>
