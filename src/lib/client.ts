import type { IClientMessagePaket, IExtras, IPU, IRconStatsInfo, IRconStatsPlayers, IBooleanStatus } from '$lib/types';

import { pidInfoStore, localClientInfoStore, extrasStore, serverMessageStore, chatMessageStore, name, ver, latencyGoogle, latencyUser, booleanStatusStore } from '$lib/stores';

let queryObject: { [key: string]: string; };

function handlePacket(packet: Partial<IClientMessagePaket>): void {
  // handleClientInfo(`${isConnected ? "connected" : "disconnected"}`);
  if (!packet) return;
  for (const mainKey in packet) {
    if (!(mainKey in packet)) return;
    let Paket: string | IRconStatsPlayers[] | IPU | IExtras | string[] | IRconStatsInfo | IBooleanStatus | undefined = packet[mainKey];
    if (!Paket) return;
    switch (mainKey) {
      case 'pidInfo':
        Paket = Paket as IPU;
        pidInfoStore.set(Paket as IPU);
        break;
      case 'extras':
        Paket = Paket as IExtras;
        extrasStore.set(Paket as IExtras);
        break;
      case 'serverMessage':
        Paket = Paket as string[];
        serverMessageStore.set(Paket as string[]);
        break;
      case 'chatMessage':
        Paket = Paket as string;
          // console.log('chatMessage', Paket);
        chatMessageStore.set({message: Paket as string});
        break;
      case 'rconInfo':
        Paket = Paket as IRconStatsInfo;
        name.set(Paket.name);
        ver.set(Paket.ver);
        break;
      case 'latencyGoogle':
        Paket = Paket as string;
        latencyGoogle.set(Paket as string);
        break;
      case 'latencyUser':
        Paket = Paket as string;
        latencyUser.set(Paket as string);
        break;
      case 'booleanStatus':
        Paket = Paket as IBooleanStatus;
        booleanStatusStore.set(Paket as IBooleanStatus);
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
      queryObject["greeting"] = "Hello";
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
      localClientInfoStore.set({ isConnected: false });
      // Try to reconnect after a delay
      // setTimeout(createWSClient, 5000);
    };

    ws.onerror = ((): void => {
      localClientInfoStore.set({ isConnected: false });
      // Try to reconnect after a delay
      // setTimeout(createWSClient, 5000);
    });

  }
}
