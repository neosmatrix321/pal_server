<script lang="ts">
    import type { IExtras, ILocalClientInfo } from "$lib/types";
    import { extrasStore, localClientInfoStore } from "$lib/stores";
    let activeClients: number;
    let clientsCounter: number;
    let isConnected: boolean;

    extrasStore.subscribe((data: IExtras) => {
        activeClients = data.activeClients;
        clientsCounter = data.clientsCounter;
        // console.log('extrasStore', data);
    });

    localClientInfoStore.subscribe((data: ILocalClientInfo) => {
        isConnected = data.isConnected;
        // console.log('localClientInfoStore', data);
    });

</script>

<div class="darker display_flex_col max_content">
    <div class="lighter display_flex_col max_content margin_double" style="min-width:200px;">
        <div class="darker display_flex_row nowrap max_content padding_double">
            Active Clients:&nbsp;{activeClients}
        </div>
        <div class="darker display_flex_row nowrap max_content padding_double">
            Clients Counter:&nbsp;{clientsCounter}
        </div>
        <div class="darker display_flex_row nowrap max_content padding_double">
            Connection Status:&nbsp;{isConnected ? 'Connected' : 'Disconnected'}
        </div>
    </div>
</div>