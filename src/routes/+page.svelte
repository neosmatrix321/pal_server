<script lang="ts">
  import GoogleFont, { getFontStyle } from "@svelte-web-fonts/google";
  import type { GoogleFontDefinition, GoogleFontVariant } from "@svelte-web-fonts/google";
  
  const fonts: GoogleFontDefinition[] = [
      {
          family: "Nunito",
          variants: [
              "400"
          ],
      },
  ];
  import { onMount } from 'svelte';
	import PidInfo from './modules/PidInfo.svelte';
  import client from '$lib/client';
	import ServerMessage from './modules/ServerMessage.svelte';
	import ChatMesssage from './modules/ChatMesssage.svelte';
  import Header from './modules/Header.svelte';
  import EmptyBottom from './modules/EmptyBottom.svelte';
  import GlobalInfo from './modules/GlobalInfo.svelte';
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

<svelte:head>
    <link rel="preconnect" href="https://fonts.googleapis.com" />
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
    <GoogleFont fonts="{fonts}" display="swap" />
</svelte:head>

<style>
  section {
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    justify-content: center;
    align-items: center;
    font-family: Nunito, sans-serif;
    display: flex;
    justify-content: center;
  }
  inner {
    display: flex;
    flex-direction: column;
    min-width: min-content;
    max-width: 800px;
    align-items: center;
    width: 100%;
  }
  middle {
    display: flex;
    justify-content: space-around;
    width: 100%;
  }
  bottom {
    display: flex;
    flex-direction: column;
    align-items: stretch;
    width: 100%;
  }
  /* @media (max-width: 900px) {
    middle {

    }
	} */
  @media (max-width: 500px) {
    middle {
      flex-wrap: wrap;
    }
  }

</style>

<section>
  <inner>
    <Header />
    <middle>
      <PidInfo />
      <GlobalInfo />
    </middle>
    <bottom>
      <ChatMesssage />
      <ServerMessage />
      <EmptyBottom />
      <Extra />
    </bottom>
  </inner>
</section>

