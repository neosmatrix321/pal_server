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

<div class="darker display_flex_col max_content">
	<div class="lighter display_flex_col max_content margin_double" style="min-width:200px;">
		<div class="darker display_flex_row nowrap max_content padding_double">
			CPU Load:&nbsp;{cpu}&nbsp;%
		</div>
		<div class="darker display_flex_row nowrap max_content padding_double">
			RAM usage:&nbsp;{mem}&nbsp;GB
		</div>
		<div class="darker display_flex_row nowrap max_content padding_double">
			ctime:&nbsp;{ctime}&nbsp;min
		</div>
		<div class="darker display_flex_row nowrap max_content padding_double">
			Uptime:&nbsp;{uptime}&nbsp;min
		</div>
		<div class="darker display_flex_row nowrap max_content padding_double">
			Time:&nbsp;{elapsed}&nbsp;
		</div>
	</div>
</div>
