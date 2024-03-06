<script lang="ts">
	import { PUBLIC_STRIPE_PRICING_TABLE, PUBLIC_STRIPE_KEY } from '$env/static/public';
	export let data;
	let { customer, customerSession } = data;
</script>

<svelte:head>
	<script async src="https://js.stripe.com/v3/pricing-table.js">
	</script>
</svelte:head>

<h1>Prices</h1>
<div>
	<stripe-pricing-table
		pricing-table-id={PUBLIC_STRIPE_PRICING_TABLE}
		publishable-key={PUBLIC_STRIPE_KEY}
		customer-email={customer?.email}
		customer-session-client-secret={customerSession?.clientSecret}
	>
	</stripe-pricing-table>
</div>
