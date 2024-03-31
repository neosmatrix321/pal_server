<script lang="ts">
	import type { IExtras, ILocalClientInfo } from '$lib/types';
	import { extrasStore, localClientInfoStore } from '$lib/stores';
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
<div class="info-panel">
  <div class="info-item">
    <span class="info-label">Active Clients</span>
    <span class="info-value">{activeClients}</span>
  </div>
  <div class="info-item">
    <span class="info-label">Clients Counter</span>
    <span class="info-value">{clientsCounter}</span>
  </div>
  <div class="info-item">
    <span class="info-label">Status</span>
    <span class="info-value">{isConnected ? 'Connected' : 'Disconnected'}</span>
  </div>
</div>
