<script lang="ts">
  import { onMount } from 'svelte';
	import PidInfo from './modules/PidInfo.svelte';
  import client from '$lib/client';
	import Extra from './modules/Extra.svelte';

  onMount(async () => {
  try {
    await client();
    console.info(`connected ${Date.now()}`)
  } catch (error) {
    console.error(error);
  }
  });

</script>

<section>
  <PidInfo />
  <Extra />
</section>

