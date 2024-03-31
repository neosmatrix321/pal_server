import type { IClientMessagePaket, IExtras, IPU } from '$lib/types';

import { pidInfoStore, localClientInfoStore, extrasStore, serverMessageStore, chatMessageStore } from './stores';

let queryObject: { [key: string]: string; };

function handlePacket(packet: Partial<IClientMessagePaket>): void {
  // handleClientInfo(`${isConnected ? "connected" : "disconnected"}`);
  if (!packet) return;
  console.dir(packet, { depth: 4, colors: true });
  for (const mainKey in packet) {
    if (!(mainKey in packet)) return;
    const Paket = packet[mainKey];
    if (!Paket) return;
    switch (mainKey) {
      case 'pidInfo':
        if (mainKey === 'pidInfo') {
          pidInfoStore.set(Paket as IPU);
        }
        break;
      case 'extras':
        if (mainKey === 'extras') {
          // console.log('extras', Paket);
          extrasStore.set(Paket as IExtras);
        }
        break;
      case 'serverMessage':
        if (mainKey === 'serverMessage') {
          serverMessageStore.set({ message: Paket as string });
        }
        break;
      case 'chatMessage':
        if (mainKey === 'chatMessage') {
          chatMessageStore.set({ message: Paket as string });
        }
        break;
    }
  }
}

// ... On WebSocket message:

export default async function createWSClient(): Promise<void> {
  // handleClientInfo(isConnected ? "connected" : "disconnected");
  if (typeof window === 'undefined') return; // We're on the server
  const serverip: string = 'neo.dnsfor.me';
  const serverport: number = 8080;
  const ws: WebSocket = new WebSocket('wss://' + serverip + ':' + serverport);
  if (ws) {
    ws.onopen = (): void => {
      localClientInfoStore.set({ isConnected: true });
      // isConnected = true;
      const searchParams_temp: URLSearchParams = new URL(window.location.href).searchParams;
      queryObject = {};

      searchParams_temp.forEach((value, key) => {
        queryObject[key] = value;
      });
      // console.log('hi');
      ws.send(JSON.stringify(queryObject));
      // isConnected = true;
    };

    ws.onmessage = (event: MessageEvent): void => {
      const packet: { type: string[], obj: Partial<IClientMessagePaket>; } = JSON.parse(event.data);

      if ("type" in packet && "obj" in packet) {
        handlePacket(packet.obj as Partial<IClientMessagePaket>);
      } else {
        ws.send(JSON.stringify(queryObject));
      }
    };

    ws.onclose = (): void => {
      localClientInfoStore.set(({ isConnected: false }));
    };

    ws.onerror = ((): void => {
      localClientInfoStore.set(({ isConnected: false }));
    });

  }
}
