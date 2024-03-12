<script lang="ts">
	import '../app.postcss';
	import { AppShell, AppBar } from '@skeletonlabs/skeleton';
	import { page } from '$app/stores';
	export let data;
	let { user } = data;

	// Error toast
	import { Toast, initializeStores, getToastStore } from '@skeletonlabs/skeleton';
	initializeStores();

	$: if ($page.error != null) {
		getToastStore().trigger({
			message: `Error: ${$page.error.message}`,
			background: 'variant-filled-error'
		});
	}

	// // Highlight JS
	// import hljs from 'highlight.js/lib/core';
	// import 'highlight.js/styles/github-dark.css';
	// import { storeHighlightJs } from '@skeletonlabs/skeleton';
	// import xml from 'highlight.js/lib/languages/xml'; // for HTML
	// import css from 'highlight.js/lib/languages/css';
	// import javascript from 'highlight.js/lib/languages/javascript';
	// import typescript from 'highlight.js/lib/languages/typescript';

	// hljs.registerLanguage('xml', xml); // for HTML
	// hljs.registerLanguage('css', css);
	// hljs.registerLanguage('javascript', javascript);
	// hljs.registerLanguage('typescript', typescript);
	// storeHighlightJs.set(hljs);

	// // Floating UI for Popups
	// import { computePosition, autoUpdate, flip, shift, offset, arrow } from '@floating-ui/dom';
	// import { storePopup } from '@skeletonlabs/skeleton';
	// storePopup.set({ computePosition, autoUpdate, flip, shift, offset, arrow });
</script>

<Toast position="t" />

<!-- App Shell -->
<AppShell>
	<svelte:fragment slot="header">
		<!-- App Bar -->
		<AppBar>
			<svelte:fragment slot="lead">
				<a href="/">
					<strong class="text-xl uppercase">BasedPocket</strong>
				</a>
			</svelte:fragment>
			<svelte:fragment slot="trail">
				<a class="btn btn-sm variant-ghost-surface" href="/payment/pricing"> Pricing </a>

				{#if user}
					<a class="btn btn-sm variant-ghost-surface" href="/payment/wallet"> Wallet </a>

					<form action="/auth/logout" method="post">
						<button type="submit" class="btn btn-sm variant-ghost-surface"> Logout </button>
					</form>
					<!-- <a
						class="btn btn-sm variant-ghost-surface"
						href="/auth/logout"
					>
						Logout
					</a> -->
				{:else}
					<a
						class="btn btn-sm variant-ghost-surface"
						href={`/auth/login?dest=${$page.url.searchParams.get('dest')}`}
					>
						Login
					</a>
					<a
						class="btn btn-sm variant-ghost-surface"
						href={`/auth/signup?dest=${$page.url.searchParams.get('dest')}`}
					>
						Signup
					</a>
				{/if}
			</svelte:fragment>
		</AppBar>
	</svelte:fragment>

	<!-- Page Route Content -->
	<div class="flex justify-center items-center m-4">
		<div>
			<slot />
		</div>
	</div>
	<svelte:fragment slot="footer">
		<hr />
		<div class="flex flex-col justify-center items-end m-4">
			<a href="/" class="flex justify-center items-center">
				<img src="logo.png" alt="Logo" class="w-12" />
			</a>
			<p>BasedPocket 2024</p>
		</div>
	</svelte:fragment>
</AppShell>
