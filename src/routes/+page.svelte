<script lang="ts">
  import { onMount } from 'svelte';
	import PidInfo from './modules/PidInfo.svelte';
  import client from '$lib/client';
	import Extra from './modules/Extra.svelte';
	import ServerMessage from './modules/ServerMessage.svelte';
	import ChatMesssage from './modules/ChatMesssage.svelte';
  import Header from './modules/Header.svelte';

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
  <Header />
  <PidInfo />
  <Extra />
  <ChatMesssage />
  <ServerMessage />
</section>

