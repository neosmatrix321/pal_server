<script lang="ts">
	import { isMenuVisibleStore } from '$lib/stores';
	import { fly, fade } from 'svelte/transition';
</script>
{#if $isMenuVisibleStore}
	<div class="menu-links" in:fly={{ x: -200, duration: 500 }} out:fade>
		<h3>links worth to visit</h3>
		<div class="menu-item-links">
			<a href="https://paldex.gg" target="_blank">paldex.gg</a>
		</div>
		<div class="menu-item-links">
			<a href="https://tech.palworldgame.com" target="_blank">tech.palworldgame.com</a>
		</div>
		<div class="menu-item-links">
			<a href="https://palworld.gg" target="_blank">palworld.gg</a>
		</div>
	</div>
{/if}

<style>
	a {
		text-decoration: none;
	}

	.menu-links {
		display: flex;
		flex-direction: row;
		flex-wrap: nowrap;
		background-color: var(--bg-3);
		min-width: min-content;
		max-width: max-content;
		min-width: 200px;
		margin: 0.5rem;
		padding: 0.5rem;
		border-radius: 0.5rem;
	}

	.menu-links h3 {
		background-color: var(--bg-1);
		border: 3px solid var(--fg-3);
		animation: border-color-change 10s infinite;
		margin: 0.1rem;
		padding: 0.3rem;
		border-radius: 0.2rem;
		display: flex;
		justify-content: space-between;
	}

	@keyframes border-color-change {
		0% {
			border-color: var(--bg-1);
		}
		50% {
			border-color: var(--fg-1);
		}
		100% {
			border-color: var(--bg-1);
		}
	}

	.menu-item-links {
		background-color: var(--bg-1);
		margin: 0.1rem;
		padding: 0.3rem;
		border-radius: 0.2rem;
		display: flex;
		justify-content: space-between;
	}

    @media (max-width: 620px) {
        .menu-links {
            display: flex;
            flex-direction: column;
        }
    }
</style>
