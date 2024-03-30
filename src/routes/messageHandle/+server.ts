import type { IClientMessagePaket, IPU } from '../../lib/types';
import { writable } from 'svelte/store';
import { json } from '@sveltejs/kit';
import { WebSocket } from 'ws';

const pidInfoStore = writable({} as IPU);  // Initialize with empty data

let isConnected: boolean;
let queryObject: { [key: string]: string; };

function handlePacket(packet: Partial<IClientMessagePaket>): void {
  // handleClientInfo(`${isConnected ? "connected" : "disconnected"}`);
  if (!packet) return;
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
    }
  }
}

// ... On WebSocket message:

async function createWSClient() {
  // handleClientInfo(isConnected ? "connected" : "disconnected");
  const serverip: string = 'neo.dnsfor.me';
  const serverport: number = 8080;
  const ws: WebSocket = new WebSocket('wss://' + serverip + ':' + serverport);
  
  ws.on('open', (event: Event): void => {
    // isConnected = true;
    const searchParams_temp: URLSearchParams = new URL(window.location.href).searchParams;
    queryObject = {};

    searchParams_temp.forEach((value, key) => {
      queryObject[key] = value;
    });
    queryObject["greeting"] = "Hello";
    ws.send(JSON.stringify(queryObject));
    // isConnected = true;
    console.log(`WebSocket is onopen now. ${isConnected} ${event}`);
  });

  ws.on('message', (event: MessageEvent): void => {
    const packet: { type: string[], obj: Partial<IClientMessagePaket>; } = JSON.parse(event.data);
    if ("type" in packet && "obj" in packet) {
      handlePacket(packet.obj as Partial<IClientMessagePaket>);
    } else {
      ws.send(JSON.stringify(queryObject));
    }
  });

  ws.on('close', (): void => {
    isConnected = false;
    console.log('disconnected');
  });

  ws.on('error', (): void => {
    isConnected = false;
    console.log('disconnected');
  });
}

export async function POST({ request }: { request: unknown }  ): Promise<Response> {
  try {
    await createWSClient();
    return json({ result: "connected" });
  } catch (error) {
    console.error(`WebSocket Error: ${error} ${request}`);
    return json({ result: "disconnected" });
  }
}
