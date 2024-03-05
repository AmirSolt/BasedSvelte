<script lang="ts">
	import { MailCheck } from 'lucide-svelte';
</script>

<div class="card-mod">
	<MailCheck color="#15CE48" size={100} />

	<h1>Check your email</h1>
	<p>
		Please check your inbox for a confirmation code. Please, check your spam if you did not find the
		email after <strong>5 minutes</strong>.
	</p>

	<form method="POST" class="flex flex-col justify-center items-start gap-4 w-full">
		<!-- <SuperTextInput
			session={data.session}
			formAttrName="tokenHash"
			{form}
			{constraints}
			{errors}
			isSessionOnly={false}
			autocomplete="one-time-code"
		>
			<div slot="head">
				<h3>Code</h3>
			</div>
		</SuperTextInput> -->

		<button class="btn variant-filled" type="submit">Submit</button>
	</form>
</div>
