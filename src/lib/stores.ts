import { writable } from 'svelte/store';
import type { IPU, IExtras, ILocalClientInfo } from './types';

export const pidInfoStore = writable({} as IPU);  // Initialize with empty data

export const extrasStore = writable({} as IExtras);  // Initialize with empty data

export const localClientInfoStore = writable({ isConnected: false } as ILocalClientInfo);  // Initialize with empty data