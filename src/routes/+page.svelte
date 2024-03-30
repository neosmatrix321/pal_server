<script lang="ts">
  import { onMount } from 'svelte';
	import PidInfo from './modules/PidInfo.svelte';
  let data;


  onMount(async () => {
      const response = await fetch('/messageHandle', {
    method: 'POST' // Or 'GET', 'PUT', etc., as needed
});
      data = await response.json(); 
      if (response.ok) {
        console.log('WebSocket initialized');
      } else {
        console.error('Error initializing WebSocket');
      }
  });

</script>

<section>
  <PidInfo />
</section>

