<script lang="ts">

    export let data;
    let {userData, customerData} = data;

</script>

<svelte:head>
    <script async src="https://js.stripe.com/v3/pricing-table.js"></script>


</svelte:head>

userData {JSON.stringify(userData)}
<br>
<br>
<br>
<br>
customerData {JSON.stringify(customerData)}

