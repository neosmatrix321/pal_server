<script lang="ts">
    import { rconStatsInfoStore } from "$lib/stores";
    import type { IRconStatsInfo } from "$lib/types";

    let name: string = 'a PalWorld';
    let ver: string;

    rconStatsInfoStore.subscribe((data: IRconStatsInfo) => {
        name = data.name;
        ver = data.ver;
    });

</script>

<nav>
    <greeting>Welcome to&nbsp;{name}&nbsp;Server</greeting>
    <version>{ver}</version>
</nav>
<p></p>
