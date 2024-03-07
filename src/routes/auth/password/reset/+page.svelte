<div class="card-mod">
	<h1>Update Password</h1>

	<form
		method="POST"
		action="?/reset"
		class="flex flex-col justify-center items-start gap-4 w-full"
	>
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

		<button class="btn variant-filled" type="submit">Submit</button>
	</form>
</div>
