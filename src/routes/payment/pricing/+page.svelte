<script lang="ts">
	import { HelpCircle } from 'lucide-svelte';
	import { Accordion, AccordionItem } from '@skeletonlabs/skeleton';
	import PriceCard from './PriceCard.svelte';

	export let data;
	let { user, prices } = data;

	// order prices by metadata["tier"]
</script>

<div class="space-y-24">
	<div class="flex flex-col justify-center gap-8">
		<div class="flex flex-col justify-center text-center gap-4">
			<h2 class="text-4xl md:text-5xl font-extrabold">[Text]</h2>
			<p class="text-lg">[Text]</p>
		</div>

		<PriceCard name="Tier 1" {user} price={prices[0]} />

		<PriceCard
			name="Tier 1"
			{user}
			price={prices[1]}
			specialText="Most Popular"
			specialColor="primary"
		/>
	</div>

	<div class="space-y-4">
		<h1>FAQ's</h1>
		<Accordion>
			<AccordionItem>
				<svelte:fragment slot="lead"><HelpCircle /></svelte:fragment>
				<svelte:fragment slot="summary">What is your refund policy?</svelte:fragment>
				<svelte:fragment slot="content">
					You can request a refund within 30 days of purchase. Email our support: <span
						class="badge variant-ghost">support@svupa.com</span
					>
				</svelte:fragment>
			</AccordionItem>
		</Accordion>
	</div>
</div>
