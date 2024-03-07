<script lang="ts">
	import { CheckCircle } from 'lucide-svelte';
</script>

<div class="card-mod flex flex-col justify-center items-center gap-4">
	<CheckCircle color="#15CE48" size={200} />

	<div class="flex flex-col justify-center items-center gap-2">
		<h1 class="text-4xl">Success!</h1>
		<p>We are processing your transaction.</p>
	</div>

	<a href="/profile/settings" class="btn variant-ringed"> ← Settings </a>
</div>
