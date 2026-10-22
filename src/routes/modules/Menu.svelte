<script lang="ts">
	import {
		isMenuVisible,
		isMenuVisibleStore,
	} from '$lib/stores';
  const MenuON = new URL('$lib/assets/main_menu.png', import.meta.url).href
  const MenuOFF = new URL('$lib/assets/main_menu_off.png', import.meta.url).href
	let menuButtonImage = MenuOFF;
	function toggleImage() {
		menuButtonImage = $isMenuVisibleStore ? MenuOFF : MenuON;
		$isMenuVisible = $isMenuVisible === false ? true : false;
	}
</script>

<!-- svelte-ignore a11y-aria-attributes -->
<!-- svelte-ignore a11y-click-events-have-key-events -->
<!-- svelte-ignore a11y-no-static-element-interactions -->
<!-- svelte-ignore a11y-autofocus -->
<!-- svelte-ignore a11y-interactive-supports-focus -->
<div class="menu-image" on:click={toggleImage} style="background-image: url('{menuButtonImage}');">&nbsp;</div>

<style>
	.menu-image {
		/* background-color: var(--bg-1); */
    background-repeat: no-repeat;
    background-size: cover;
    background-size: 100% auto;
		display: block;
		cursor: pointer;
		margin: 0.1rem;
		padding: 0.3rem;
		width: 60px;
		height: 60px;
		transition: transform 300ms ease-in-out;
	}
	.menu-image:hover {
		transform: scale(1.2);
	}

	@media (max-width: 750px) {
		.menu-image {
			width: 40px;
			height: 40px;
		}
	}
</style>
