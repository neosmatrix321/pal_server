<script lang="ts">
	import type { IExtras, ILocalClientInfo } from '$lib/types';
	import { extrasStore, localClientInfoStore, isExtraVisible } from '$lib/stores';
	import { fly, fade } from 'svelte/transition';
	let activeClients: number;
	let clientsCounter: number;
	let isConnected: boolean;

	extrasStore.subscribe((data: IExtras) => {
		activeClients = data.activeClients;
		clientsCounter = data.clientsCounter;
		// console.log('extrasStore', data);
	});

	localClientInfoStore.subscribe((data: ILocalClientInfo) => {
		isConnected = data.isConnected;
		// console.log('localClientInfoStore', data);
	});
</script>

{#if $isExtraVisible}
	<div class="extra" in:fly={{ y: 50, duration: 500 }} out:fly={{ y: 50, duration: 400 }}>
		<div class="extra-item">
			<span class="extra-label">active Clients</span>
			<span class="extra-value">{activeClients}</span>
		</div>
		<div class="extra-item">
			<span class="extra-label">#</span>
			<span class="extra-value">{clientsCounter}</span>
		</div>
		<div class="extra-item">
			<span class="extra-value">{isConnected ? 'Connected' : 'Disconnected'}</span>
		</div>
	</div>
{/if}

<style>
	.extra {
		position: fixed;
		display: flex;
		bottom: 0px;
		left: 50%;
		transform: translateX(-50%);
		background-color: var(--fg-3);
		padding: 0.5rem;
		padding-bottom: 0rem;
		/* padding-bottom: 0.2rem; */
		text-align: center;
		text-wrap: nowrap;
		border-radius: 0.5rem 0.5rem 0 0;
		justify-content: space-between;
	}
	.extra-item {
		display: inline-block;
		background-color: var(--bg-1);
		margin: 0.2rem;
		font-weight: bold;
		padding: 0.3rem;
		padding-left: 1.7rem;
		padding-right: 1.7rem;
	}
	.extra-value {
		display: inline-block;
	}
	@media (max-width: 500px) {
		.extra {
			flex-direction: column;
			width: max-content;
		}
	}
</style>
