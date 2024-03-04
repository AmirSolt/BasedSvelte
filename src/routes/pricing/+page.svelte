<script lang="ts">

    import { PUBLIC_STRIPE_PRICING_TABLE, PUBLIC_STRIPE_KEY } from '$env/static/public'
    export let data;
    let {userData, customerData, clientSecret} = data;


</script>

<h1>
    Prices
</h1>
<div>

    <stripe-pricing-table 
        pricing-table-id="{PUBLIC_STRIPE_PRICING_TABLE}"
        publishable-key="{PUBLIC_STRIPE_KEY}"
        customer-email="{customerData.record.email}"
        customer-session-client-secret="{clientSecret}"

    >
    </stripe-pricing-table>
</div>

