import { writable } from 'svelte/store';
import type { IPU, IExtras, ILocalClientInfo, IRconStatsInfo } from '$lib/types';

export const pidInfoStore = writable({} as IPU);  // Initialize with empty data

export const extrasStore = writable({} as IExtras);  // Initialize with empty data

export const rconStatsInfoStore = writable({ name: "a PalWorld", ver: "NaN" } as IRconStatsInfo);

export const localClientInfoStore = writable({ isConnected: false } as ILocalClientInfo);

export const serverMessageStore = writable({ message: "NaN" } as { message: string });

export const chatMessageStore = writable({ message: "NaN" } as { message: string });