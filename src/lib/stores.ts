import { writable, derived } from 'svelte/store';
import type { IPU, IExtras, ILocalClientInfo, IRconStatsPlayers, IBooleanStatus } from '$lib/types';


export const name = writable('PalWorld Manager');
export const nameStore = derived(name, ($name) => `${$name}`);

export const ver = writable("NaN");
export const verStore = derived(ver, ($ver) => `${$ver}`);

export const latencyGoogle = writable("NaN");
export const latencyGoogleStore = derived(latencyGoogle, ($latencyGoogle) => `${$latencyGoogle}`);

export const latencyUser = writable("NaN");
export const latencyUserStore = derived(latencyUser, ($latencyUser) => `${$latencyUser}`);

export const pidInfoStore = writable({} as IPU);  // Initialize with empty data

export const extrasStore = writable({} as IExtras);  // Initialize with empty data

export const localClientInfoStore = writable({ isConnected: false } as ILocalClientInfo);
export const serverMessageStore = writable([] as string[]);

export const chatMessageStore = writable({ message: "NaN" } as { message: string });

export const isExtraVisible = writable(false);

export const isMenuVisible = writable(false);
export const isMenuVisibleStore = derived(isMenuVisible, ($isMenuVisible) => $isMenuVisible);

export const playerArrayStore = writable([] as IRconStatsPlayers[]);

export const booleanStatusStore = writable({} as IBooleanStatus);

localClientInfoStore.subscribe(value => {
    if (!value.isConnected) {
        // Set other values to default when isConnected is false
        name.set('PalWorld Manager');
        ver.set("NaN");
        pidInfoStore.set({} as IPU);
        extrasStore.set({} as IExtras);
        isExtraVisible.set(false);
        playerArrayStore.set([] as IRconStatsPlayers[]);
        booleanStatusStore.set({} as IBooleanStatus);
    }
});
