<script lang="ts">
	import DataList from './DataList.svelte';
	import type { Stripe } from 'stripe';

	export let name: string;
	export let user: User | undefined | null;
	export let price: Stripe.Price | undefined;

	export let featureList: string[] = [];
	export let specialText: string | null = null;
	export let specialColor: string | null = null;
	// let price: Stripe.Price | undefined =
	// 	typeof product?.default_price === 'string' || product?.default_price === null
	// 		? undefined
	// 		: product?.default_price;
	let currencySymbol: string = '$';
</script>

<div
	class="card text-center border-2 {specialColor
		? `border-${specialColor}-500`
		: 'border-slate-400'}"
>
	<div class="border-primary-500 border-secondary-500 border-slate-400 hidden" />
	<div class="relative w-full h-full p-2">
		{#if specialText != null}
			<span
				class="badge absolute -top-4 -right-0 z-10 text-md p-2 {specialColor
					? `variant-filled-${specialColor}`
					: 'variant-filled'}"
			>
				{specialText}
			</span>
		{/if}

		<div class="flex flex-col justify-between items-start w-full h-full pt-4">
			<div class="flex flex-col justify-start items-start w-full h-full gap-4">
				<div class="flex flex-col justify-center items-center w-full h-24">
					<h3 class="text-3xl font-semibold">
						{name}
					</h3>
					<p class="font-light text-gray-500 sm:text-lg dark:text-gray-400">
						{currencySymbol}{price?.unit_amount ? Math.floor(price.unit_amount / 100) : null}/{price
							?.recurring?.interval}
					</p>
				</div>

				<DataList list={featureList} />
			</div>

			<div class="flex justify-between items-center w-full">
				<div class="flex justify-center items-baseline" />

				{#if user == null}
					<a href={`/auth/signup?dest=${encodeURIComponent('/payment/pricing')}`}> Next </a>
				{:else}
					<form action="?/subscribe" method="post">
						<input type="hidden" name="priceID" value={price?.id} />
						<button
							class="btn text-lg md:text-2x w-24 {specialColor
								? `variant-filled-${specialColor}`
								: 'variant-filled'}"
							type="submit"
						>
							Next
						</button>
					</form>
				{/if}
			</div>
		</div>
	</div>
</div>
