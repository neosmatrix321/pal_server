<script lang="ts">
	import { nameStore, verStore } from '$lib/stores';
	import type { IRconStatsInfo } from '$lib/types';
	import Menu from './Menu.svelte';
	import { isExtraVisible, isMenuVisibleStore } from '$lib/stores';
	import Links from './Links.svelte';

	function toggleExtra() {
		$isExtraVisible = !$isExtraVisible;
	}
</script>

<header>
	<nav>
		<Menu />
		<serverInfo>
			<!-- svelte-ignore a11y-aria-attributes -->
			<!-- svelte-ignore a11y-click-events-have-key-events -->
			<!-- svelte-ignore a11y-no-static-element-interactions -->
			<!-- svelte-ignore a11y-autofocus -->
			<!-- svelte-ignore a11y-interactive-supports-focus -->
			<greeting autofocus role="button" on:click={toggleExtra}
				>{$nameStore}
				{#if $verStore !== 'NaN'}
					&nbsp;{$verStore}
				{/if}
			</greeting>
			<serverInfo> </serverInfo></serverInfo
		>
	</nav>
	<Links />
</header>

<style>
	header {
		display: flex;
		justify-content: center;
		align-items: center;
		min-width: min-content;
		flex-direction: column;
		margin: 0 0 2em 0;
		z-index: 2;
		width: 800px;
		border-radius: var(--border-radius);
	}

	nav {
		background: var(--bg-3);
		display: flex;
		text-wrap: nowrap;
		flex-direction: row;
		padding: 0.5em;
		width: 100%;
		/* gap: 1em; */
		border-radius: var(--border-radius);
		justify-content: space-between;
		border-radius: 5px;
		align-items: center;
	}

	greeting {
		display: flex;
		font-size: 1.7em;
		background: var(--bg-1);
		padding: 0.3em;
		padding-left: 0.6em;
		padding-right: 0.6em;
		border-radius: 5px;
		font-weight: bolder;
		color: var(--fg-1);
	}

	@media (max-width: 900px) {
		header {
			min-width: auto;
			width: 100%;
		}
	}
	@media (max-width: 750px) {
		greeting {
			font-size: 1.3em;
		}
	}

	@media (max-width: 420px) {
		header {
			margin: 0px;
			padding: 0.3rem;
			min-width: auto;
			width: auto;
		}
    nav {
      width: 100%;
    }
		greeting {
			text-wrap: wrap;
			text-align: center;
		}
	}
</style>
