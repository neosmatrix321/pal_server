<script lang="ts">
	// import { onMount } from 'svelte';
	import type { IPU } from '$lib/types';
	import { pidInfoStore } from '$lib/stores';

    let cpu = 'NaN';
    let mem = 'NaN';
    let ctime = 'NaN';
    let uptime = 'NaN';
    let elapsed = 'NaN';
    let timestampToDate: Date;
    let formattedDate: string = 'NaN';

	pidInfoStore.subscribe((data: IPU) => {
		cpu = Number(data.cpu / 4).toFixed(1);
		mem = Number(data.memory / 1024 / 1024 / 1024).toFixed(1);
		ctime = Number(data.ctime / 1000 / 60).toFixed(1);
		elapsed = Number(data.elapsed / 1000 / 60).toFixed(1);
		timestampToDate = new Date(Number(data.timestamp));
		formattedDate = timestampToDate.toLocaleTimeString();
		uptime = `${formattedDate}`;
    });


  // onMount(() => {
  //   // Initialisiere hier deine Elemente, z.B.:

  //   // ...
  // });
</script>

<div class="info-panel">
  <div class="info-item">
    <span class="info-label">CPU Load:</span>
    <span class="info-value">{cpu} %</span>
  </div>
  <div class="info-item">
    <span class="info-label">RAM usage:</span>
    <span class="info-value">{mem} GB</span>
  </div>
  <div class="info-item">
    <span class="info-label">ctime:</span>
    <span class="info-value">{ctime} min</span>
  </div>
  <div class="info-item">
    <span class="info-label">utime:</span>
    <span class="info-value">{elapsed} min</span>
  </div>
  <div class="info-item">
    <span class="info-label">Local time:</span>
    <span class="info-value">{uptime}</span>
  </div>
</div>
