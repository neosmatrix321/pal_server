<script lang="ts">
	// import { onMount } from 'svelte';
	import { latencyGoogleStore, latencyUserStore, booleanStatusStore } from '$lib/stores';

  import type { IBooleanStatus } from '$lib/types';
    
  let serverFound = 'No';
  let rconPortOpen = 'No';
  let rconConnected = 'No';

  booleanStatusStore.subscribe((data: IBooleanStatus) => {
    serverFound = data.serverFound ? 'Yes' : 'No';
    rconPortOpen = data.rconPortOpen ? 'Yes' : 'No';
    rconConnected = data.rconConnected ? 'Yes' : 'No';
  });

</script>

<div class="info-panel">
  <div class="info-item">
    <span class="info-label">server started:</span>
    <span class="info-value">{serverFound}</span>
  </div>
  <div class="info-item">
    <span class="info-label">rcon available:</span>
    <span class="info-value">{rconPortOpen}</span>
  </div>
  <div class="info-item">
    <span class="info-label">rcon connected:</span>
    <span class="info-value">{rconConnected}</span>
  </div>
  <div class="info-item">
    <span class="info-label">Google Latency:</span>
    <span class="info-value">{$latencyGoogleStore}</span>
  </div>
  <div class="info-item">
    <span class="info-label">User Latency:</span>
    <span class="info-value">{$latencyUserStore}</span>
  </div>
</div>
